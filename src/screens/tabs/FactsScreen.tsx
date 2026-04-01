import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Share,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { FACTS } from '../../data/facts';

export default function FactsScreen() {
  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const onShare = async (text: string) => {
    await Share.share({ message: text });
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
          Northern Facts
        </Text>
      </View>

      <FlatList
        data={FACTS}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.list,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingTop: isVerySmall ? 2 : 4,
            paddingBottom: isVerySmall ? 120 : 140,
            gap: isVerySmall ? 10 : isSmall ? 10 : 12,
          },
        ]}
        ListHeaderComponent={() => (
          <View
            style={[
              s.leiaBanner,
              {
                borderRadius: isVerySmall ? 14 : 16,
                padding: isVerySmall ? 10 : isSmall ? 12 : 14,
                marginBottom: isVerySmall ? 10 : isSmall ? 12 : 16,
                gap: isVerySmall ? 8 : 10,
              },
            ]}
          >
            <View style={s.leiaText}>
              <Text
                style={[
                  s.leiaName,
                  {
                    fontSize: isVerySmall ? 11.5 : isSmall ? 12 : 14,
                    marginBottom: isVerySmall ? 3 : 4,
                  },
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
                Here I have collected short facts about Canada and its nature. They help you better understand what you are seeing and pay attention to details that are easy to miss.
              </Text>
            </View>
            <Image
              source={require('../../assets/onboarding_1.png')}
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
        )}
        ListFooterComponent={() => (
          <View style={{ height: isVerySmall ? 20 : 32 }} />
        )}
        renderItem={({ item }) => (
          <View
            style={[
              s.card,
              {
                borderRadius: isVerySmall ? 14 : 16,
                padding: isVerySmall ? 12 : isSmall ? 14 : 20,
                gap: isVerySmall ? 7 : isSmall ? 8 : 12,
              },
            ]}
          >
            <Text style={[s.cardIcon, { fontSize: isVerySmall ? 20 : isSmall ? 22 : 28 }]}>
              💡
            </Text>
            <Text
              style={[
                s.cardText,
                {
                  fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
                  lineHeight: isVerySmall ? 16 : isSmall ? 17 : 20,
                },
              ]}
            >
              {item.text}
            </Text>
            <TouchableOpacity
              style={[
                s.shareBtn,
                {
                  borderRadius: isVerySmall ? 10 : 12,
                  paddingVertical: isVerySmall ? 9 : isSmall ? 10 : 12,
                  paddingHorizontal: isVerySmall ? 24 : 40,
                },
              ]}
              onPress={() => onShare(item.text)}
            >
              <Text
                style={[
                  s.shareBtnText,
                  {
                    fontSize: isVerySmall ? 11 : isSmall ? 12 : 14,
                  },
                ]}
              >
                Share
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
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

  list: {},

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
  },
  leiaDesc: {
    color: '#CBD5E1',
    textTransform: 'uppercase',
  },
  leiaImage: {
    borderRadius: 10,
  },

  card: {
    backgroundColor: '#4A0E35',
    alignItems: 'center',
  },
  cardIcon: {},
  cardText: {
    color: '#F1E6EE',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  shareBtn: {
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    width: '100%',
  },
  shareBtnText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});