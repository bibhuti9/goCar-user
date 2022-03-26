import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchScreen() {
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                padding: 5
            }}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    styles={{
                        container:{
                            flex:0
                        },
                        textInput:{
                            fontSize:20
                        }

                    }}
                    minLength={2}
                    enablePoweredByContainer={false}
                    query={{
                        key: '',
                        language: 'en',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />
            </View>
        </SafeAreaView>
    )
}