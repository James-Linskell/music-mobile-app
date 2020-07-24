import * as React from "react";
import {Text, View} from "../components/Themed";
import FetchData from "../helpers/FetchData"
import GenerateInfo from "../helpers/GenerateInfo"

export default class PlaylistSearch1 extends React.Component {
    constructor() {
        super();
        this.state = {
            prompt: "",
            songListRaw: "",
        }
    }

    static navigationOptions = {
            title: 'PlaylistSearch1'
        };

    componentDidMount() {
        console.log(this.props.route.params.textInput);
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

        console.log(data);

        this.setState({songListRaw: data})
        // Error handling if no search results are returned:
        if (data.tracks.items.length === 0) {
            this.setState({
                prompt: "No results found!",
                results: <div className="Margin" ></div>
            });
            return;
        }
        const songs = GenerateInfo.generateSongInfo(this.state.songListRaw.tracks.items);
        this.setState({simplifiedSongList: songs});

        console.log(this.state.simplifiedSongList);

        let array = [];
        songs.forEach(song => {
                array.push(song.name)
            }
        )

        this.setState({
            array: array
        })
    }

    render() {
        return (
            <View>
                <Text>{this.props.route.params.textInput}</Text>
                <Text>{this.state.array}</Text>
            </View>
        )
    }
}