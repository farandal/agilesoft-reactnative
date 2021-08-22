import React, { FC, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  InteractionManager,
  ActivityIndicator,
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Settings,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../Theme';
import { fetchUserAsync } from '../actions/usersActions';
import ACTIONS from '../utils/actions';
import changeThemeAction from '../actions/themeActions';
//import Colors from '../constants/colors';
import useStateSelector from '../utils/useStateSelector';
import { ThemeState } from '../reducers/themeReducer';
import CustomTextInput from '../components/CustomTextInput';
import { useForm, Controller } from 'react-hook-form';
import { actionDispatch, apiRequest } from '../utils/standardActions';
import { IAgileSoftGetAuth, IAgileSoftUser, IRequestAction, IResponseAction, IState } from '../utils/interfaces';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsComponent from './SettingsComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  customBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },

  loginText: {},
});

const Login: FC<{}> = () => {
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const ref = React.createRef();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = data => {
    dispatch(apiRequest(ACTIONS.USER_LOGIN,{body:data}));
  };

  const logoutFn = () => {
    console.log("Dispatching logout")
    dispatch(actionDispatch(ACTIONS.USER_LOGOUT,{}));
  }

  const stateApp:IState = useStateSelector<IState>(state => state.app );
  const action:IResponseAction = useStateSelector<IResponseAction>(state => state.app.action );
  const user:IAgileSoftUser = useStateSelector<IAgileSoftUser>(state => state.app.user );

  useEffect(() => {
    if (action && action.type) {
      switch (action.type) {
        case ACTIONS.USER_LOGIN.SUCCESS:
          console.log("success");
          Toast.show({
            visibilityTime: 4000,
            type:"success",
            position:"top",
            text1: t(`loginSuccess`)
          });

        break;
        case ACTIONS.USER_LOGIN.FAILURE:
          console.log("failure");
          Toast.show({
            visibilityTime: 4000,
            type:"error",
            position:"top",
            text1: t(`loginFailed`)
          });
        break;
      }
    }
  },[action]);

  return (
    <View style={[Layout.fill, Layout.colCenter]}>

      {!user ?
      <>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value, onBlur } }) => (
          <CustomTextInput
            customStyles={{
              inputText: styles.loginText,
              inputView: styles.inputView,
              errorText: { color: Colors.error },
            }}
            placeholder={t(`user`)}
            placeholderTextColor="#003f5c"
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            errors={errors.username}
          />
        )}
        rules={{
          required: {
            value: true,
            message: t(`required`),
          },
        }}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <CustomTextInput
            customStyles={{
              inputText: styles.loginText,
              inputView: styles.inputView,
              errorText: { color: Colors.error },
            }}
            style={styles.TextInput}
            placeholder={t(`password`)}
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            errors={errors.password}
          />
        )}
        rules={{
          required: {
            value: true,
            message: t(`required`),
          },
        }}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}

        style={styles.customBtn}>
        <Text style={styles.loginText}>{t(`login`)}</Text>
      </TouchableOpacity>
        </>
    :
        <>
      <View style={[Layout.fullWidth, Layout.center]} >
            <Text style={[Layout.fullWidth,Fonts.textCenter,Fonts.titleLarge,{marginVertical:10}]}>
            {`${t(`welcomeuser`)} ${user.firstName}  ${user.lastName}!`}
            </Text>

            <SettingsComponent />

            <TouchableOpacity
            onPress={logoutFn}
            style={styles.customBtn}>
            <Text style={styles.loginText}>{t(`logout`)}</Text>
          </TouchableOpacity>

          </View>
       </>


    }
    </View>
  );
};

export default memo(Login);
