import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ComicHeader } from '../components/ComicHeader/ComicHeader';
import { ComicImageArea } from '../components/ComicImageArea/ComicImageArea';
import { ComicBottomNav } from '../components/ComicBottomNav/ComicBottomNav';
import { useComicPanel } from '../hooks/useComicPanel';
import { COMIC_PAGE_LABELS, COMIC_PAGE_FALLBACK_COLOR } from '../../../shared/constants/comicPageLabels';
import { colors } from '../../../app/theme';
import { ROUTES } from '../../../app/navigation/routes';
import type { AppStackParamList } from '../../../app/navigation/types';

type Nav = NativeStackNavigationProp<AppStackParamList, typeof ROUTES.COMIC>;
type Route = RouteProp<AppStackParamList, typeof ROUTES.COMIC>;

export function ComicScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { hobbyId, topicId, topicName, hobbyName } = route.params;

  const { data, isLoading, isError, refetch, page, totalPages, goNext, goPrev } =
    useComicPanel({ hobbyId, topicId, topicName, hobbyName, enabled: true });

  const { label, color } = COMIC_PAGE_LABELS[page] ?? { label: `Page ${page}`, color: COMIC_PAGE_FALLBACK_COLOR };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.videoBg} />

      <SafeAreaView edges={['top']}>
        <ComicHeader
          hobbyName={hobbyName}
          topicName={topicName}
          page={page}
          totalPages={totalPages}
          pageColor={color}
          onBack={() => navigation.goBack()}
        />
      </SafeAreaView>

      <ComicImageArea
        imageUrl={data?.imageUrl}
        isLoading={isLoading}
        isError={isError}
        pageLabel={label}
        pageColor={color}
        onRetry={() => refetch()}
      />

      <SafeAreaView edges={['bottom']}>
        <ComicBottomNav
          page={page}
          totalPages={totalPages}
          pageLabel={label}
          pageColor={color}
          onPrev={goPrev}
          onNext={goNext}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.videoBg },
});
