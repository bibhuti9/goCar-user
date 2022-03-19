import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {ScrollView, StyleSheet, Dimensions, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function ServicesListScreen({route, navigation}) {
  var chategory = route.params['chategory'];
  const [data, setData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('srServices')
      .where('srcatName', '==', chategory)
      .onSnapshot(service => {
        setData(
          service.docs.map(values => ({...values.data(), ['id']: values.id})),
        );
      });
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {data.length == 0
        ? null
        : data.map(value => {
            return (
              <Card style={{marginVertical: 4}}>
                <Card.Content>
                  <Title>{value.srname}</Title>
                  <Paragraph>{value.srcatName}</Paragraph>
                </Card.Content>
                <Card.Cover source={{uri: value.srimages}} />
                <Card.Actions>
                  <Button>Price:{value.srprice}</Button>
                  <Button>Warnty:{value.srwarnty}Year</Button>
                </Card.Actions>
              </Card>
            );
          })}
    </>
  );
}
