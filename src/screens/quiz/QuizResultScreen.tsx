import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Share,
  Platform,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

export default function QuizResultScreen({ navigation, route }: any) {
  const { score, total } = route.params;
  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const onShare = async () => {
    await Share.share({
      message: `I scored ${score}/${total} on the Northern Vibe Quiz! 🏆`,
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
          Northern Vibe Quiz
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.scrollContent,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingBottom: isVerySmall ? 30 : 40,
          },
        ]}
      >
        <View
          style={[
            s.card,
            {
              marginBottom: isVerySmall ? 60 : 70,
              borderRadius: isVerySmall ? 16 : 20,
              padding: isVerySmall ? 14 : isSmall ? 16 : 24,
              gap: isVerySmall ? 8 : isSmall ? 10 : 14,
            },
          ]}
        >
          <Text
            style={[
              s.resultsLabel,
              {
                fontSize: isVerySmall ? 18 : isSmall ? 20 : 26,
              },
            ]}
          >
            Results
          </Text>

          <Text
            style={[
              s.scoreLabel,
              {
                fontSize: isVerySmall ? 11 : isSmall ? 12 : 14,
              },
            ]}
          >
            Correct answers: <Text style={s.scoreNumber}>{score}/{total}</Text>
          </Text>

          <Text
            style={[
              s.desc,
              {
                fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
                lineHeight: isVerySmall ? 16 : isSmall ? 17 : 20,
              },
            ]}
          >
            You have completed this section. You can now return to the places you left off or continue browsing in any direction. If you wish, you can go through it again to consolidate your knowledge.
          </Text>

          <Image
            source={require('../../assets/onboarding_5.png')}
            style={[
              s.leiaImage,
              {
                width: isVerySmall ? 100 : isSmall ? 120 : 160,
                height: isVerySmall ? 100 : isSmall ? 120 : 160,
              },
            ]}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={[
              s.btnYellow,
              {
                borderRadius: isVerySmall ? 12 : 14,
                paddingVertical: isVerySmall ? 11 : isSmall ? 12 : 16,
              },
            ]}
            onPress={() => navigation.replace('QuizMain')}
          >
            <Text
              style={[
                s.btnYellowText,
                {
                  fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
                },
              ]}
            >
              Try again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              s.btnPurple,
              {
                borderRadius: isVerySmall ? 12 : 14,
                paddingVertical: isVerySmall ? 11 : isSmall ? 12 : 16,
              },
            ]}
            onPress={onShare}
          >
            <Text
              style={[
                s.btnPurpleText,
                {
                  fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
                },
              ]}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
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

  scrollContent: {
    flexGrow: 1,
  },

  card: {
    flex: 1,
    backgroundColor: '#4A0E35',
    alignItems: 'center',
    width: '100%',
  },

  resultsLabel: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  scoreLabel: {
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  scoreNumber: {
    color: '#F5C518',
  },

  desc: {
    color: '#E2C4D8',
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  leiaImage: {},

  btnYellow: {
    backgroundColor: '#F5C518',
    alignItems: 'center',
    width: '100%',
  },
  btnYellowText: {
    color: '#000',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  btnPurple: {
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    width: '100%',
  },
  btnPurpleText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});