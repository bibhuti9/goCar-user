import {
    ScrollView,
    StyleSheet,
    Dimensions,
    View,
    Image,
    Alert,
    TouchableOpacity,
    Modal,
    Animated,
    Text,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import LottieView from 'lottie-react-native';

// Model
const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal}>
            <View style={style.modalBackGround}>
                <Animated.View
                    style={[style.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};
export default function ShowSuccessMsh({setShowSuccessMsg,showSuccessMsg}) {
    useEffect(()=>{
        console.log(showSuccessMsg);
    });
    const [visible, setVisible] = React.useState(false);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ModalPoup visible={showSuccessMsg}>
                <View style={{ alignItems: 'center' }}>
                    <View style={style.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Image
                                source={require('../assets/lottie/x.png')}
                                style={{ height: 30, width: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <LottieView
                        style={{ height: 120, width: 120 }}
                        source={require('../assets/lottie/93181-success.json')} autoPlay />
                </View>

                <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                    Congratulations Orderd was successful
                </Text>
                <TouchableOpacity style={{
                    alignSelf: 'center',
                    backgroundColor: '#f4bf56',
                    borderRadius: 20,
                    padding: 10,
                    marginRight: 10,
                    width: '70%',
                    alignItems: 'center'
                }} onPress={() => setShowSuccessMsg(false)}>
                    <Text>
                        Got It
                    </Text>
                </TouchableOpacity>
            </ModalPoup>
        </View>
    );
}


const style = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
      },
      header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
});
