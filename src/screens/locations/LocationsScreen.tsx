import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  useWindowDimensions,
  Share,
} from 'react-native';
import { LOCATIONS, Location } from '../../data/locations';

type Category = 'Coast' | 'Forest' | 'Urban';
const CATEGORIES: Category[] = ['Coast', 'Forest', 'Urban'];

export default function LocationsScreen({ navigation }: any) {
  const [active, setActive] = useState<Category>('Coast');
  const { height } = useWindowDimensions();

  const isVerySmall = height < 700;
  const isSmall = height < 780;

  const filtered = useMemo(
    () => LOCATIONS.filter((l: Location) => l.category === active),
    [active]
  );

  const topInset = Platform.OS === 'android' ? 20 : 0;

  const handleShare = async (item: Location) => {
    try {
      await Share.share({
        message: `${item.title}\n${item.description}\n${item.lat}, ${item.lng}`,
      });
    } catch (e) {}
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={[s.headerWrap, { paddingTop: 16 + topInset }]}>
        <Text
          style={[
            s.headerTitle,
            isVerySmall && {
              fontSize: 15,
              paddingHorizontal: 20,
              paddingVertical: 9,
            },
          ]}
        >
          Places
        </Text>
      </View>

      <View style={[s.catWrap, isVerySmall && { marginTop: 4 }]}>
        <Text style={[s.catLabel, { textAlign: 'center' }]}>Categories</Text>

        <View style={s.catOuter}>
          <View
            style={[
              s.catRow,
              isVerySmall && {
                paddingVertical: 10,
                paddingHorizontal: 10,
                gap: 6,
              },
            ]}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  s.catBtn,
                  active === cat && s.catBtnActive,
                  isVerySmall && {
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    minWidth: 88,
                  },
                ]}
                activeOpacity={0.85}
                onPress={() => setActive(cat)}
              >
                <Text
                  style={[
                    s.catText,
                    active === cat && s.catTextActive,
                    isVerySmall && { fontSize: 12 },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.list,
          {
            paddingBottom: 120 + (isSmall ? 20 : 0),
            paddingTop: isVerySmall ? 12 : 16,
          },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[s.card, isVerySmall && { borderRadius: 14 }]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('LocationDetail', { location: item })}
          >
            <Image
              source={item.image}
              style={[
                s.cardImage,
                { height: isVerySmall ? 140 : isSmall ? 150 : 160 },
              ]}
            />
            <View
              style={[
                s.cardBody,
                {
                  padding: isVerySmall ? 12 : 14,
                  gap: isVerySmall ? 5 : 6,
                },
              ]}
            >
              <Text style={[s.cardTitle, isVerySmall && { fontSize: 14 }]}>
                {item.title}
              </Text>
              <Text style={[s.cardCoords, isVerySmall && { fontSize: 11.5 }]}>
                {item.lat}, {item.lng}
              </Text>
              <Text
                style={[
                  s.cardDesc,
                  isVerySmall && { fontSize: 11.5, lineHeight: 17 },
                ]}
                numberOfLines={3}
              >
                {item.description}
              </Text>

              <View style={[s.cardBtns, isVerySmall && { gap: 8, marginTop: 4 }]}>
                <TouchableOpacity
                  style={[
                    s.btnYellow,
                    isVerySmall && {
                      paddingVertical: 9,
                      paddingHorizontal: 12,
                      flex: 1,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate('LocationDetail', { location: item })
                  }
                >
                  <Text style={[s.btnYellowText, isVerySmall && { fontSize: 11 }]}>
                    Open more
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    s.btnPurple,
                    isVerySmall && {
                      paddingVertical: 9,
                      paddingHorizontal: 12,
                    },
                  ]}
                  onPress={() => handleShare(item)}
                >
                  <Text style={[s.btnPurpleText, isVerySmall && { fontSize: 11 }]}>
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
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
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#333',
  },

  catWrap: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  catLabel: {
    color: '#94A3B8',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  catOuter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  catRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#0F2744',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  catBtn: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    minWidth: 94,
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
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  catTextActive: {
    color: '#000',
  },

  list: {
    paddingHorizontal: 16,
    gap: 16,
  },

  card: {
    backgroundColor: '#0F2744',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#183656',
  },
  cardImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  cardBody: {
    gap: 6,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardCoords: {
    color: '#F5C518',
    fontSize: 12,
  },
  cardDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
  },
  cardBtns: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    alignItems: 'center',
  },

  btnYellow: {
    backgroundColor: '#F5C518',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  btnYellowText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  btnPurple: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  btnPurpleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});