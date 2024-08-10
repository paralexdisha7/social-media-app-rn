import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import ScreenWrapper from '../components/screenWrapper'
import Loading from '../components/loading'

const index = () => {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Loading/>
    </View>
  )
}

export default index