import React from "react";
import MapView, { Marker } from "react-native-maps";

import BackButton from "@/components/BackButton";
import type { RootStackParams } from "@/navigations/StackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
type Props = NativeStackScreenProps<RootStackParams, "MapDetail">;

const MapDetail = ({ navigation, route }: Props) => {
  const BackHandler = () => {
    navigation.pop();
  };

  const initialRegion = {
    latitude: route.params.marker.roomblock.coordinate.latitude,
    longitude: route.params.marker.roomblock.coordinate.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={BackHandler} />
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker coordinate={route.params.marker.roomblock.coordinate} ></Marker>
      </MapView>
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
  price_text_select: {
    backgroundColor: "black",
    color: "white",
    padding: 6,
    borderRadius: 12,
  },
  listing_container: {
    backgroundColor: "white",
    flex: 1,
    position: "absolute",
    transform: [{ scale: 0.8 }],
    bottom: -15,
    borderRadius: 16,
  },
});

export default MapDetail;
