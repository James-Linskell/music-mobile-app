import * as React from "react";
import {Text, View} from "../../Themed";
import FetchData from "../helpers/FetchData"
import GenerateInfo from "../helpers/GenerateInfo"
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import SongCard from "../components/SongCard";
import { CommonActions } from '@react-navigation/native';
import {Alert} from "react-native";

/**
 * Module for song search results screen. Shows a list of search results.
 * @class
 */
class SearchSong extends React.Component {
    /**
     * Sets default state values and a 'Searching' loading indicator. Calls main function.
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            prompt: "",
            search: "",
            listGrid:
                <View style={styles.loading}>
                    <Text style={styles.loadingText}>Searching for songs...</Text>
                    <ActivityIndicator size="large"/>
                </View>
        }
        this.waitForFetch();
    }

    /**
     * Defines navigation options for React Navigation.
     */
    static navigationOptions = {
        title: 'SearchSong'
    };

    /**
     * This method is called when a search result item is pressed. It redirects to the song analyser results page, or throws an
     * error if device has no internet connection. Takes the song data as parameters.
     * @param name
     * @param album
     * @param artist
     * @param art
     * @param id song id
     */
    onButtonPress = (name, album, artist, art, id) => {
        if (this.props.route.params.chain === "playlist") {
            this.props.navigation.navigate('SearchPlaylist', {
                songInfo: {
                    name: name,
                    album: album,
                    artist: artist,
                    art: art,
                    songId: id
                }
            });
        } else if (this.props.route.params.chain === "song") {
            this.props.navigation.navigate('SongResults', {
                songInfo: {
                    name: name,
                    album: album,
                    artist: artist,
                    art: art,
                    songId: id
                }
            });
        }
    }

    /**
     * Fetches song search results from the Spotify web API using the FetchData helper class. Throws an error and alerts
     * user if the network connection failed.
     */
    waitForFetch = async () => {
        // Fetch search data:
        const data = await FetchData.fetchData(this.props.route.params.textInput, 'search', 'track').catch((error) => {
            // If any fetch error occurred (eg. network or json parsing error), throw error, alert user and navigate home:
            Alert.alert("Network Error", "There was a problem connecting to the server.\n\n" + error);
            this.props.navigation.dispatch(CommonActions.goBack());
            throw new Error(error);
        });
        // Error handling if no search results are returned:
        if (data.tracks.items.length === 0) {
            this.setState({
                prompt: "No results found!",
            });
            return;
        }
        const songs = GenerateInfo.generateSongInfo(data.tracks.items);

        var grid = [];

        // Creates a ListView-like grid of search results:
        for (let i = 0; i < songs.length; i++) {
            let name = songs[i].name;
            let album = songs[i].album;;
            let artist = songs[i].artist;
            let songId = songs[i].songId;
            // Truncate info if it is too long to fit on card:
            if (songs[i].name.length > 30) {
                name = songs[i].name.substring(0, 35) + '...'
            }
            if (songs[i].album.length > 20) {
                album = songs[i].album.substring(0, 25) + '...'
            }
            if (songs[i].artist.length > 40) {
                artist = songs[i].artist.substring(0, 45) + '...'
            }
            grid.push(<SongCard
                onPress={this.onButtonPress.bind(this, name, album, artist, songs[i].art, songs[i].songId)}
                name={name}
                album={album}
                artist={artist}
                art={songs[i].art}
                key={i}
            />)
            grid.push(<View style={styles.separator} darkColor="rgba(255,255,255,0.5)" lightColor="rgba(0, 0, 0, 0.1)" key={i+100}/>)
        }

        this.setState({
            listGrid: grid
        })
    }

    /**
     * Renders the song search results page.
     */
    render() {
        return (
            <View lightColor="rgba(255,255,255,1)" darkColor="rgba(0, 0, 0, 0.1)" style={{flex: 1}}>
                <View style={styles.separator} darkColor="rgba(255,255,255,0.5)" lightColor="rgba(0, 0, 0, 0.1)"/>
                <ScrollView>
                    {this.state.listGrid}
                </ScrollView>
            </View>
        )
    }
}

// Defines styles for Search Song:
const styles = StyleSheet.create({
    gridItem: {
        padding: 10,
        margin: 5
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '100%',
    },
    loading: {
        marginTop: "50%",
        marginBottom: "50%",
        justifyContent: "center"
    },
    loadingText: {
        marginBottom: 20,
        fontSize: 20,
        textAlign: "center",
        justifyContent: "center"
    }
});

export default SearchSong;