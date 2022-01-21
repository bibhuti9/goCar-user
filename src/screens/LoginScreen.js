import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Touchable,
} from 'react-native';
export default function LoginScreen({route, navigation}) {
  const [mobNo, setMobNo] = useState('');
  const [confirm, setConfirm] = useState();
  const [countryCode, setCountryCode] = useState('+91');
  const [otpway, setOtpway] = useState(true);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <TextInput
        style={{
          width: '80%',
          borderBottomWidth: 1,
          borderRadius: 10,
          margin: 10,
          padding: 5,
          marginBottom: 80,
          height: 50,
          textAlign: 'center',
          fontSize: 20,
        }}
        placeholder="10 digit mobile number"
        maxLength={10}
        keyboardType="numeric"
        placeholderTextColor="#000000"
        onChangeText={data => setMobNo(countryCode + data)}
      />
      <TouchableOpacity
        style={{
          // borderWidth:1,
          width: '50%',
          padding: 10,
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: '#106084',
          elevation: 5,
        }}
        onPress={() => {
          console.log(mobNo);
          navigation.navigate('VerificationScreen', {mobNo: mobNo});
        }}>
        <Text style={{color: '#FFFFFF'}}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
