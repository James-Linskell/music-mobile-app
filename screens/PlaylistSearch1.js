import * as React from "react";
import {Text, View} from "../components/Themed";
import FetchData from "../helpers/FetchData"
import GenerateInfo from "../helpers/GenerateInfo"
import {ScrollView, StyleSheet} from "react-native";
import SongCard from "../components/SongCard";
import { StackActions } from '@react-navigation/native';

export default class PlaylistSearch1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prompt: "",
            search: ""
        }
    }

    static navigationOptions = {
            title: 'PlaylistSearch1'
        };

    componentDidMount() {
        console.log(this.props.route.params.textInput);
        this.waitForFetch();
    }

    onButtonPress = (name, album, artist, art, id) => {
        this.props.navigation.navigate('PlaylistSearch2', {
            songInfo: {
                name: name,
                album: album,
                artist: artist,
                art: art,
                songId: id
            }
        });
    }

    waitForFetch = async () => {
        // Set timeout for 'searching' message to appear:
        setTimeout(() => {
            this.setState({
                prompt: "Searching for results..."
            });
        }, 1000);
        // Fetch search data:
        const data = await FetchData.fetchData(this.props.route.params.textInput, 'search', 'track');
        // Clear all timeouts (as search is complete):
        let id = setTimeout(function () {
        }, 0);
        while (id--) {
            window.clearTimeout(id);
            this.setState({
                prompt: null
            });
        }
        // Error handling if no search results are returned:
        if (data.tracks.items.length === 0) {
            this.setState({
                prompt: "No results found!",
            });
            return;
        }
        const songs = GenerateInfo.generateSongInfo(data.tracks.items);

        var grid = [];

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

    render() {
        return (
            <View lightColor="rgba(255,255,255,1)" darkColor="rgba(0, 0, 0, 0.1)">
                <View style={styles.separator} darkColor="rgba(255,255,255,0.5)" lightColor="rgba(0, 0, 0, 0.1)"/>
                <ScrollView>
                    {this.state.listGrid}
                </ScrollView>
            </View>
        )
    }
}

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
});