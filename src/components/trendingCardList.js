import React, { useEffect, useState } from 'react';
import { Icon, View } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';

export default function TrendingCardList() {

    const [trendingList, setTrendingList] = useState([]);
    useEffect(() => {
        firestore()
            .collection('trendingOfferList')
            .onSnapshot((trendingList) => {
                setTrendingList(trendingList.docs.map((values) =>
                    ({ ...values.data(), ['id']: values.id })
                ))
            })
    }, [])

    return (

        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={trendingList}
            keyExtractor={(item) => { item.id }}
            renderItem={
                ({ item }) => {
                    return (
                        <TouchableOpacity key={item.id} style={style.secondLable}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{
                                    width: 100,
                                    alignSelf: 'center'
                                }}>{item.name}</Text>
                                <Image style={{
                                    height: 130,
                                    width: 130,
                                    flex: 1,
                                }} source={{ uri: item.icon }} />
                            </View>
                        </TouchableOpacity>
                    )
                }
            }
        />
    )
}
const style = StyleSheet.create({
    secondLable: {
        paddingHorizontal:8,
        backgroundColor: '#ffffff',
        marginHorizontal: 5,
        borderRadius: 10,
    },
})