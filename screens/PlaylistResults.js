import * as React from "react";
import {Text, View} from "../components/Themed";
import {Dimensions} from "react-native";
import { BarChart } from 'react-native-charts';
import FetchData from "../helpers/FetchData";
import SongFitter from "../helpers/SongFitter";

export default class PlaylistResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charts: {
                danceHist: null,
                energyHist: null,
                valenceHist: null
            }
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
        const songId = this.props.route.params.songId;
        const plId = this.props.route.params.plId;
        const plTracks = await FetchData.fetchData('', 'analysis', 'playlists/' +
            plId + '/tracks');
        let plTrackIds = '';
        let n = 0;
        console.log(plTracks);
        console.log(plId);
        plTracks.items.forEach(track => {
            n++;
            // Limit results to chosen song + 100 songs from playlist:
            if (n === 99 || track.track === null) {
                return;
            }
            plTrackIds += track.track.id + ','
        });
        // Remove final comma:
        plTrackIds = plTrackIds.substring(0, (plTrackIds.length) - 1);
        // Index 0 is the song being fitted to the playlist:
        const featureData = await FetchData.fetchData(this.props.route.params.songId +
            ',' + plTrackIds, 'analysis', 'audio-features/?ids=');
        // Error handling if no search results are returned:
        if (featureData.length === 0) {
            this.setState({
                prompt: "Invalid ID",
                invalid: true
            });
            return;
        }
        // Clear all timeouts (as search is complete):
        let id = setTimeout(function () {
        }, 0);
        while (id--) {
            window.clearTimeout(id);
            this.setState({
                prompt: null
            });
        }

        let [charts, fit, scoreChart] = await SongFitter.fitData(featureData);
        console.log(charts);

        this.setState({
            charts: charts
        })
    }

    render() {
        return (
            <View>
                <Text>Hello world</Text>
                {this.state.charts.danceHist}
                {this.state.charts.energyHist}
                {this.state.charts.valenceHist}
            </View>
        );
    }
}