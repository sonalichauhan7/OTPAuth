/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';


function App(): React.JSX.Element {
  const [contact, setContact] = useState("+91");
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    console.log("Run....")
  },undefined)

  const handleContact = (text: string) => {
    setContact(text)
  }

  const onSubmitEditing = () => {
    Keyboard.dismiss();
  }

  const generateOtp = async () => {
    try {
      const confirmation: any = await auth().signInWithPhoneNumber(contact);
      setVerificationId(confirmation.verificationId);
    } catch (err) {
      console.log("In catch block =====>", err)
    }
  }

  const confirmOTP = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      await auth().signInWithCredential(credential);
      console.log('Phone number verified!');
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        value={contact}
        onChangeText={(text) => handleContact(text)}
        style={{ borderColor: "green", width: "80%", borderWidth: 1 }}
        maxLength={13}
        keyboardType={"numeric"}
        onSubmitEditing={onSubmitEditing}
      />
      <Button title={"Send OTP"} onPress={generateOtp} />
      {verificationId && (
        <>
          <TextInput
            placeholder="OTP"
            value={code}
            onChangeText={(text) => { setCode(text) }}
            keyboardType="number-pad"
          />
          <Button title="Confirm OTP" onPress={confirmOTP} />
        </>
      )}
      <Text style={{ color: "black", fontSize: 20 }}>{code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default App;
