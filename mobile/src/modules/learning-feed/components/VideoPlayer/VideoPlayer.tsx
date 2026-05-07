import React, { useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Pressable, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors, spacing, radius } from '../../../../app/theme';

interface Props {
  youtubeId?: string;
  videoUrl?: string;   // Cloudflare R2 / direct MP4
}

// Injected only for YouTube embeds — detects "Video unavailable" overlay
const YT_ERROR_DETECT_JS = `
  (function poll() {
    var el = document.querySelector('.ytp-error') ||
             document.querySelector('.ytp-error-content') ||
             document.querySelector('[class*="unavailable"]');
    if (el && el.offsetParent !== null) {
      window.ReactNativeWebView.postMessage('VIDEO_UNAVAILABLE');
    } else {
      setTimeout(poll, 1000);
    }
  })();
  true;
`;

function buildDirectVideoHtml(url: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body { width:100%; height:100%; background:#000; overflow:hidden; }
    video {
      width:100%;
      height:100%;
      object-fit:contain;
      display:block;
    }
  </style>
</head>
<body>
  <video
    src="${url}"
    controls
    autoplay
    playsinline
    webkit-playsinline
    x5-playsinline
  ></video>
</body>
</html>`;
}

export function VideoPlayer({ youtubeId, videoUrl }: Props) {
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const webviewRef = useRef<InstanceType<typeof WebView>>(null);

  const isDirect = !!videoUrl;

  const youtubeAppUrl = youtubeId ? `vnd.youtube://${youtubeId}` : null;
  const youtubeFallbackUrl = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : null;
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?playsinline=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1`
    : null;

  const openInYouTube = () => {
    if (!youtubeAppUrl || !youtubeFallbackUrl) return;
    Linking.canOpenURL(youtubeAppUrl).then((can) =>
      Linking.openURL(can ? youtubeAppUrl! : youtubeFallbackUrl!),
    );
  };

  if (!videoUrl && !youtubeId) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackTitle}>No video source</Text>
      </View>
    );
  }

  if (unavailable) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackIcon}>🎬</Text>
        <Text style={styles.fallbackTitle}>Embedding disabled</Text>
        <Text style={styles.fallbackSub}>
          This video can't be embedded here.
        </Text>
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

      {isDirect ? (
        // Cloudflare R2 / direct MP4 — injected HTML5 <video> player
        <WebView
          ref={webviewRef}
          style={[styles.webview, loading && styles.hidden]}
          source={{ html: buildDirectVideoHtml(videoUrl!) }}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          onLoadEnd={() => setLoading(false)}
          onError={() => setUnavailable(true)}
        />
      ) : (
        // YouTube embed
        <WebView
          ref={webviewRef}
          style={[styles.webview, loading && styles.hidden]}
          source={{ uri: youtubeEmbedUrl! }}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          thirdPartyCookiesEnabled
          injectedJavaScript={YT_ERROR_DETECT_JS}
          onMessage={(e) => {
            if (e.nativeEvent.data === 'VIDEO_UNAVAILABLE') setUnavailable(true);
          }}
          onLoadEnd={() => setLoading(false)}
          onError={() => setUnavailable(true)}
          onHttpError={(e) => {
            if (e.nativeEvent.statusCode >= 400) setUnavailable(true);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000', overflow: 'hidden' },
  webview: { flex: 1 },
  hidden: { opacity: 0 },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    gap: 12,
    zIndex: 1,
  },
  loaderText: { color: colors.textInverse, fontSize: 13, fontWeight: '600' },
  fallback: {
    flex: 1,
    backgroundColor: '#111',
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
  fallbackSub: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 20,
  },
  watchBtn: {
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    shadowColor: '#fff',
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
  watchBtnText: { fontSize: 14, fontWeight: '900', color: '#fff' },
});
