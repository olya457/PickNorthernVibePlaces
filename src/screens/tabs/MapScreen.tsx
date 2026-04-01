import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
  Modal,
  Platform,
  useWindowDimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { LOCATIONS, Location } from '../../data/locations';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MapScreen() {
  const navigation = useNavigation<any>();
  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] = useState<Location | null>(null);
  const cardAnim = useRef(new Animated.Value(0)).current;
  const { height } = useWindowDimensions();

  const isVerySmall = height < 680;
  const isSmall = height < 760;
  const topInset = Platform.OS === 'android' ? 20 : 0;

  const showCard = (location: Location) => {
    setSelected(location);
    Animated.spring(cardAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 60,
      friction: 8,
    }).start();
  };

  const hideCard = () => {
    Animated.timing(cardAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => setSelected(null));
  };

  const zoomIn = () => {
    mapRef.current?.getCamera().then(cam => {
      mapRef.current?.animateCamera({
        ...cam,
        altitude: (cam.altitude ?? 1000000) / 2,
        zoom: (cam.zoom ?? 5) + 1,
      });
    });
  };

  const zoomOut = () => {
    mapRef.current?.getCamera().then(cam => {
      mapRef.current?.animateCamera({
        ...cam,
        altitude: (cam.altitude ?? 1000000) * 2,
        zoom: (cam.zoom ?? 5) - 1,
      });
    });
  };

  const fitAll = () => {
    const coords = LOCATIONS.map(l => ({ latitude: l.lat, longitude: l.lng }));
    mapRef.current?.fitToCoordinates(coords, {
      edgePadding: {
        top: isSmall ? 28 : 40,
        right: 24,
        bottom: isSmall ? 28 : 40,
        left: 24,
      },
      animated: true,
    });
  };

  const cardScale = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });

  return (
    <SafeAreaView style={s.container}>
      <View
        style={[
          s.headerWrap,
          {
            paddingTop: (isSmall ? 8 : 12) + topInset,
            paddingBottom: isSmall ? 8 : 12,
          },
        ]}
      >
        <Text
          style={[
            s.headerTitle,
            {
              fontSize: isVerySmall ? 13 : isSmall ? 14 : 17,
              paddingVertical: isVerySmall ? 7 : isSmall ? 8 : 10,
              paddingHorizontal: isVerySmall ? 18 : 24,
            },
          ]}
        >
          Location Map
        </Text>
      </View>

      {!isSmall && (
        <View style={s.leiaBanner}>
          <View style={s.leiaText}>
            <Text style={s.leiaName}>Leia:</Text>
            <Text style={s.leiaDesc}>
              I've marked all the places worth seeing on the map. Tap any pin to open details.
            </Text>
          </View>
          <Image
            source={require('../../assets/onboarding_5.png')}
            style={s.leiaImage}
            resizeMode="cover"
          />
        </View>
      )}

      <View
        style={[
          s.mapContainer,
          {
            marginHorizontal: isVerySmall ? 12 : 16,
            marginBottom: isVerySmall ? 92 : isSmall ? 104 : 112,
            borderRadius: isVerySmall ? 14 : 16,
          },
        ]}
      >
        <MapView
          ref={mapRef}
          style={s.map}
          initialRegion={{
            latitude: 56.0,
            longitude: -96.0,
            latitudeDelta: 45,
            longitudeDelta: 45,
          }}
        >
          {LOCATIONS.map(loc => (
            <Marker
              key={loc.id}
              coordinate={{ latitude: loc.lat, longitude: loc.lng }}
              pinColor="#F5C518"
              onPress={(e) => {
                e.stopPropagation();
                showCard(loc);
              }}
            />
          ))}
        </MapView>

        <View style={[s.controls, { right: isVerySmall ? 8 : 10, top: isVerySmall ? 8 : 10 }]}>
          <TouchableOpacity
            style={[
              s.controlBtn,
              {
                width: isVerySmall ? 32 : isSmall ? 34 : 40,
                height: isVerySmall ? 32 : isSmall ? 34 : 40,
              },
            ]}
            onPress={zoomIn}
          >
            <Text style={[s.controlText, { fontSize: isVerySmall ? 15 : isSmall ? 16 : 20 }]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              s.controlBtn,
              {
                width: isVerySmall ? 32 : isSmall ? 34 : 40,
                height: isVerySmall ? 32 : isSmall ? 34 : 40,
              },
            ]}
            onPress={zoomOut}
          >
            <Text style={[s.controlText, { fontSize: isVerySmall ? 15 : isSmall ? 16 : 20 }]}>−</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              s.controlBtn,
              {
                width: isVerySmall ? 32 : isSmall ? 34 : 40,
                height: isVerySmall ? 32 : isSmall ? 34 : 40,
              },
            ]}
            onPress={fitAll}
          >
            <Text style={[s.controlText, { fontSize: isVerySmall ? 15 : isSmall ? 16 : 20 }]}>⊙</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={selected !== null}
        transparent
        animationType="none"
        onRequestClose={hideCard}
      >
        <TouchableOpacity
          style={[
            s.modalOverlay,
            { paddingHorizontal: isVerySmall ? 16 : 24 },
          ]}
          activeOpacity={1}
          onPress={hideCard}
        >
          <Animated.View
            style={[
              s.card,
              {
                maxWidth: isVerySmall ? 340 : 380,
                opacity: cardAnim,
                transform: [{ scale: cardScale }],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <TouchableOpacity style={s.cardClose} onPress={hideCard}>
                <Text style={s.cardCloseText}>✕</Text>
              </TouchableOpacity>

              {selected && (
                <Image
                  source={selected.image}
                  style={[
                    s.cardImage,
                    { height: isVerySmall ? 128 : isSmall ? 140 : 180 },
                  ]}
                />
              )}

              <View
                style={[
                  s.cardBody,
                  {
                    padding: isVerySmall ? 12 : isSmall ? 14 : 16,
                    gap: isVerySmall ? 5 : isSmall ? 6 : 8,
                  },
                ]}
              >
                {selected && (
                  <>
                    <Text
                      style={[
                        s.cardTitle,
                        { fontSize: isVerySmall ? 13 : isSmall ? 14 : 16 },
                      ]}
                      numberOfLines={1}
                    >
                      {selected.title}
                    </Text>
                    <Text
                      style={[
                        s.cardCoords,
                        { fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 12 },
                      ]}
                    >
                      📍 {selected.lat}, {selected.lng}
                    </Text>
                    <Text
                      style={[
                        s.cardDesc,
                        {
                          fontSize: isVerySmall ? 10.5 : isSmall ? 11 : 13,
                          lineHeight: isVerySmall ? 15 : isSmall ? 16 : 19,
                        },
                      ]}
                      numberOfLines={3}
                    >
                      {selected.description}
                    </Text>
                    <TouchableOpacity
                      style={[
                        s.openBtn,
                        {
                          paddingVertical: isVerySmall ? 9 : isSmall ? 10 : 14,
                          marginTop: isVerySmall ? 2 : 4,
                        },
                      ]}
                      onPress={() => {
                        hideCard();
                        navigation.navigate('Locations', {
                          screen: 'LocationDetail',
                          params: { location: selected },
                        });
                      }}
                    >
                      <Text
                        style={[
                          s.openBtnText,
                          { fontSize: isVerySmall ? 11.5 : isSmall ? 12 : 14 },
                        ]}
                      >
                        Open more
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    gap: 10,
  },
  leiaText: {
    flex: 1,
  },
  leiaName: {
    color: '#F5C518',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
  },
  leiaDesc: {
    color: '#CBD5E1',
    fontSize: 11,
    lineHeight: 16,
  },
  leiaImage: {
    width: 60,
    height: 70,
    borderRadius: 10,
  },

  mapContainer: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  map: {
    flex: 1,
  },

  controls: {
    position: 'absolute',
    gap: 6,
  },
  controlBtn: {
    backgroundColor: '#0D1B2A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  controlText: {
    color: '#fff',
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: '100%',
    backgroundColor: '#0F2744',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  cardClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCloseText: {
    color: '#fff',
    fontSize: 13,
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
  openBtn: {
    backgroundColor: '#F5C518',
    borderRadius: 12,
    alignItems: 'center',
  },
  openBtnText: {
    color: '#000',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});