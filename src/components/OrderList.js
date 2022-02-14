import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';
import { PIMARY_COLOR } from "@env"
import LottieView from 'lottie-react-native';

import { Icon, Text, Badge } from 'native-base';




import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userUID = auth().currentUser;
const { width, height } = Dimensions.get('window');

export default function OrderList({ navigation }) {

    const [cards, setCards] = useState([]);
    useEffect(async () => {
        await firestore()
            .collection('orders')
            .where('userUID', '==', userUID.uid)
            .onSnapshot((cardData) => {
                if (cardData.size == 0) {
                    setCards([])
                }
                var tmp = [];
                cardData.docs.map((valueMain) => {
                    firestore()
                        .collection('srServices')
                        .doc(valueMain.data().servicesUID)
                        .onSnapshot((valueChild) => {
                            tmp.push({
                                ...valueMain.data(),
                                ...valueChild.data()
                            })
                            if (cardData.size == tmp.length) {
                                setCards(tmp)
                            }
                        })
                })
            });
    }, []);

    function calDate(val) {
        var date = new Date(val);
        return <Text>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
    }
    return (
        <>
            {
                cards.length == 0 ?
                    (
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            height: 500,
                        }}>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Text style={{ alignSelf: 'center', marginHorizontal: 10, fontSize: 20 }}>No Any Services Booked</Text>
                                <Icon
                                    type="FontAwesome5"
                                    name="shopping-bag"
                                    style={{
                                        fontSize: 23,
                                        color: '#000000',
                                    }}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: '#f4bf56',
                                borderRadius: 10,
                                padding: 10,
                                marginVertical: 30,
                            }} onPress={() => navigation.goBack()}>
                                <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>
                                    Click Here To Book Services
                                </Text>
                            </TouchableOpacity>

                        </View>
                    )
                    :
                    (
                        cards.map((value) => {
                            return (
                                <>
                                    <Card style={{ marginVertical: 4, }}>
                                        <Card.Content style={{ flexDirection: 'row', flex: 1, }}>
                                            <View style={{ flex: 2, }}>
                                                <Title>{value.name}</Title>
                                                <Paragraph>{value.catName}</Paragraph>
                                            </View>
                                            <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={{
                                                    color: value.status == 'PANDING' ? 'red' : 'green'
                                                }}>{value.status}</Text>
                                                <Text>{calDate(value.createdAt)}</Text>
                                            </View>
                                        </Card.Content>
                                        <Card.Cover source={{ uri: value.images }} />
                                        <Card.Actions>
                                            <Button>Price:{value.price}</Button>
                                            <Button>Warnty:{value.warnty}Year</Button>
                                            <Button>
                                                <Icon
                                                    type="FontAwesome5"
                                                    name="info-circle"
                                                    style={{ fontSize: 20, color: '#000000' }}>
                                                </Icon>
                                                <Text>HELP</Text>
                                            </Button>
                                        </Card.Actions>
                                    </Card>
                                </>
                            )
                        })
                    )
            }
        </>
    )
}

const styles = StyleSheet.create({

    LabelStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        fontSize: 30,
    },
    labelStyle: {
        marginVertical: 10,
    },
});