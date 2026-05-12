import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from './PlanGeneratingAnimation.styles';

const STEPS = [
  { icon: '🔍', text: 'Analysing your skill level' },
  { icon: '🗺️', text: 'Mapping the learning path' },
  { icon: '🧠', text: 'Generating AI roadmap stages' },
  { icon: '🃏', text: 'Preparing your first cards' },
  { icon: '✨', text: 'Almost ready…' },
];

const PULSE_DURATION = 700;
const STEP_CYCLE_MS = 2000;
const STEP_FADE_OUT_MS = 200;
const STEP_FADE_IN_MS = 300;

interface Props {
  hobbyName: string;
}

export function PlanGeneratingAnimation({ hobbyName }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim  = useRef(new Animated.Value(1)).current;

  // Pulse the icon
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: PULSE_DURATION, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: PULSE_DURATION, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  // Cycle steps
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: STEP_FADE_OUT_MS, useNativeDriver: true }).start(() => {
        setStepIndex((i) => (i + 1) % STEPS.length);
        Animated.timing(fadeAnim, { toValue: 1, duration: STEP_FADE_IN_MS, useNativeDriver: true }).start();
      });
    }, STEP_CYCLE_MS);
    return () => clearInterval(interval);
  }, [fadeAnim]);

  const step = STEPS[stepIndex];

  return (
    <View style={styles.root}>
      {/* Hobby pill */}
      <View style={styles.hobbyPill}>
        <Text style={styles.hobbyPillText}>{hobbyName.toUpperCase()}</Text>
      </View>

      {/* Headline */}
      <Text style={styles.headline}>Building Your{'\n'}Roadmap</Text>

      {/* Animated icon card */}
      <Animated.View style={[styles.iconCard, { transform: [{ scale: pulseAnim }] }]}>
        <Text style={styles.iconEmoji}>🧠</Text>
      </Animated.View>

      {/* Animated step */}
      <Animated.View style={[styles.stepCard, { opacity: fadeAnim }]}>
        <Text style={styles.stepIcon}>{step?.icon}</Text>
        <Text style={styles.stepText}>{step?.text}</Text>
      </Animated.View>

      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {STEPS.map((_, i) => (
          <View key={i} style={[styles.dot, i === stepIndex && styles.dotActive]} />
        ))}
      </View>

      <Text style={styles.hint}>AI is crafting a personalised plan just for you</Text>
    </View>
  );
}
