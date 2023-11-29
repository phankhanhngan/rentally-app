import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import BackButton from "@/components/BackButton";
import type { RootStackParams } from "@/navigations/StackNavigator";
import Listing from "@/components/Listing";
import { IRoomFinding } from "@/interfaces/roomfinding.interface";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { useGetFindingRoomsQuery } from "@/redux/services/findingRoom/findingRoom.service";
type Props = NativeStackScreenProps<RootStackParams>;

const Map = ({ navigation, route }: Props) => {
  const BackHandler = () => {
    navigation.pop();
  };

  const { data, isLoading, isFetching } = useGetFindingRoomsQuery({});
  const [markers, setMarkers] = useState<IRoomFinding[]>([]);
  const mapRef = useRef<MapView>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [indexRoom, setIndexRoom] = useState(-1);

  useEffect(() => {
    setMarkers(data?.data?.rooms || []);

    if (isMapReady && mapRef.current && markers.length > 0) {
      let maxLat = markers[0].coordinate.latitude;
      let minLat = markers[0].coordinate.latitude;
      let maxLng = markers[0].coordinate.longitude;
      let minLng = markers[0].coordinate.longitude;

      markers.forEach((marker) => {
        maxLat = Math.max(maxLat, marker.coordinate.latitude);
        minLat = Math.min(minLat, marker.coordinate.latitude);
        maxLng = Math.max(maxLng, marker.coordinate.longitude);
        minLng = Math.min(minLng, marker.coordinate.longitude);
      });

      const midLat = (maxLat + minLat) / 2;
      const midLng = (maxLng + minLng) / 2;
      const deltaLat = maxLat - minLat + 0.02;
      const deltaLng = maxLng - minLng + 0.02;

      mapRef.current.fitToCoordinates(
        [
          {
            latitude: midLat - deltaLat / 2,
            longitude: midLng - deltaLng / 2,
          },
          {
            latitude: midLat + deltaLat / 2,
            longitude: midLng + deltaLng / 2,
          },
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [data, isMapReady]);

  const handlePressMarker = (index: number) => {
    if (index === -1 || index !== indexRoom) {
      setTimeout(() => {
        setIndexRoom(index);
      }, 400);
    } else {
      setIndexRoom(-1);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={BackHandler} />
      <MapView
        style={styles.map}
        ref={mapRef}
        onMapReady={() => setIsMapReady(true)}
        onRegionChange={() => setIndexRoom(-1)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            onPress={() => handlePressMarker(index)}
          >
            <Text style={styles.price_text}>
              {Number(marker.price) / 1000000} m
            </Text>
          </Marker>
        ))}
      </MapView>
      {indexRoom !== -1 && (
        <View style={styles.listing_container}>
          <Listing
            key={markers[indexRoom].id}
            data={markers[indexRoom]}
            name={markers[indexRoom].id}
            onPress={(id) => {
              navigation.navigate("Room", { id });
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
  calloutContainer: {},
  calloutText: {
    color: "black",
    fontSize: 16,
  },
  price_text: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 12,
  },
  listing_container: {
    backgroundColor: "white",
    flex: 1,
    position: "absolute",
    transform: [{ scale: 0.8 }],
    bottom: -15,
  },
});

export default Map;
