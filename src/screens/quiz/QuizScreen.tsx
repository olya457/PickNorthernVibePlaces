import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { QUIZ_QUESTIONS } from '../../data/quiz';

const LABELS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ navigation }: any) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const question = QUIZ_QUESTIONS[current];
  const total = QUIZ_QUESTIONS.length;

  const onSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const onNext = () => {
    const isCorrect = selected === question.correct;
    const newScore = isCorrect ? score + 1 : score;

    if (current + 1 >= total) {
      navigation.replace('QuizResult', { score: newScore, total });
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setScore(newScore);
    }
  };

  const getOptionStyle = (i: number) => {
    if (selected === null) return s.optionDefault;
    if (i === question.correct) return s.optionCorrect;
    if (i === selected && selected !== question.correct) return s.optionWrong;
    return s.optionDefault;
  };

  const getOptionTextStyle = (i: number) => {
    if (selected === null) return s.optionTextDefault;
    if (i === question.correct) return s.optionTextCorrect;
    if (i === selected && selected !== question.correct) return s.optionTextWrong;
    return s.optionTextDefault;
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
          s.scroll,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingTop: isVerySmall ? 12 : 16,
            paddingBottom: isVerySmall ? 120 : 140,
            gap: isVerySmall ? 10 : 14,
          },
        ]}
      >
        <View
          style={[
            s.leiaBanner,
            {
              borderRadius: isVerySmall ? 14 : 16,
              padding: isVerySmall ? 10 : 14,
              gap: isVerySmall ? 8 : 10,
            },
          ]}
        >
          <View style={s.leiaText}>
            <Text
              style={[
                s.leiaName,
                { fontSize: isVerySmall ? 11.5 : isSmall ? 12 : 14 },
              ]}
            >
              Leia:
            </Text>
            <Text
              style={[
                s.leiaDesc,
                {
                  fontSize: isVerySmall ? 9.5 : isSmall ? 10 : 12,
                  lineHeight: isVerySmall ? 14 : isSmall ? 15 : 18,
                },
              ]}
            >
              Here are 20 questions about places in Canada. They are simple, but with details that are easy to miss. Choose your answers and discover new nuances for yourself.
            </Text>
          </View>
          <Image
            source={require('../../assets/onboarding_5.png')}
            style={[
              s.leiaImage,
              {
                width: isVerySmall ? 52 : isSmall ? 56 : 70,
                height: isVerySmall ? 60 : isSmall ? 64 : 80,
              },
            ]}
            resizeMode="cover"
          />
        </View>

        <View
          style={[
            s.questionCard,
            {
              borderRadius: isVerySmall ? 14 : 16,
              padding: isVerySmall ? 12 : isSmall ? 14 : 18,
              gap: isVerySmall ? 5 : isSmall ? 6 : 8,
            },
          ]}
        >
          <Text
            style={[
              s.questionNum,
              {
                fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
              },
            ]}
          >
            Question {current + 1}/{total}
          </Text>
          <Text
            style={[
              s.questionText,
              {
                fontSize: isVerySmall ? 11 : isSmall ? 12 : 14,
                lineHeight: isVerySmall ? 16 : isSmall ? 18 : 22,
              },
            ]}
          >
            {question.question}
          </Text>
        </View>

        <View style={[s.options, { gap: isVerySmall ? 7 : isSmall ? 8 : 10 }]}>
          {question.options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                s.option,
                getOptionStyle(i),
                {
                  borderRadius: isVerySmall ? 12 : 14,
                  padding: isVerySmall ? 11 : isSmall ? 12 : 16,
                },
              ]}
              onPress={() => onSelect(i)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  s.optionText,
                  getOptionTextStyle(i),
                  {
                    fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
                  },
                ]}
              >
                {LABELS[i]}. {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selected !== null && (
          <TouchableOpacity
            style={[
              s.nextBtn,
              {
                borderRadius: isVerySmall ? 12 : 14,
                paddingVertical: isVerySmall ? 11 : isSmall ? 12 : 16,
                marginTop: isVerySmall ? 2 : isSmall ? 4 : 6,
              },
            ]}
            onPress={onNext}
          >
            <Text
              style={[
                s.nextBtnText,
                {
                  fontSize: isVerySmall ? 12 : isSmall ? 13 : 15,
                },
              ]}
            >
              {current + 1 >= total ? 'See results' : 'Next →'}
            </Text>
          </TouchableOpacity>
        )}
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

  scroll: {},

  leiaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F2744',
  },
  leiaText: {
    flex: 1,
  },
  leiaName: {
    color: '#F5C518',
    fontWeight: '700',
    marginBottom: 4,
  },
  leiaDesc: {
    color: '#CBD5E1',
    textTransform: 'uppercase',
  },
  leiaImage: {
    borderRadius: 10,
  },

  questionCard: {
    backgroundColor: '#4A0E35',
    alignItems: 'center',
  },
  questionNum: {
    color: '#F5C518',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  questionText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  options: {},

  option: {
    alignItems: 'center',
  },
  optionDefault: {
    backgroundColor: '#F5C518',
  },
  optionCorrect: {
    backgroundColor: '#16A34A',
  },
  optionWrong: {
    backgroundColor: '#DC2626',
  },

  optionText: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  optionTextDefault: {
    color: '#000',
  },
  optionTextCorrect: {
    color: '#fff',
  },
  optionTextWrong: {
    color: '#fff',
  },

  nextBtn: {
    backgroundColor: '#F5C518',
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#000',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});