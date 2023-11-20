import React, { useEffect } from "react";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/Feather";
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/FontAwesome";

import "react-native-gesture-handler";
import { initializeState } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hook";
import CheckList from "@/screens/CheckList";
import Comments from "@/screens/Comments";
import ForgotPassword from "@/screens/ForgotPassword";
import Home from "@/screens/Home";
import ListingDetail from "@/screens/ListingDetail";
import Login from "@/screens/Login";
import MyRentalDetail from "@/screens/MyRentalDetail";
import MyRental from "@/screens/MyRentals";
import PrepareContract from "@/screens/PrepareContract";
import type { IOverView } from "@/screens/PrepareContract/Components/OverView";
import Register from "@/screens/Register";
import ResetPassword from "@/screens/ResetPassword";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@/screens/Profile";
import PersonalInformationUpdate from "@/screens/ProfileSettings/PersonalInformation";
import LoginSecurity from "@/screens/ProfileSettings/LoginSecurity";
import Map from "@/screens/ProfileSettings/Map";
export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
  Rooms: undefined;
  Main: undefined;
  Comments: undefined;
  PrepareContract: {
    id: string;
    overView: IOverView;
  };
  Rental: { name: string };
  Room: {
    id: string;
  };
  PersonalInformationUpdate: undefined;
  LoginSecurity: undefined;
  Map: undefined;
};
const StackNavigator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeState());
  }, []);
  const Stack = createNativeStackNavigator<RootStackParams>();
  const Tab = createBottomTabNavigator();
  // const Drawer = createDrawerNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#E36414",
          tabBarLabelStyle: {
            fontFamily: "mon-sb",
          },
        }}
      >
        <Tab.Screen
          name="Rooms"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon3 name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="CheckList"
          component={CheckList}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="heart-o" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MyRental"
          component={MyRental}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon2 name="profile" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",

            tabBarIcon: ({ color }) => (
              <Icon4 name="user" size={40} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ animation: "slide_from_right" }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="Room"
          component={ListingDetail}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="PrepareContract"
          component={PrepareContract}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="Rental"
          component={MyRentalDetail}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="PersonalInformationUpdate"
          component={PersonalInformationUpdate}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="LoginSecurity"
          component={LoginSecurity}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
