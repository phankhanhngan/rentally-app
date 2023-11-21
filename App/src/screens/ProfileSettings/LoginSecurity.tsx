import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import type { RootStackParams } from "@/navigations/StackNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import BackButton from "@/components/BackButton";
import { useAppSelector } from "@/redux/hook";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { useUpdatePasswordMutation } from "@/redux/services/user/user.service";
import { IUpdatePassword, IUpdateResponse } from "@/interfaces/user.interface";
type Props = NativeStackScreenProps<RootStackParams>;

interface Values {
  currentPassword: string;
  newPassword: string;
}

const LoginSecurity = ({ navigation }: Props) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [isShowChangePassword, setIsShowChangePassword] = useState(false);
  const [updatePassword, updateResponse] = useUpdatePasswordMutation();

  useEffect(() => {
    if (updateResponse.data?.status === "success") {
      setIsShowChangePassword(false);
    }
    if (updateResponse.error && "data" in updateResponse.error) {
      Alert.alert(
        "Invalid data!",
        (updateResponse.error?.data as IUpdateResponse)?.message
      );
    }
  }, [updateResponse]);

  const BackHandler = () => {
    navigation.pop();
  };

  const goToChangePassword = () => {
    setIsShowChangePassword(!isShowChangePassword);
  };

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validate = Yup.object().shape<Record<string, any>>({
    currentPassword: Yup.string().required("Current Password Required!"),
    newPassword: Yup.string().required("New Password Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Confirm Password Required"),
  });

  const submitForm = async (values: IUpdatePassword) => {
    await updatePassword(values).unwrap();
  };

  const field = (
    fieldName: string,
    name: string,
    value: string,
    onChangeText?: (text: string) => void
  ) => {
    return (
      <View>
        <View style={styles.container_field}>
          <Text style={styles.fieldName}>{fieldName}</Text>
          <TextInput
            style={styles.input}
            value={value}
            testID={name}
            onChangeText={onChangeText}
            secureTextEntry={true}
          />
          <ErrorMessage
            name={name || ""}
            render={(msg) => <Text style={styles.mesStyle}>{msg}</Text>}
          />
        </View>
      </View>
    );
  };

  const showChangePassword = () => {
    return (
      <View>
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={submitForm}
        >
          {(formik) => {
            const { values, handleChange, handleSubmit } = formik;

            return (
              <View>
                {field(
                  "Current Password",
                  "currentPassword",
                  values.currentPassword,
                  handleChange("currentPassword")
                )}
                {field(
                  "New Password",
                  "newPassword",
                  values.newPassword,
                  handleChange("newPassword")
                )}
                {field(
                  "Confirm Password",
                  "confirmPassword",
                  values.confirmPassword,
                  handleChange("confirmPassword")
                )}
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.save_button}
                >
                  <Text style={styles.save_text}>Update</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={BackHandler} />
      <Text style={styles.header}>Login & Security</Text>
      <View>
        <Text style={styles.login_text}>Login</Text>
        <View style={styles.email_container}>
          <Text style={styles.email_text}>Email</Text>
          <Text>{userInfo?.email}</Text>
        </View>
        <View style={styles.update_container}>
          <View style={styles.password_container}>
            <Text style={styles.password_text}>Password</Text>
            <Text>***********</Text>
            <TouchableOpacity onPress={goToChangePassword}>
              <Text style={styles.update_text}>Update</Text>
            </TouchableOpacity>
          </View>
          {isShowChangePassword && showChangePassword()}
        </View>
      </View>
      <View style={styles.account_container}>
        <Text style={styles.account_text}>Account</Text>
        <View style={styles.disable_container}>
          <Text>Your account is disabled</Text>
          <TouchableOpacity onPress={goToChangePassword}>
            <Text style={styles.disable_text}>Disable</Text>
          </TouchableOpacity>
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
    marginBottom: 36,
  },
  login_text: {
    fontSize: 26,
    fontWeight: "500",
    color: "#45474B",
  },
  update_container: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#F1EFEF",
  },
  password_container: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 18,
    paddingTop: 28,
    justifyContent: "space-between",
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
    marginTop: 30,
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
  mesStyle: {
    top: 60,
    left: 10,
    fontSize: 10,
    color: "red",
    position: "absolute",
  },
  fieldName: {
    fontSize: 14,
    color: "grey",
  },
  input: {
    padding: 4,
    color: "grey",
    borderWidth: 1,
    borderColor: "#F1EFEF",
  },
  container_field: {
    paddingBottom: 12,
    paddingTop: 4,
  },
  save_button: {
    padding: 12,
    backgroundColor: "#29ADB2",
    alignSelf: "flex-start",
    borderRadius: 8,
    marginTop: 8,
    marginLeft: "auto",
    marginRight: "auto",
  },
  save_text: {
    color: "white",
    fontSize: 16,
  },
});
