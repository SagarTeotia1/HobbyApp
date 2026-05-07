import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { env } from '../../config/env';
import { UserModel } from '../../models/User.model';
import { HobbyModel } from '../../models/Hobby.model';
import { RoadmapModel } from '../../models/Roadmap.model';
import { CardModel } from '../../models/Card.model';
import { aiService } from '../ai/ai.service';
import { ApiError } from '../../shared/utils/ApiError';
import type { CompleteOnboardingPayload, CompleteOnboardingResponse, OnboardingInitResponse } from './onboarding.types';

function buildFallbackRoadmap(hobbyId: string): Array<{
  order: number;
  conceptId: string;
  title: string;
  description: string;
}> {
  return [
    { order: 0, conceptId: `${hobbyId}_basics`, title: 'Foundations', description: 'Learn core terms and setup.' },
    { order: 1, conceptId: `${hobbyId}_fundamentals`, title: 'Core Skills', description: 'Build practical base habits.' },
    { order: 2, conceptId: `${hobbyId}_practice`, title: 'Guided Practice', description: 'Apply concepts with simple drills.' },
    { order: 3, conceptId: `${hobbyId}_advanced`, title: 'Advanced Patterns', description: 'Move to more challenging scenarios.' },
    { order: 4, conceptId: `${hobbyId}_mastery`, title: 'Mastery Path', description: 'Consolidate knowledge with review loops.' },
  ];
}

export const onboardingService = {
  async createAnonymousUser(): Promise<OnboardingInitResponse> {
    const uuid = nanoid(21);
    const user = await UserModel.create({
      uuid,
      currentHobbyId: '',
      dailyTimeMinutes: 10,
      skillLevel: 'beginner',
      xp: 0,
      level: 1,
      streak: 0,
      type: 'anonymous',
    });

    const token = jwt.sign({ sub: uuid, type: 'anonymous' }, env.JWT_SECRET, {
      expiresIn: '365d',
    });

    return {
      user: {
        uuid: user.uuid,
        currentHobbyId: user.currentHobbyId ?? '',
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        lastActiveDateISO: user.lastActiveDate.toISOString(),
        preferences: {
          dailyMinutes: 10,
          skillLevel: 'beginner',
        },
        createdAt: user.createdAt.toISOString(),
      },
      token,
    };
  },

  async completeOnboarding(
    userId: string,
    payload: CompleteOnboardingPayload,
  ): Promise<CompleteOnboardingResponse> {
    const hobby = await HobbyModel.findOne({ slug: payload.hobbySlug, isActive: true }).lean();
    if (!hobby) throw ApiError.badRequest('Invalid hobby');

    // Keep roadmap deterministic/local to avoid extra Gemini calls during onboarding.
    const stages = buildFallbackRoadmap(hobby.slug);

    const roadmapDoc = await RoadmapModel.findOneAndUpdate(
      { userId, hobbyId: hobby.slug },
      {
        $set: {
          userId,
          hobbyId: hobby.slug,
          skillLevel: payload.skillLevel,
          stages: stages.map((stage, index) => ({
            ...stage,
            order: index,
            isUnlocked: index === 0,
            isMastered: false,
          })),
          currentStageOrder: 0,
          generatedAt: new Date(),
        },
      },
      { upsert: true, new: true },
    ).lean();

    const firstConceptId = roadmapDoc.stages[0]?.conceptId ?? 'foundations';
    let generatedCards;
    try {
      generatedCards = await aiService.generateCards({
        hobby: hobby.name,
        hobbyId: hobby.slug,
        level: payload.skillLevel,
        conceptId: firstConceptId,
        count: 10,
      });
    } catch {
      generatedCards = Array.from({ length: 10 }).map((_, index) => ({
        hobbyId: hobby.slug,
        type: 'concept' as const,
        difficulty: payload.skillLevel,
        conceptId: firstConceptId,
        title: `${hobby.name} Quick Win ${index + 1}`,
        frontContent: `Key ${hobby.name} concept #${index + 1}.`,
        backContent: `Practice tip for ${hobby.name} concept #${index + 1}.`,
        tags: [hobby.slug, 'basics'],
        estimatedReadSeconds: 30,
        generatedAt: new Date(),
      }));
    }

    const createdCards = await CardModel.insertMany(
      generatedCards.map((card) => ({
        ...card,
        generatedFor: userId,
      })),
    );

    await UserModel.updateOne(
      { uuid: userId },
      {
        $set: {
          currentHobbyId: hobby.slug,
          dailyTimeMinutes: payload.dailyMinutes,
          skillLevel: payload.skillLevel,
        },
      },
    );

    // Do not enqueue onboarding prefetch immediately to avoid extra AI requests on free tier.

    return {
      roadmap: {
        hobbyId: roadmapDoc.hobbyId,
        skillLevel: roadmapDoc.skillLevel,
        stages: roadmapDoc.stages.map((stage) => ({
          order: stage.order,
          conceptId: stage.conceptId,
          title: stage.title,
          description: stage.description,
          isUnlocked: stage.isUnlocked,
          isMastered: stage.isMastered,
        })),
      },
      firstCards: createdCards.map((card) => ({
        id: card._id.toString(),
        hobbyId: card.hobbyId,
        type: card.type,
        difficulty: card.difficulty,
        conceptId: card.conceptId,
        title: card.title,
        frontContent: card.frontContent,
        backContent: card.backContent,
        tags: card.tags,
        estimatedReadSeconds: card.estimatedReadSeconds,
        generatedAt: (card.createdAt ?? new Date()).toISOString(),
      })),
    };
  },
};
