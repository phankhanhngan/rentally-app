import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import type { RootStackParams } from "@/navigations/StackNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import BackButton from "@/components/BackButton";
import { launchImageLibrary } from "react-native-image-picker";
type Props = NativeStackScreenProps<RootStackParams>;

const field = (fieldName: string, content: string) => {
  return (
    <View>
      <View style={styles.container_field}>
        <Text style={styles.fieldName}>{fieldName}</Text>
        <TextInput style={styles.input}>{content}</TextInput>
      </View>
    </View>
  );
};

const PersonalInformation = ({ navigation }: Props) => {
  const BackHandler = () => {
    navigation.pop();
  };

  const [imageUri, setImageUri] = useState(null);

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      (response: any) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
          console.log(response);
        } else if (response.error) {
          console.log("Image picker error: ", response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          setImageUri(imageUri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={BackHandler} />
      <Text style={styles.header}>Personal information</Text>
      {/* Image */}
      <TouchableOpacity onPress={openImagePicker}>
        <Image style={styles.user_image}
          source={
            imageUri
              ? { uri: imageUri }
              : require("../../assets/images/user_logo.png")
          }
        />
      </TouchableOpacity>
      {field("First Name", "Vo")}
      {field("Last Name", "Khang")}
      {field("Phone Number", "038128521")}
      <TouchableOpacity style={styles.save_button}>
        <Text style={styles.save_text}>Save</Text>
      </TouchableOpacity>
      <View style={styles.middle_container_outer}>
        <View style={styles.middle_container}>
          <View style={{ width: 200 }}>
            <Text style={styles.header_middle}>Rentally</Text>
            <Text>Thank you for using our service</Text>
          </View>
          <Image
            style={styles.logo_user}
            source={require("../../assets/images/rentallyLogo.png")}
          ></Image>
        </View>
      </View>
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 16,
  },
  container_field: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 16,
    paddingTop: 16,
  },
  user_image: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  fieldName: {
    fontSize: 16,
    margin: 0,
  },
  input: {
    padding: 0,
    color: "grey",
  },
  save_button: {
    padding: 12,
    backgroundColor: "#29ADB2",
    alignSelf: "flex-start",
    borderRadius: 8,
    marginTop: 32,
    marginLeft: "auto",
    marginRight: "auto",
  },
  save_text: {
    color: "white",
    fontSize: 16,
  },
  logo_user: {
    width: 54,
    height: 54,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
  },
  middle_container_outer: {
    marginTop: 50,
    marginBottom: 32,
    borderRadius: 18, // Độ cong ngoài cùng
    overflow: "hidden", // Ẩn nội dung vượt ra ngoài
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  middle_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    backgroundColor: "white",
  },
  header_middle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
