import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
  Linking,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import YoutubeIframe, { PLAYER_STATES } from 'react-native-youtube-iframe';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  youtubeId?: string;
  videoUrl?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PLAYER_HEIGHT = Math.round(SCREEN_WIDTH * (9 / 16));
const VIDEO_BG = '#000000';
const VIDEO_FALLBACK_BG = '#111111';

function buildDirectVideoHtml(url: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body { width:100%; height:100%; background:#000; overflow:hidden; }
    video { width:100%; height:100%; object-fit:contain; display:block; }
  </style>
</head>
<body>
  <video src="${url}" controls autoplay playsinline webkit-playsinline></video>
</body>
</html>`;
}

export function VideoPlayer({ youtubeId, videoUrl }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onReady = useCallback(() => setLoading(false), []);

  const onChangeState = useCallback((state: PLAYER_STATES) => {
    if (state === PLAYER_STATES.UNSTARTED || state === PLAYER_STATES.VIDEO_CUED) {
      setLoading(false);
    }
  }, []);

  const onError = useCallback((_err: string) => {
    setLoading(false);
    setError(true);
  }, []);

  const openInYouTube = useCallback(() => {
    if (!youtubeId) return;
    const appUrl = `vnd.youtube://${youtubeId}`;
    const webUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
    Linking.canOpenURL(appUrl).then((can) => Linking.openURL(can ? appUrl : webUrl));
  }, [youtubeId]);

  if (!videoUrl && !youtubeId) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackTitle}>No video source</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackIcon}>🎬</Text>
        <Text style={styles.fallbackTitle}>Video unavailable</Text>
        {youtubeId && (
          <Pressable
            style={({ pressed }) => [styles.watchBtn, pressed && styles.watchBtnPressed]}
            onPress={openInYouTube}>
            <Text style={styles.watchBtnText}>Watch on YouTube →</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loaderText}>Loading video...</Text>
        </View>
      )}

      {youtubeId ? (
        <YoutubeIframe
          videoId={youtubeId}
          height={PLAYER_HEIGHT}
          width={SCREEN_WIDTH}
          play={false}
          onReady={onReady}
          onChangeState={onChangeState}
          onError={onError}
          forceAndroidAutoplay
          contentScale={0.82}
          webViewProps={{
            allowsFullscreenVideo: true,
            allowsInlineMediaPlayback: true,
            mediaPlaybackRequiresUserAction: false,
          }}
          initialPlayerParams={{
            rel: false,
            controls: true,
            preventFullScreen: false,
          }}
        />
      ) : (
        <WebView
          style={[styles.webview, loading && styles.hidden]}
          source={{ html: buildDirectVideoHtml(videoUrl!) }}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          onLoadEnd={() => setLoading(false)}
          onError={() => onError('webview_error')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: VIDEO_BG, overflow: 'hidden', justifyContent: 'center' },
  webview: { flex: 1 },
  hidden: { opacity: 0 },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VIDEO_BG,
    gap: 12,
    zIndex: 1,
  },
  loaderText: { color: colors.textInverse, fontSize: 13, fontWeight: '600' },
  fallback: {
    flex: 1,
    backgroundColor: VIDEO_FALLBACK_BG,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  fallbackIcon: { fontSize: 40, marginBottom: spacing.xs },
  fallbackTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textInverse,
    textAlign: 'center',
  },
  watchBtn: {
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: colors.textInverse,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    shadowColor: colors.textInverse,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowOpacity: 0.4,
    elevation: 3,
  },
  watchBtnPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },
  watchBtnText: { fontSize: 14, fontWeight: '900', color: colors.textInverse },
});
