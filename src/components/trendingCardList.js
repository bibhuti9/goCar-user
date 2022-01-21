import React, { useEffect, useState } from 'react';

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
                            <Text style={{
                                width: 100
                            }}>{item.name}</Text>
                            <Image style={{
                                height: 50,
                                width: 50,
                                flex: 1,
                            }} source={{ uri: item.icon }} />
                        </TouchableOpacity>
                    )
                }
            }
        />
    )
}
const style = StyleSheet.create({
    secondLable: {
      flexDirection: 'row',
      padding: 15,
      backgroundColor: '#ffffff',
      marginHorizontal: 5,
      borderRadius: 10,
    },
  })