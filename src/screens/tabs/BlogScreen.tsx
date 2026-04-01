import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Share,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { BLOG_POSTS, BlogPost } from '../../data/blog';

export default function BlogScreen() {
  const [index, setIndex] = useState(0);
  const post: BlogPost = BLOG_POSTS[index];
  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const onNext = () => {
    if (index < BLOG_POSTS.length - 1) setIndex(i => i + 1);
  };

  const onPrev = () => {
    if (index > 0) setIndex(i => i - 1);
  };

  const onShare = async () => {
    await Share.share({
      message: `${post.title}\n\n${post.description}`,
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <View
        style={[
          s.headerWrap,
          {
            paddingTop: (isVerySmall ? 8 : isSmall ? 10 : 14) + topInset,
            paddingBottom: isVerySmall ? 8 : isSmall ? 10 : 14,
          },
        ]}
      >
        <Text
          style={[
            s.headerTitle,
            {
              fontSize: isVerySmall ? 12.5 : isSmall ? 13 : 17,
              paddingHorizontal: isVerySmall ? 18 : isSmall ? 20 : 28,
              paddingVertical: isVerySmall ? 7 : isSmall ? 8 : 10,
            },
          ]}
        >
          Blog
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.scrollContent,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingBottom: isVerySmall ? 120 : 140,
          },
        ]}
      >
        <View
          style={[
            s.counter,
            { marginBottom: isVerySmall ? 6 : isSmall ? 8 : 10 },
          ]}
        >
          <Text style={[s.counterText, { fontSize: isVerySmall ? 11 : 12 }]}>
            {index + 1} / {BLOG_POSTS.length}
          </Text>
        </View>

        <View
          style={[
            s.card,
            { borderRadius: isVerySmall ? 16 : isSmall ? 18 : 20 },
          ]}
        >
          <Image
            source={post.image}
            style={[
              s.cardImage,
              { height: isVerySmall ? 160 : isSmall ? 180 : 240 },
            ]}
          />
          <View
            style={[
              s.cardBody,
              { padding: isVerySmall ? 12 : isSmall ? 14 : 16 },
            ]}
          >
            <Text
              style={[
                s.cardTitle,
                {
                  fontSize: isVerySmall ? 13 : isSmall ? 14 : 18,
                  marginBottom: isVerySmall ? 6 : isSmall ? 8 : 12,
                },
              ]}
            >
              {post.title}
            </Text>
            <Text
              style={[
                s.cardDesc,
                {
                  fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
                  lineHeight: isVerySmall ? 17 : isSmall ? 18 : 21,
                },
              ]}
            >
              {post.description}
            </Text>
          </View>

          <View
            style={[
              s.btnRow,
              {
                gap: isVerySmall ? 6 : isSmall ? 8 : 10,
                padding: isVerySmall ? 12 : isSmall ? 14 : 16,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                s.btnShare,
                {
                  borderRadius: isVerySmall ? 10 : 12,
                  paddingVertical: isVerySmall ? 9 : isSmall ? 10 : 14,
                },
              ]}
              onPress={onShare}
            >
              <Text
                style={[
                  s.btnShareText,
                  { fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 14 },
                ]}
              >
                Share
              </Text>
            </TouchableOpacity>

            {index > 0 && (
              <TouchableOpacity
                style={[
                  s.btnPrev,
                  {
                    borderRadius: isVerySmall ? 10 : 12,
                    paddingVertical: isVerySmall ? 9 : isSmall ? 10 : 14,
                  },
                ]}
                onPress={onPrev}
              >
                <Text
                  style={[
                    s.btnPrevText,
                    { fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 14 },
                  ]}
                >
                  ← Back
                </Text>
              </TouchableOpacity>
            )}

            {index < BLOG_POSTS.length - 1 ? (
              <TouchableOpacity
                style={[
                  s.btnNext,
                  {
                    borderRadius: isVerySmall ? 10 : 12,
                    paddingVertical: isVerySmall ? 9 : isSmall ? 10 : 14,
                  },
                ]}
                onPress={onNext}
              >
                <Text
                  style={[
                    s.btnNextText,
                    { fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 14 },
                  ]}
                >
                  Next →
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  s.btnNext,
                  {
                    borderRadius: isVerySmall ? 10 : 12,
                    paddingVertical: isVerySmall ? 9 : isSmall ? 10 : 14,
                  },
                ]}
                onPress={() => setIndex(0)}
              >
                <Text
                  style={[
                    s.btnNextText,
                    { fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 14 },
                  ]}
                >
                  Start over
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View
          style={[
            s.dots,
            {
              gap: isVerySmall ? 5 : 6,
              paddingVertical: isVerySmall ? 10 : isSmall ? 12 : 16,
            },
          ]}
        >
          {BLOG_POSTS.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setIndex(i)}>
              <View
                style={[
                  s.dot,
                  isVerySmall && { width: 5, height: 5, borderRadius: 2.5 },
                  i === index && [
                    s.dotActive,
                    isVerySmall && { width: 18 },
                  ],
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: isVerySmall ? 24 : 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },

  headerWrap: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    backgroundColor: '#000',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#333',
  },

  scrollContent: {},

  counter: {
    alignItems: 'center',
  },
  counterText: {
    color: '#475569',
  },

  card: {
    backgroundColor: '#0F2744',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#183656',
  },
  cardImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  cardBody: {},
  cardTitle: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardDesc: {
    color: '#CBD5E1',
    textTransform: 'uppercase',
  },

  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnShare: {
    flex: 1,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
  },
  btnShareText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  btnPrev: {
    flex: 1,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  btnPrevText: {
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  btnNext: {
    flex: 1,
    backgroundColor: '#F5C518',
    alignItems: 'center',
  },
  btnNextText: {
    color: '#000',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#334155',
  },
  dotActive: {
    width: 20,
    backgroundColor: '#F5C518',
  },
});