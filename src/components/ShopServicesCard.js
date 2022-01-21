import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView, StyleSheet, Dimensions, View, Image, TouchableOpacity } from 'react-native';
import { PIMARY_COLOR } from "@env"
import { Linking, Platform } from "react-native";

import RBSheet from "react-native-raw-bottom-sheet";


import { Dialog, Portal, Text } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Icon, Label } from 'native-base';

const userUID = auth().currentUser;
const { width, height } = Dimensions.get('window');

export default function ShopServicesCard(garageUID) {

    const book = () => {
        Linking.openURL('https://paytm.me/QkF-Sj4');
      };

    const [cards, setCards] = useState(
        [{ "catName": "Wash", "createdAt": 1642580438813, "essentialService": "This is the best Wash car service", "images": "https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/oil.jpg?alt=media&token=f662cb30-67b8-4627-8c36-afe12b9347fd", "isDeleted": false, "isDisplay": true, "name": "Standard Wash service", "pickUpType": "Paid", "price": "400", "srUserId": "GHW9lXxAzdRTRUSXuNwEGj0NW2v2", "tmTaken": "0 Day,5 Hours,0 Minutes", "warnty": "1" }, { "catName": "Oil", "createdAt": 1642580438813, "essentialService": "This is the best Oli car service", "images": "https://firebasestorage.googleapis.com/v0/b/instahair-6aa4d.appspot.com/o/oil.jpg?alt=media&token=f662cb30-67b8-4627-8c36-afe12b9347fd", "isDeleted": false, "isDisplay": true, "name": "Essentioal Wash service", "pickUpType": "Paid", "price": "500", "srUserId": "GHW9lXxAzdRTRUSXuNwEGj0NW2v2", "tmTaken": "0 Day,1 Hours,2 Minutes", "warnty": "1" }]
    );
    const [rnsheet, setRnsheet] = useState([]);
    const refRBSheet = useRef();
    useEffect(() => {
        // firestore()
        //     .collection('srServices')
        //     .where('srUserId', '==', garageUID['garageUID'])
        //     .onSnapshot((cardData) => {
        //         let tmp = [];
        //         cardData.docs.map((value) => {
        //             tmp = [...tmp, value.data()];
        //         })
        //         setCards(tmp);
        //     })
    }, [])

    useEffect(() => {
        console.log(cards);
    }, [cards])

    return (
        cards.map((value) => {
            return (
                <>
                    <Card style={{ marginVertical: 4, }}>
                        <Card.Content style={{ flexDirection: 'row' }}>
                            <Title>{value.name}</Title>
                            <Button color='#e16e39'>Warnty:{value.warnty}Year</Button>
                        </Card.Content>
                        <Card.Cover source={{ uri: value.images }} />
                        <Card.Actions>
                            <TouchableOpacity style={styles.TouchableOpacityStyle}
                            onPress={()=>{
                                book()
                            }}
                            >
                                <Text style={{ fontStyle: 'italic', textAlign: 'center', fontSize: 20 }}>Booked</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                borderRadius: 10,
                                padding: 5,
                                width: 80,
                                marginRight: 10,
                                borderWidth: 1,
                            }} onPress={() => {
                                setRnsheet(value);
                                refRBSheet.current.open()
                            }}>
                                <Text style={{ fontStyle: 'italic', textAlign: 'center', fontSize: 20 }}>More</Text>
                            </TouchableOpacity>
                            <Button color='#e16e39'>Price:{value.price}</Button>
                        </Card.Actions>
                    </Card>
                    <RBSheet
                        height={height * .72}
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "transparent",
                            },
                            container: {
                                shadowColor: '#d8534f',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                elevation: 20,
                            },
                            draggableIcon: {
                                backgroundColor: "#f39c9a",
                                width: 100,
                            }
                        }}
                    >
                        <Card style={{ marginVertical: 4, }}>
                            <Card.Content style={{ flexDirection: 'row' }}>
                                <Title>{rnsheet.name}</Title>
                                <Button color='#e16e39'>Warnty:{rnsheet.warnty}Year</Button>
                            </Card.Content>
                            <Card.Cover source={{ uri: rnsheet.images }} />
                            <Card.Actions>
                                <Button color='#e16e39'>Price:{rnsheet.price}</Button>
                            </Card.Actions>
                            <Card.Actions>
                                <Title>{rnsheet.essentialService}</Title>
                            </Card.Actions>
                            <Card.Actions>

                            </Card.Actions>
                        </Card>
                    </RBSheet>
                </>
            )
        })
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
    TouchableOpacityStyle: {
        backgroundColor: '#f4bf56',
        borderRadius: 10,
        padding: 5,
        width: 80,
        marginRight: 10,
    }
});