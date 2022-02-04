import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import Home from './src/Home'
import { withAuthenticator } from 'aws-amplify-react-native'

Amplify.configure(awsconfig)

async function signUp() {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}

async function signIn() {
  try {
      const user = await Auth.signIn(username, password);
  } catch (error) {
      console.log('error signing in', error);
  }
}

async function resendConfirmationCode() {
  try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
  } catch (err) {
      console.log('error resending code: ', err);
  }
}

async function signOut() {
  try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home/>
    </View>
  );
}

export default withAuthenticator(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
