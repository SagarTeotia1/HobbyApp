import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Typography } from '../../../../shared/components/ui/Typography/Typography';
import { bossQuestionStyles as styles } from './BossQuestion.styles';
import { colors } from '../../../../app/theme';
import type { BossQuestion as BossQuestionType } from '../../../../shared/types/card.types';

export interface BossQuestionProps {
  question: BossQuestionType;
  onAnswer: (isCorrect: boolean) => void;
}

export function BossQuestion({ question, onAnswer }: BossQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    onAnswer(i === question.correctIndex);
  };

  return (
    <View style={styles.root}>
      <Typography variant="heading" style={styles.question}>{question.question}</Typography>
      <View style={styles.options}>
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
