import * as React from 'react';
import {Alert, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TextInput, View} from '../components/Themed';
import NetInfo from "@react-native-community/netinfo";

/**
 * Module for Song Analyser screen. This contains information about the Song Analyser.
 */
export default class SongAnalyser extends React.Component {
  /**
   * Sets default state values.
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    }
  }

  /**
   * Defines navigation options for React Navigation.
   */
  static navigationOptions = {
    title: 'PlaylistAnalyser'
  };

  /**
   * This method updates whenever a character is typed in the search box and saves the search query to state.
   * @param search
   */
  onSearchChange = (search: any) => {
    this.setState({ search });
  };

  /**
   * This method is called when the 'Search' button is pressed. It redirects to the search results page, or throws an
   * error if device has no internet connection.
   */
  onButtonPress = () => {
    if (this.state.search === "") {
      return;
    }
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Alert.alert("No Internet Connection", "This app requires an internet connection to function.")
      } else {
        this.props.navigation.navigate('SearchSong', {
          textInput: this.state.search,
          chain: "song"
        });
      }
    });
  }

  /**
   * Renders Song Analyser screen.
   * @return <PlaylistAnalyser/>
   */
  render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.searchBox}>
              <TextInput
                  style={styles.input}
                  placeholder="Search for a song..."
                  onChangeText={this.onSearchChange}
                  value={this.state.search}
                  onSubmitEditing={this.onButtonPress}
              />
              <View style={{height: 40, width: 100, justifyContent: "center"}} darkColor="rgba(255,255,255,0.5)" lightColor="rgba(0, 0, 0, 0.2)">
                <TouchableOpacity  onPress={this.onButtonPress}>
                  <Text style={styles.searchButton}>Search</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.title}>Song Analyser</Text>
            <View style={styles.separator} darkColor="rgba(255,255,255,0.5)" lightColor="rgba(0, 0, 0, 0.1)"/>
            <Text
                style={styles.mainText}>
              The Song Analyser shows you a detailed
              breakdown of the musical data and information for a chosen song. Search for a song to get started!
            </Text>
            <Text style={styles.footer}>
              Note: song must be on Spotify.
            </Text>
          </ScrollView>
        </View>
    )}
}

// Defines styles for Song Analyser:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center"
  },
  separator: {
    marginVertical: 5,
    height: 1,
    alignSelf: "center",
    width: '80%',
  },
  mainText: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'center',
    margin: 20,
  },
  footer: {
    fontSize: 17,
    lineHeight: 26,
    flex: 0,
    textAlign: "center",
  },
  input: {
    paddingLeft: 10,
    fontSize: 20,
    marginRight: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5
  },
  searchBox: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    justifyContent: "center",
    marginTop: 100,
  },
  searchButton: {
    textAlign: "center",
    fontSize: 20
  }
});
