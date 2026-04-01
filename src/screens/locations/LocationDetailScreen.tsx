import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Share,
  Platform,
  useWindowDimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Location } from '../../data/locations';
import { useSaved } from '../../context/SavedContext';

export default function LocationDetailScreen({ navigation, route }: any) {
  const location: Location = route.params.location;
  const [showMap, setShowMap] = useState(false);
  const { toggleSaved, isSaved } = useSaved();
  const saved = isSaved(location.id);
  const { height } = useWindowDimensions();

  const isVerySmall = height < 700;
  const isSmall = height < 780;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const onShare = async () => {
    await Share.share({
      message: `${location.title}\n📍 ${location.lat}, ${location.lng}\n\n${location.description}`,
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <View
        style={[
          s.header,
          {
            paddingTop: 12 + topInset,
            paddingHorizontal: isVerySmall ? 12 : 16,
            paddingBottom: isVerySmall ? 10 : 12,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={[s.backArrow, isVerySmall && { fontSize: 20 }]}>←</Text>
        </TouchableOpacity>

        <View
          style={[
            s.headerTitleWrap,
            isVerySmall && {
              paddingHorizontal: 14,
              paddingVertical: 8,
            },
          ]}
        >
          <Text style={[s.headerTitle, isVerySmall && { fontSize: 12.5 }]}>
            {location.title}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + (isSmall ? 20 : 0) }}
      >
        <Image
          source={location.image}
          style={[
            s.image,
            { height: isVerySmall ? 200 : isSmall ? 210 : 220 },
          ]}
        />

        <View
          style={[
            s.body,
            {
              padding: isVerySmall ? 14 : 16,
              gap: isVerySmall ? 12 : 14,
            },
          ]}
        >
          <Text style={[s.coords, isVerySmall && { fontSize: 12.5 }]}>
            📍 {location.lat}, {location.lng}
          </Text>

          <Text style={[s.desc, isVerySmall && { fontSize: 13, lineHeight: 20 }]}>
            {location.description}
          </Text>

          <View style={[s.btnRow, isVerySmall && { gap: 8 }]}>
            <TouchableOpacity style={s.btnPurple} onPress={onShare}>
              <Text style={[s.btnPurpleText, isVerySmall && { fontSize: 13 }]}>
                Share
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.btnIcon, isVerySmall && { padding: 12 }]}
              onPress={() => setShowMap((v) => !v)}
            >
              <Text style={[s.btnIconText, isVerySmall && { fontSize: 17 }]}>
                🗺️
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                s.btnIcon,
                saved && s.btnIconActive,
                isVerySmall && { padding: 12 },
              ]}
              onPress={() => toggleSaved(location)}
            >
              <Text style={[s.btnIconText, isVerySmall && { fontSize: 17 }]}>
                {saved ? '🔖' : '📌'}
              </Text>
            </TouchableOpacity>
          </View>

          {saved && (
            <View style={s.savedBadge}>
              <Text
                style={[s.savedBadgeText, isVerySmall && { fontSize: 12.5 }]}
              >
                ✓ Added to Saved Places
              </Text>
            </View>
          )}

          {showMap && (
            <View
              style={[
                s.mapWrap,
                { height: isVerySmall ? 200 : isSmall ? 210 : 220 },
              ]}
            >
              <MapView
                style={s.map}
                initialRegion={{
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.5,
                }}
              >
                <Marker
                  coordinate={{ latitude: location.lat, longitude: location.lng }}
                  title={location.title}
                />
              </MapView>
            </View>
          )}
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 12,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 22,
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 34,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  image: {
    width: '100%',
    resizeMode: 'cover',
  },

  body: {
    gap: 14,
  },
  coords: {
    color: '#F5C518',
    fontSize: 13,
    fontWeight: '600',
  },
  desc: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
  },

  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  btnPurple: {
    flex: 1,
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPurpleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  btnIcon: {
    backgroundColor: '#0F2744',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIconActive: {
    borderColor: '#F5C518',
    backgroundColor: '#1a2f4a',
  },
  btnIconText: {
    fontSize: 18,
  },

  savedBadge: {
    backgroundColor: '#14532d',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  savedBadgeText: {
    color: '#4ade80',
    fontSize: 13,
    fontWeight: '600',
  },

  mapWrap: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});