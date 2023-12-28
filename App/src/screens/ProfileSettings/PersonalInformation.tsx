import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import BackButton from '@/components/BackButton';
import type {
  IUpdateProfile,
  IUpdateResponse,
} from '@/interfaces/user.interface';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useUpdateProfileMutation } from '@/redux/services/user/user.service';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
type Props = NativeStackScreenProps<RootStackParams>;

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
        />
        <ErrorMessage
          name={name || ''}
          render={(msg) => <Text style={styles.mesStyle}>{msg}</Text>}
        />
      </View>
    </View>
  );
};

const PersonalInformation = ({ navigation }: Props) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();
  const [updateProfile, updateResponse] = useUpdateProfileMutation();
  const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

  const BackHandler = () => {
    navigation.pop();
  };

  const [imageUri, setImageUri] = useState(userInfo?.photo);
  const fileRef = useRef<any | null>(null);

  useEffect(() => {
    if (updateResponse.data?.status === 'success') {
      dispatch(
        setCredentials({
          accessToken: updateResponse.data?.token.token,
        })
      );
      navigation.pop();
    }
    if (updateResponse.error && 'data' in updateResponse.error) {
      Alert.alert(
        'Invalid data!',
        (updateResponse.error?.data as IUpdateResponse)?.message
      );
    }
  }, [updateResponse]);

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 1000,
        maxWidth: 1000,
      },
      async (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          const imageUri = response.uri || response.assets?.[0]?.uri;
          fileRef.current = response;
          setImageUri(imageUri);
        }
      }
    );
  };

  const initialValues: IUpdateProfile = {
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    photo: userInfo?.photo || '',
    phoneNumber: userInfo?.phoneNumber || '',
  };

  const validate = Yup.object().shape<Record<string, any>>({
    firstName: Yup.string().required('Firstname Required!'),
    lastName: Yup.string().required('Lastname Required!'),
    phoneNumber: Yup.string()
      .matches(
        /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
        'Invalid phone number'
      )
      .required('Number phone must be required!'),
  });

  const submitForm = async (values: IUpdateProfile) => {
    setIsVisibleSpinner(true);
    const formData = new FormData();

    if (fileRef.current) {
      formData.append('photo', {
        type: fileRef.current.assets[0].type,
        uri: fileRef.current.assets[0].uri,
        name: fileRef.current.assets[0].fileName,
        size: fileRef.current.assets[0].fileSize,
        originalname: fileRef.current.assets[0].fileName,
      } as any);
    }
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('phoneNumber', values.phoneNumber);

    await updateProfile(formData).unwrap();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isVisibleSpinner} />
      <BackButton onPress={BackHandler} />
      <Text style={styles.header}>Personal information</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={submitForm}
      >
        {(formik) => {
          const { values, handleChange, handleSubmit } = formik;

          return (
            <View>
              <TouchableOpacity onPress={openImagePicker}>
                <Image style={styles.user_image} source={{ uri: imageUri }} />
              </TouchableOpacity>
              {field(
                'First Name',
                'firstName',
                values.firstName,
                handleChange('firstName')
              )}
              {field(
                'Last Name',
                'lastName',
                values.lastName,
                handleChange('lastName')
              )}
              {field(
                'Phone Number',
                'phoneNumber',
                values.phoneNumber,
                handleChange('phoneNumber')
              )}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.save_button}
              >
                <Text style={styles.save_text}>Save</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
      <View style={styles.middle_container_outer}>
        <View style={styles.middle_container}>
          <View style={{ width: 200 }}>
            <Text style={styles.header_middle}>Rentally</Text>
            <Text>Thank you for using our service</Text>
          </View>
          <Image
            style={styles.logo_user}
            source={require('../../assets/images/rentallyLogo.png')}
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
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 16,
  },
  container_field: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 16,
    paddingTop: 16,
  },
  user_image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  fieldName: {
    fontSize: 16,
    margin: 0,
  },
  input: {
    padding: 0,
    color: 'grey',
  },
  save_button: {
    padding: 12,
    backgroundColor: '#29ADB2',
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginTop: 32,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  save_text: {
    color: 'white',
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
    overflow: 'hidden', // Ẩn nội dung vượt ra ngoài
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  middle_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header_middle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mesStyle: {
    top: 65,
    left: 0,
    fontSize: 10,
    color: 'red',
    position: 'absolute',
  },
});
