import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Transition from './transition';

export default class App extends React.Component {
  state = {
    visible: true
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({visible: !this.state.visible})}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        </TouchableOpacity>

        <Transition.Text
          style={{opacity: this.state.visible ? 1 : 0}}
          duration={1000}
        >
          Hello World
        </Transition.Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
