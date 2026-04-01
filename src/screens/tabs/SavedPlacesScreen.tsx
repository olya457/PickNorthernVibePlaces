import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { useSaved } from '../../context/SavedContext';
import { Location } from '../../data/locations';

type Category = 'Coast' | 'Forest' | 'Urban';
const CATEGORIES: Category[] = ['Coast', 'Forest', 'Urban'];

export default function SavedPlacesScreen() {
  const { saved, toggleSaved } = useSaved();
  const navigation = useNavigation<any>();
  const [active, setActive] = useState<Category>('Coast');
  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const filtered = saved.filter(l => l.category === active);

  const onShare = async (item: Location) => {
    await Share.share({
      message: `${item.title}\n📍 ${item.lat}, ${item.lng}\n\n${item.description}`,
    });
  };

  if (saved.length === 0) {
    return (
      <SafeAreaView style={s.container}>
        <View
          style={[
            s.headerWrap,
            {
              paddingTop: (isVerySmall ? 8 : 14) + topInset,
              paddingBottom: isVerySmall ? 10 : 14,
            },
          ]}
        >
          <Text
            style={[
              s.headerTitle,
              {
                fontSize: isVerySmall ? 14 : isSmall ? 15 : 17,
                paddingHorizontal: isVerySmall ? 20 : 28,
                paddingVertical: isVerySmall ? 8 : 10,
              },
            ]}
          >
            Saved Places
          </Text>
        </View>

        <View
          style={[
            s.leiaBanner,
            {
              marginHorizontal: isVerySmall ? 12 : 16,
              borderRadius: isVerySmall ? 14 : 16,
              padding: isVerySmall ? 12 : 14,
              marginBottom: isVerySmall ? 10 : 12,
              gap: isVerySmall ? 8 : 10,
            },
          ]}
        >
          <View style={s.leiaText}>
            <Text style={[s.leiaName, { fontSize: isVerySmall ? 13 : 14 }]}>Leia:</Text>
            <Text
              style={[
                s.leiaDesc,
                {
                  fontSize: isVerySmall ? 11 : 12,
                  lineHeight: isVerySmall ? 16 : 18,
                },
              ]}
            >
              Save any place to appear here. Simply open the location and add it to your list, and it will stay with you.
            </Text>
          </View>
          <Image
            source={require('../../assets/onboarding_5.png')}
            style={[
              s.leiaImage,
              {
                width: isVerySmall ? 58 : 70,
                height: isVerySmall ? 68 : 80,
              },
            ]}
            resizeMode="cover"
          />
        </View>

        <View
          style={[
            s.emptyBtns,
            {
              paddingHorizontal: isVerySmall ? 12 : 16,
              gap: isVerySmall ? 10 : 12,
              marginTop: isVerySmall ? 4 : 8,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              s.btnYellow,
              {
                borderRadius: isVerySmall ? 12 : 14,
                paddingVertical: isVerySmall ? 14 : 16,
              },
            ]}
            onPress={() => navigation.navigate('Locations')}
          >
            <Text
              style={[
                s.btnYellowText,
                {
                  fontSize: isVerySmall ? 13 : 15,
                },
              ]}
            >
              See all places
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              s.btnYellow,
              {
                borderRadius: isVerySmall ? 12 : 14,
                paddingVertical: isVerySmall ? 14 : 16,
              },
            ]}
            onPress={() => navigation.navigate('Map')}
          >
            <Text
              style={[
                s.btnYellowText,
                {
                  fontSize: isVerySmall ? 13 : 15,
                },
              ]}
            >
              Open map
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <View
        style={[
          s.headerWrap,
          {
            paddingTop: (isVerySmall ? 8 : 14) + topInset,
            paddingBottom: isVerySmall ? 10 : 14,
          },
        ]}
      >
        <Text
          style={[
            s.headerTitle,
            {
              fontSize: isVerySmall ? 14 : isSmall ? 15 : 17,
              paddingHorizontal: isVerySmall ? 20 : 28,
              paddingVertical: isVerySmall ? 8 : 10,
            },
          ]}
        >
          Saved Places
        </Text>
      </View>

      <View
        style={[
          s.leiaBanner,
          {
            marginHorizontal: isVerySmall ? 12 : 16,
            borderRadius: isVerySmall ? 14 : 16,
            padding: isVerySmall ? 12 : 14,
            marginBottom: isVerySmall ? 10 : 12,
            gap: isVerySmall ? 8 : 10,
          },
        ]}
      >
        <View style={s.leiaText}>
          <Text style={[s.leiaName, { fontSize: isVerySmall ? 13 : 14 }]}>Leia:</Text>
          <Text
            style={[
              s.leiaDesc,
              {
                fontSize: isVerySmall ? 11 : 12,
                lineHeight: isVerySmall ? 16 : 18,
              },
            ]}
          >
            Here are the places you've decided to keep for yourself. You can return to them at any time, review the details, or simply relive their atmosphere.
          </Text>
        </View>
        <Image
          source={require('../../assets/onboarding_5.png')}
          style={[
            s.leiaImage,
            {
              width: isVerySmall ? 58 : 70,
              height: isVerySmall ? 68 : 80,
            },
          ]}
          resizeMode="cover"
        />
      </View>

      <View
        style={[
          s.catWrap,
          {
            paddingHorizontal: isVerySmall ? 12 : 16,
            marginBottom: isVerySmall ? 10 : 12,
          },
        ]}
      >
        <Text
          style={[
            s.catLabel,
            {
              fontSize: isVerySmall ? 11 : 12,
              marginBottom: isVerySmall ? 8 : 10,
              textAlign: 'center',
            },
          ]}
        >
          Categories
        </Text>
        <View style={s.catOuter}>
          <View
            style={[
              s.catRow,
              {
                gap: isVerySmall ? 6 : 8,
                paddingVertical: isVerySmall ? 10 : 12,
                paddingHorizontal: isVerySmall ? 10 : 12,
                borderRadius: isVerySmall ? 22 : 24,
              },
            ]}
          >
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  s.catBtn,
                  active === cat && s.catBtnActive,
                  {
                    paddingHorizontal: isVerySmall ? 14 : 20,
                    paddingVertical: isVerySmall ? 8 : 10,
                    minWidth: isVerySmall ? 84 : 94,
                  },
                ]}
                onPress={() => setActive(cat)}
              >
                <Text
                  style={[
                    s.catText,
                    active === cat && s.catTextActive,
                    { fontSize: isVerySmall ? 12 : 13 },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {filtered.length === 0 ? (
        <View style={s.emptyCategory}>
          <Text
            style={[
              s.emptyCategoryText,
              {
                fontSize: isVerySmall ? 14 : 15,
                paddingHorizontal: 20,
                textAlign: 'center',
              },
            ]}
          >
            No saved {active} places yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            s.list,
            {
              paddingHorizontal: isVerySmall ? 12 : 16,
              paddingTop: isVerySmall ? 2 : 4,
              paddingBottom: isVerySmall ? 110 : 130,
              gap: isVerySmall ? 12 : 14,
            },
          ]}
          renderItem={({ item }) => (
            <View style={[s.card, { borderRadius: isVerySmall ? 14 : 16 }]}>
              <Image
                source={item.image}
                style={[
                  s.cardImage,
                  {
                    height: isVerySmall ? 118 : isSmall ? 124 : 130,
                  },
                ]}
              />
              <View
                style={[
                  s.cardBody,
                  {
                    padding: isVerySmall ? 11 : 12,
                    gap: isVerySmall ? 4 : 5,
                  },
                ]}
              >
                <Text
                  style={[
                    s.cardTitle,
                    { fontSize: isVerySmall ? 13 : 14 },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    s.cardCoords,
                    { fontSize: isVerySmall ? 11 : 12 },
                  ]}
                >
                  📍 {item.lat}, {item.lng}
                </Text>
                <Text
                  style={[
                    s.cardDesc,
                    {
                      fontSize: isVerySmall ? 11 : 12,
                      lineHeight: isVerySmall ? 16 : 18,
                    },
                  ]}
                  numberOfLines={3}
                >
                  {item.description}
                </Text>
                <View
                  style={[
                    s.cardBtns,
                    {
                      gap: isVerySmall ? 6 : 8,
                      marginTop: isVerySmall ? 5 : 6,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      s.btnOpen,
                      {
                        borderRadius: isVerySmall ? 9 : 10,
                        paddingVertical: isVerySmall ? 9 : 10,
                      },
                    ]}
                    onPress={() =>
                      navigation.navigate('Locations', {
                        screen: 'LocationDetail',
                        params: { location: item },
                      })
                    }
                  >
                    <Text
                      style={[
                        s.btnOpenText,
                        { fontSize: isVerySmall ? 11 : 12 },
                      ]}
                    >
                      Open more
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      s.btnShare,
                      {
                        borderRadius: isVerySmall ? 9 : 10,
                        paddingVertical: isVerySmall ? 9 : 10,
                      },
                    ]}
                    onPress={() => onShare(item)}
                  >
                    <Text
                      style={[
                        s.btnShareText,
                        { fontSize: isVerySmall ? 11 : 12 },
                      ]}
                    >
                      Share
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      s.btnRemove,
                      {
                        borderRadius: isVerySmall ? 9 : 10,
                        paddingVertical: isVerySmall ? 9 : 10,
                        paddingHorizontal: isVerySmall ? 12 : 14,
                      },
                    ]}
                    onPress={() => toggleSaved(item)}
                  >
                    <Text
                      style={[
                        s.btnRemoveText,
                        { fontSize: isVerySmall ? 14 : 16 },
                      ]}
                    >
                      🗑
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
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

  emptyBtns: {},

  btnYellow: {
    backgroundColor: '#F5C518',
    alignItems: 'center',
  },
  btnYellowText: {
    color: '#000',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  catWrap: {},
  catLabel: {
    color: '#94A3B8',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  catOuter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  catRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#0F2744',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  catBtn: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#122B47',
  },
  catBtnActive: {
    backgroundColor: '#F5C518',
    borderColor: '#F5C518',
  },
  catText: {
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  catTextActive: {
    color: '#000',
  },

  emptyCategory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCategoryText: {
    color: '#475569',
  },

  list: {},

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
  cardCoords: {
    color: '#F5C518',
  },
  cardDesc: {
    color: '#94A3B8',
  },
  cardBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnOpen: {
    flex: 1,
    backgroundColor: '#F5C518',
    alignItems: 'center',
  },
  btnOpenText: {
    color: '#000',
    fontWeight: '700',
    textTransform: 'uppercase',
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
  },

  btnRemove: {
    backgroundColor: '#1E3A5F',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  btnRemoveText: {},
});