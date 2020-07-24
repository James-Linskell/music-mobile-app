import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function SongAnalyser() {
  return (
    <View style={styles.container} lightColor="rgba(255, 255, 255, 1)" darkColor="rgba(255,255,255,0)">
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="rgba(0, 0, 0, 0.1)" darkColor="rgba(255,255,255,0.5)" />
      <EditScreenInfo path="/screens/SongAnalyser.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
