import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView, StyleSheet, Dimensions, View } from 'react-native';
import { PIMARY_COLOR } from "@env"

import { Dialog, Portal, Text } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Icon, Label } from 'native-base';

const userUID = auth().currentUser;
const { width, height } = Dimensions.get('window');

export default function ShopCards() {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        firestore()
            .collection('srServices')
            .where('srUserId', '==', userUID.uid)
            .onSnapshot((cardData) => {
                let tmp = [];
                cardData.docs.map((value) => {
                    tmp = [...tmp, value.data()];
                })
                setCards(tmp);
            })
    }, [])

    useEffect(() => {
        console.log(cards);
    }, [cards])

    return (
        cards.map((value) => {
            return (
                <>                    
                    <Card style={{ marginVertical: 4, }}>
                        <Card.Content>
                            <Title>{value.srname}</Title>
                            <Paragraph>{value.srcatName}</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{ uri: value.srimages }} />
                        <Card.Actions>
                            <Button>Price:{value.srprice}</Button>
                            <Button>Warnty:{value.srwarnty}Year</Button>
                        </Card.Actions>
                    </Card>
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
});