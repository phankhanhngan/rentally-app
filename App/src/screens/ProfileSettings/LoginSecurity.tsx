import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import type { RootStackParams } from "@/navigations/StackNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import BackButton from "@/components/BackButton";
type Props = NativeStackScreenProps<RootStackParams>;

const LoginSecurity = ({ navigation }: Props) => {
  const BackHandler = () => {
    navigation.pop();
  };

  const goToResetPassword = () => {
    navigation.navigate("ResetPassword", { email: "email" });
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={BackHandler} />
      <Text style={styles.header}>Login & Security</Text>
      <View>
        <Text style={styles.login_text}>Login</Text>
        <View style={styles.email_container}>
          <Text style={styles.email_text}>Email</Text>
          <Text>hoang@gmail.com</Text>
        </View>
        <View style={styles.password_container}>
          <Text style={styles.password_text}>Password</Text>
          <Text>***********</Text>
          <TouchableOpacity onPress={goToResetPassword}>
            <Text style={styles.update_text}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.account_container}>
        <Text style={styles.account_text}>Account</Text>
        <View style={styles.disable_container}>
          <Text>Your account is disabled</Text>
          <TouchableOpacity onPress={goToResetPassword}>
            <Text style={styles.disable_text}>Disable</Text>
          </TouchableOpacity>
        </View>
      </View>
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

export default LoginSecurity;

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
    marginBottom: 54,
  },
  login_text: {
    fontSize: 26,
    fontWeight: "500",
    color: "#45474B",
  },
  password_container: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 18,
    paddingTop: 28,
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderBottomColor: "#F1EFEF",
  },
  email_container: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 18,
    paddingTop: 28,
    borderBottomWidth: 1.5,
    borderBottomColor: "#F1EFEF",
  },
  update_text: {
    color: "#29ADB2",
    fontWeight: "bold",
  },
  password_text: {
    fontWeight: "500",
  },
  email_text: {
    fontWeight: "500",
    marginRight: 96,
  },
  account_container: {
    marginTop: 50,
  },
  account_text: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 24,
  },
  disable_container: {
    display: "flex",
    flexDirection: "row",
  },
  disable_text: {
    marginLeft: 24,
    color: "#FF9130",
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
    marginTop: 100,
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
