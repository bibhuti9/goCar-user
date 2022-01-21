import React, { useEffect, useState } from 'react';

import firestore from '@react-native-firebase/firestore';
import { Text, TouchableOpacity, Image,FlatList } from 'react-native';

export default function CardStoresList({route}) {
    useEffect(()=>{
        console.log(route);
    },[])
    const [store, setStore] = useState([]);
    useEffect(() => {
        firestore()
            .collection('srBasicInfromation')
            .onSnapshot((stores) => {

                setStore(stores.docs.map((values) =>
                    ({...values.data(),['id']:values.id})
                ))
            })
    }, [])

    return (

        <FlatList
            style={{
                marginVertical:35
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={store}
            keyExtractor={(item)=>{item.id}}
            renderItem={({item})=>{
                return(    
                <TouchableOpacity key={item.userUID} style={{marginRight:15,}} onPress={()=>{
                    console.log(route.navigate('About Garage',item));
                }}>
                    <Image style={{
                        height: 120,
                        width: 120,
                        flex: 1,
                        borderRadius:10,
                    }} source={{ uri:item.logo }} />
                </TouchableOpacity>
                )
            }}
        />
    )
}