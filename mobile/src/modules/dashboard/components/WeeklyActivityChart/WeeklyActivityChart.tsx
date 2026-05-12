import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './WeeklyActivityChart.styles';

export function WeeklyActivityChart() {
  // Mock data for the last 7 days activity
  const data = [
    { day: 'M', value: 30 },
    { day: 'T', value: 80 },
    { day: 'W', value: 45 },
    { day: 'T', value: 100 },
    { day: 'F', value: 60 },
    { day: 'S', value: 20 },
    { day: 'S', value: 90 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weekly Hustle</Text>
      <View style={styles.chartContainer}>
        {data.map((item, index) => {
          const heightPct = `${(item.value / maxValue) * 100}%`;
          return (
            <View key={index} style={styles.barCol}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: heightPct }]} />
              </View>
              <Text style={styles.dayLabel}>{item.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
