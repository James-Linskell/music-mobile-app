import * as React from "react";
import {Text, TextInput, View} from "../../Themed";
import { ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import SongCard from "../components/SongCard";

/**
 * Module for Search Playlist screen. Shows the selected song from the song search, and a search box to search for a
 * playlist.
 * @class
 */
class SearchPlaylist extends React.Component {
    /**
     * Sets default state values.
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            chosenCard: null,
            search: ""
        }
    }

    /**
     * Defines navigation options for React Navigation.
     */
    static navigationOptions = {
        title: 'PlaylistAnalyser'
    };

    /**
     * This method is called when the 'Search' button is pressed. It redirects to the search results page, or throws an
     * error if device has no internet connection.
     */
    onButtonPress = () => {
        if (this.state.search === "") {
            return;
        }
        this.props.navigation.navigate('SearchPlaylistResults', {
            textInput: this.state.search,
            songId: this.props.route.params.songInfo.songId,
            songInfo: this.props.route.params.songInfo
        });
    }

    /**
     * This method updates whenever a character is typed in the search box and saves the search query to state.
     * @param search
     */
    onSearchChange = (search) => {
        this.setState({ search });
    };

    /**
     * Calls function to generate a SongCard once component has mounted. Necessary to receive props.
     */
    componentDidMount() {
        let chosenCard = <SongCard
            name={this.props.route.params.songInfo.name}
            album={this.props.route.params.songInfo.album}
            artist={this.props.route.params.songInfo.artist}
            art={this.props.route.params.songInfo.art}/>

        this.setState({
            chosenCard: chosenCard,
        });
    }

    /**
     * Renders the playlist search page.
     */
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.separator}/>
                    <View>
                        {this.state.chosenCard}
                    </View>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <Text style={{padding: 30, fontSize: 18}}>
                        Search for a playlist to compare your chosen song:
                    </Text>
                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search for a playlist..."
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
                </ScrollView>
            </View>
        );
    }
}


// Defines styles for Search Playlist:
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
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
        marginTop: 20,
    },
    searchButton: {
        textAlign: "center",
        fontSize: 20
    },
});

export default  SearchPlaylist;