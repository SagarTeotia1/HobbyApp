import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { styles } from './TopicActionSheet.styles';

interface Props {
  visible: boolean;
  topicName: string;
  onDetail: () => void;
  onGraph: () => void;
  onClose: () => void;
}

export function TopicActionSheet({ visible, topicName, onDetail, onGraph, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.handle} />

          <Text style={styles.topicLabel} numberOfLines={2}>
            {topicName}
          </Text>

          <Text style={styles.hint}>Choose an action</Text>

          <Pressable
            style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
            onPress={onDetail}>
            <Text style={styles.optionIcon}>🧠</Text>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Get in Detail</Text>
              <Text style={styles.optionSub}>AI-generated deep explanation with key takeaways</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.option, styles.optionGraph, pressed && styles.optionPressed]}
            onPress={onGraph}>
            <Text style={styles.optionIcon}>🕸️</Text>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Create Learn Graph</Text>
              <Text style={styles.optionSub}>Interactive knowledge graph showing concept connections</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
