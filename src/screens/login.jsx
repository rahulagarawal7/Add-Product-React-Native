import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import img from '../../src/assets/images/login.png';
import emailIcon from '../../src/assets/icons/@icon.png';
import passIcon from '../../src/assets/icons/lock.png';
import hide from '../../src/assets/icons/hidePassword.png';
import show from '../../src/assets/icons/showPassword.png';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .post('https://reqres.in/api/login', {email, password})
      .then(response => {
        if (response.data.token) {
          navigation.replace('Home');
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }
      })
      .catch(() => Alert.alert('Login Failed', 'Invalid email or password'));
  };

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.img} source={img} />
      <Text style={styles.loginTextStyle}>Login</Text>
      <View style={styles.inputBoxes}>
        <View style={styles.inputBox}>
          <Image style={styles.emailIcon} source={emailIcon} />
          <TextInput
            style={styles.textInputStyle}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </View>
        <View style={styles.inputBox}>
          <Image style={styles.emailIcon} source={passIcon} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Image style={styles.eyeIcon} source={hide} />
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.btn}>
          <Text style={styles.loginTextStyle}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.forgetPassword}>Forget password ? </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  img: {
    marginTop: 50,
    height: 300,
  },
  loginTextStyle: {
    height: 50,
    marginTop: 20,
    marginLeft: 20,
    fontWeight: '700',
    fontSize: 30,
  },
  emailIcon: {
    marginLeft: 10,
    marginTop: 15,
    height: 20,
    width: 20,
  },
  textInputStyle: {
    marginLeft: 10,
    fontSize: 18,
    height: 50,
    width: 260,
    borderRadius: 5,
    borderWidth: 0.2,
  },
  inputBox: {
    gap: 10,
    height: 50,
    width: 350,
    borderRadius: 5,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  inputBoxes: {
    gap: 20,
  },
  eyeIcon: {
    alignSelf: 'center',
    height: 25,
    width: 25,
  },
  btn: {
    height: 50,
    width: 300,
    backgroundColor: 'blue',
    alignSelf: 'center',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTextStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  forgetPassword: {
    color: 'blue',
    alignSelf: 'flex-end',
    margin: 15,
  },
});

export default Login;
