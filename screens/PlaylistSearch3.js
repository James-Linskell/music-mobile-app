import * as React from "react";
import {Text, View} from "../components/Themed";
import SongCard from "../components/SongCard";
import GenerateInfo from "../helpers/GenerateInfo";
import FetchData from "../helpers/FetchData";
import {ScrollView, StyleSheet} from "react-native";

export default class PlaylistSearch3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null
        }
    }

    componentDidMount() {
        this.waitForFetch();
    }

    waitForFetch = async () => {
        // Set timeout for 'searching' message to appear:
        setTimeout(() => {
            this.setState({
                prompt: "Searching for results..."
            });
        }, 1000);
        // Fetch search data:
        const data = await FetchData.fetchData(this.props.route.params.textInput, 'search', 'playlist');
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
        // if (data.playlists.items.length === 0) {
        //     this.setState({
        //         prompt: "No results found!",
        //     });
        //     return;
        // }

        const playlists = GenerateInfo.generatePlaylistInfo(data.playlists.items);

        var grid = [];

        console.log(playlists);
        console.log(data.playlists);

        for (let i = 0; i < playlists.length; i++) {
            let name = playlists[i].name;
            let description = playlists[i].description;;
            let owner = playlists[i].owner;
            let playlistId = playlists[i].plylistId;
            // Truncate info if it is too long to fit on card:
            if (playlists[i].name.length > 50) {
                name = playlists[i].name.substring(0, 50) + '...'
            }
            if (playlists[i].description.length > 70) {
                description = playlists[i].description.substring(0, 70) + '...'
            }
            if (playlists[i].owner.length > 50) {
                owner = playlists[i].owner.substring(0, 50) + '...'
            }
            grid.push(<SongCard
                onPress={this.onButtonPress.bind(this, playlists[i].playlistId)}
                name={name}
                album={description}
                artist={owner}
                art={playlists[i].art}
                key={i}
            />)
            grid.push(<View style={styles.separator} darkColor="rgba(255,255,255,0.5)" lightColor="rgba(0, 0, 0, 0.1)" key={i+100}/>)
        }

        this.setState({
            results: grid
        })
    }

    onButtonPress = (plId) => {
        this.props.navigation.navigate('PlaylistResults', {
            songId: this.props.route.params.songId,
            plId: plId
        });
    }


    render() {
        return (
            <View>
                <View style={styles.separator} darkColor="rgba(255,255,255,0.5)" lightColor="rgba(0, 0, 0, 0.1)"/>
                <ScrollView>
                    {this.state.results}
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 5,
        height: 1,
        width: '100%',
    }})