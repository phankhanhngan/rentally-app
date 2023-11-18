import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

const Map: React.FC = () => {
  const markers = [
    { latitude: 16.088124, longitude: 108.143662, price: "$50" },
    { latitude: 16.06804, longitude: 108.154239, price: "$80" },
    { latitude: 16.067475, longitude: 108.157181, price: "$65" },
    { latitude: 16.061121, longitude: 108.219194, price: "$90" },
  ];

  const mapRef = useRef<MapView>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (isMapReady && mapRef.current && markers.length > 0) {
      let maxLat = markers[0].latitude;
      let minLat = markers[0].latitude;
      let maxLng = markers[0].longitude;
      let minLng = markers[0].longitude;

      markers.forEach((marker) => {
        maxLat = Math.max(maxLat, marker.latitude);
        minLat = Math.min(minLat, marker.latitude);
        maxLng = Math.max(maxLng, marker.longitude);
        minLng = Math.min(minLng, marker.longitude);
      });

      const midLat = (maxLat + minLat) / 2;
      const midLng = (maxLng + minLng) / 2;
      const deltaLat = maxLat - minLat + 0.02;
      const deltaLng = maxLng - minLng + 0.02;

      mapRef.current.fitToCoordinates(
        [
          { latitude: midLat - deltaLat / 2, longitude: midLng - deltaLng / 2 },
          { latitude: midLat + deltaLat / 2, longitude: midLng + deltaLng / 2 },
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [isMapReady, markers]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        onMapReady={() => setIsMapReady(true)}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker}>
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{marker.price}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 4,
  },
  calloutText: {
    color: "black",
    fontSize: 16,
  },
});

export default Map;
