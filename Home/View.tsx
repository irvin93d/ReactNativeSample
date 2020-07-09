import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Button, SafeAreaView, StyleSheet, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type StackParamList = {
  Weather: undefined
}

type Props = {
  navigation: StackNavigationProp<StackParamList>
}

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Button
          title="Weather App"
          onPress={() => {
            navigation.navigate('Weather')
          }}
        />
      </View>
    </SafeAreaView>
  )
}
export default Home

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})
