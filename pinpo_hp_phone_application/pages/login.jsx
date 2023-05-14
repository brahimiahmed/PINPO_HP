import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity, Alert
} from 'react-native';

const LoginScreen = ({ navigation }) => {
    const onPressLogin = () => {
        if (state.email === 'pinpo@hb.com' && state.password === 'pinpo') {
            navigation.navigate("Home");
        } else {
            Alert.alert('Something went wrong', 'Try again', [{ text: 'Okay', onPress: () => { }, style: 'cancel' }],
                { cancelable: true });
        };
    };
    const onPressForgotPassword = () => {
        Alert.alert('Coming soon', 'Try again later', [{ text: 'Okay', onPress: () => { }, style: 'cancel' }], { cancelable: true });
    };
    const onPressSignUp = () => {
        Alert.alert('Coming soon', 'Try again later', [{ text: 'Okay', onPress: () => { }, style: 'cancel' }], { cancelable: true });
    };
    const [state, setState] = useState({ email: '', password: '' })

    return (
        <View style={styles.container}>

            <Text style={styles.title}>PINPO HB</Text>

            <View style={styles.inputView}>
                <TextInput style={styles.inputText} placeholder="Email" placeholderTextColor="#003f5c" onChangeText={text => setState({ email: text, password: state.password })} />
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.inputText} secureTextEntry placeholder="Password" placeholderTextColor="#003f5c"
                    onChangeText={text => setState({ email: state.email, password: text })} />
            </View>

            <TouchableOpacity onPress={onPressForgotPassword}>
                <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressSignUp}>
                <Text style={styles.forgotAndSignUpText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4FD3DA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#3AB4BA",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgotAndSignUpText: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
});
export default LoginScreen;


const showAlert = () =>
    Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
            {
                text: 'Cancel',
                onPress: () => Alert.alert('Cancel Pressed'),
                style: 'cancel',
            },
        ],
        {
            cancelable: true,
            onDismiss: () =>
                Alert.alert(
                    'This alert was dismissed by tapping outside of the alert dialog.',
                ),
        },
    );