import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  ImageSourcePropType,
  Platform,
} from 'react-native';

type Props = {
  step: number;
  total: number;
  title: string;
  description: string;
  buttonLabel: string;
  image: ImageSourcePropType;
  onPress: () => void;
  onSkip: () => void;
};

export default function OnboardingSlide({
  step,
  total,
  title,
  description,
  buttonLabel,
  image,
  onPress,
  onSkip,
}: Props) {
  const isAndroid = Platform.OS === 'android';

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <View style={s.overlay} />
      <SafeAreaView style={s.safe}>
        <View style={[s.titleWrap, isAndroid && s.titleWrapAndroid]}>
          <Text style={s.title}>{title}</Text>
        </View>

        <View style={[s.imageWrap, isAndroid && s.imageWrapAndroid]}>
          <Image source={image} style={s.image} resizeMode="contain" />
        </View>

        <View style={[s.card, isAndroid && s.cardAndroid]}>
          <Text style={s.desc}>{description}</Text>

          <View style={s.dots}>
            {Array.from({ length: total }).map((_, i) => (
              <View key={i} style={[s.dot, i + 1 === step && s.dotActive]} />
            ))}
          </View>

          <View style={s.row}>
            <TouchableOpacity style={s.btn} onPress={onPress} activeOpacity={0.85}>
              <Text style={s.btnText}>{buttonLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSkip} activeOpacity={0.7}>
              <Text style={s.skip}>SKIP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  safe: {
    flex: 1,
  },
  titleWrap: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  titleWrapAndroid: {
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  imageWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapAndroid: {
    transform: [{ translateY: 30 }],
  },
  image: {
    width: '80%',
    height: '80%',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 30,
    backgroundColor: '#0D1B3E',
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  cardAndroid: {
    marginBottom: 60,
  },
  desc: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#F5C518',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  btn: {
    flex: 1,
    backgroundColor: '#F5C518',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  skip: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
  },
});