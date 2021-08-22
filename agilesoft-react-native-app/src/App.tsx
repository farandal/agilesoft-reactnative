import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import RNBootSplash from 'react-native-bootsplash';
import Icon from 'react-native-easy-icon';
import Home from './containers/Home';
import SettingsComponent from './containers/SettingsComponent';
import { useTheme } from './Theme';
import { sleep } from './utils/async';
import NavigationService, { navigationRef } from './lib/NavigationService';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './containers/Start';
import Detail from './containers/Detail';
import { Ionicons } from 'react-native-vector-icons';
import Splash from './components/Slash';
import Login from './containers/Login';
import Toast from 'react-native-toast-message';
import { IAgileSoftGetAuth, IAgileSoftUser } from './utils/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultRootState } from './store';
import { actionDispatch, apiRequest } from './utils/standardActions';
import ACTIONS from './utils/actions';
import SystemMessage from './components/SystemMessage';
import { Config } from './config';

export type AppTabParamList = {
  Home: undefined;
  Settings: { userID?: string };
};

//const Tab = createBottomTabNavigator();
//const Stack = createStackNavigator()

const App = () => {
  //const DefaultStack = createStackNavigator();
  const HomeStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;

  const init = async () => {
    await sleep(1000);
    // …do multiple async tasks
  };

  React.useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide(); // fade animation // {duration: 250}
    });
  }, []);

  const auth: IAgileSoftGetAuth = useSelector(
    (state: DefaultRootState) => state.app.auth
  );
  const authcheck: string = useSelector(
    (state: DefaultRootState) => state.app.authCheck
  );
  //const stateApp:IState = useSelector<IState>(state => state.app );

  React.useEffect(() => {
    //console.log('APP LOADED');
    dispatch(apiRequest(ACTIONS.GET_ME, {}));
    //dispatch(apiRequest(ACTIONS.GET_ME, {}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if(authcheck === "expired" ) {
      //console.log("REQUIREING REFRESH TOKEN");
      dispatch(apiRequest(ACTIONS.GET_REFRESH_TOKEN, {body: { refresh_token:auth.payload.refreshToken}}));
    }
  }, [authcheck]);
  //TODO borrar
  React.useEffect(() => {
    console.log(auth);
  }, [auth]);

  const { t } = useTranslation();

  React.useEffect(() => {
    NavigationService.isReady = false;
  }, []);

  function DetailsScreen() {
    return <Detail />;
  }
  function HomeScreen({ navigation }) {
    return <Home />;
  }
  /*function SettingsScreen({ navigation }) {

    return  <View style={[Layout.fill, { backgroundColor: colors.card }]}><SettingsComponent /></View>;
  }*/

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Details" component={DetailsScreen} />
      </HomeStack.Navigator>
    );
  }

  /*
  const SettingsStack = createStackNavigator();

  function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      </SettingsStack.Navigator>
    );
  }
  */

  const Stack = createStackNavigator();

  const dispatch = useDispatch();

  const tabNavChange = ({ navigation }) => ({
    state: e => {
      // Do something with the state
      //console.log('state changed', e.data);
      dispatch(actionDispatch(ACTIONS.NAVIGATION, e.data));
      // Do something with the `navigation` object
      if (!navigation.canGoBack()) {
        //console.log("we're on the initial screen");
      }
    },
  });

  return (
    <>

      <NavigationContainer
        theme={NavigationTheme}
        ref={navigationRef}
        onReady={() => {
          NavigationService.isReady = true;
        }}>
        {authcheck === 'success' && (
          <>
            <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

            <Tab.Navigator
              initialRouteName={auth ? 'Home' : 'Login'}
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
              screenListeners={tabNavChange}>
              {auth && (
                <Tab.Screen
                  name={`${Config.APP_NAME}`}
                  options={{
                    tabBarLabel: t('home'),
                    tabBarIcon: ({ focused, color, size }) => (
                      <Icon
                        name={focused ? 'home' : 'home-outline'}
                        type="material-community"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                  component={HomeStackScreen}
                />
              )}
              {/*
          <Tab.Screen
            name="Settings"
            options={{
              tabBarLabel: t('settings'),
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name={focused ? 'cog' : 'cog-outline'}
                  type="material-community"
                  size={size}
                  color={color}
                />
              ),
            }}
            component={SettingsStackScreen}
          />
          */}
              <Tab.Screen
                name="Login"
                options={{
                  tabBarLabel: t('login'),
                  tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                      name={focused ? 'account' : 'account-outline'}
                      type="material-community"
                      size={size}
                      color={color}
                    />
                  ),
                }}
                component={Login}
              />
            </Tab.Navigator>
          </>
        )}
      </NavigationContainer>

      {authcheck === 'checking' && (
        <SystemMessage message={'checking'} />

      )}

      {/*<SystemMessage btnText={t(`login`)} onPress={} message={'expired'} />*/}
      {authcheck === 'expired' && (
      <Login/>
      )}
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default App;
