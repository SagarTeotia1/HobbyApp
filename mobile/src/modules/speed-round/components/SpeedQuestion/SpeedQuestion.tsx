import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { speedQuestionStyles as styles } from './SpeedQuestion.styles';
import { colors } from '../../../../app/theme';
import type { QuizQuestion } from '../../../../shared/types/card.types';

export interface SpeedQuestionProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

export function SpeedQuestion({ question, onAnswer }: SpeedQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    onAnswer(i === question.correctIndex);
  };

  return (
    <View style={styles.root}>
      <Typography variant="heading" style={styles.questionText}>
        {question.question}
      </Typography>
      <View style={styles.optionsGrid}>
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          let bg = colors.surface;
          if (isSelected) bg = isCorrect ? colors.success : colors.danger;
          else if (selected !== null && isCorrect) bg = colors.success;

          return (
            <Pressable
              key={i}
              onPress={() => handleSelect(i)}
              style={[styles.option, { backgroundColor: bg }]}>
              <Typography variant="body">{opt}</Typography>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
