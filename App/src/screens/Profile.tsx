import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import IconEvil from "react-native-vector-icons/EvilIcons";
import IconFeather from "react-native-vector-icons/Feather";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "@/navigations/StackNavigator";
import OptionSettings from "./ProfileSettings/OptionSettings";
type Props = NativeStackScreenProps<RootStackParams>;

const Profile = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userInfo = useAppSelector((state) => state.auth.accessToken);

  const goToPersonalInformation = () => {
    navigation.navigate("PersonalInformationUpdate");
  };

  const goToLoginSecurity = () => {
    navigation.navigate("LoginSecurity");
  };

  const goToLogout = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.profile_container}>
      <View style={styles.header_container}>
        <Image
          style={styles.logo_user}
          source={require("../assets/images/user_logo.png")}
        />
        <View>
          <Text style={styles.name}>Hoang</Text>
          <Text style={{ color: "#A9A9A9" }}>Show profile</Text>
        </View>
      </View>
      <View style={styles.middle_container_outer}>
        <View style={styles.middle_container}>
          <View style={{ width: 200 }}>
            <Text style={styles.header_middle}>Rentally your place</Text>
            <Text>It's simple to get set up and start earning.</Text>
          </View>
          <Image
            style={styles.logo_user}
            source={require("../assets/images/rentallyLogo.png")}
          />
        </View>
      </View>
      <View style={styles.settings_container}>
        <Text style={styles.header_settings}>Settings</Text>
        <OptionSettings
          icon="user-o"
          content="Personal information"
          iconName="Icon"
          event={goToPersonalInformation}
        />
        <OptionSettings
          icon="lock"
          content="Login & security"
          iconName="Feather"
          event={goToLoginSecurity}
        />
        <OptionSettings
          icon="credit-card"
          content="Payments and payouts"
          iconName="Icon"
        />
      </View>
      <View style={styles.logout_container}>
        <TouchableOpacity onPress={goToLogout}>
          <Text style={styles.logout_text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile_container: {
    backgroundColor: "white",
    padding: 16,
    flex: 1,
  },
  header_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1.5,
    borderBottomColor: "#F1EFEF",
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
    marginTop: 24,
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
  settings_container: {},
  header_settings: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 24,
  },
  personal_left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon_user: {
    marginRight: 16,
  },
  name_personal: {
    fontSize: 18,
    color: "grey",
  },
  container_settings: {
    backgroundColor: "white",
    borderBottomColor: "#A9A9A9",
    borderBottomWidth: 1,
    padding: 2,
    paddingBottom: 16,
    paddingTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  options: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  content: {
    fontSize: 18,
    color: "grey",
  },
  logout_container: {
    marginTop: 16,
    paddingBottom: 16,
    paddingTop: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: "#F1EFEF",
  },
  logout_text: {
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline'
  }
});
