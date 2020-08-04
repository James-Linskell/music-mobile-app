import * as React from "react";
import {Text, View} from "../components/Themed";
import {Dimensions, ScrollView, StyleSheet} from "react-native";
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
            },
            featureInfo: {
                featureInfo1: [],
                featureInfo2: [],
                featureInfoColour: [],
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

        let [charts, fit, featureInfo] = await SongFitter.fitData(featureData);

        this.setState({
            charts: charts,
            featureInfo: featureInfo
        })
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {this.state.charts.danceHist}
                    <View style={styles.grid}>
                        <View>
                            <Text style={styles.text}>Danceability:</Text>
                            <Text style={[styles.text, {color: this.state.featureInfo.featureInfoColour[0]}]}>{this.state.featureInfo.featureInfo1[0]}</Text>
                            <Text style={styles.ptext}>{this.state.featureInfo.featureInfo2[0]}</Text>
                        </View>
                    </View>
                    {this.state.charts.energyHist}
                    <View style={styles.grid}>
                        <View>
                            <Text style={styles.text}>Energy:</Text>
                            <Text style={[styles.text, {color: this.state.featureInfo.featureInfoColour[1]}]}>{this.state.featureInfo.featureInfo1[1]}</Text>
                            <Text style={styles.ptext}>{this.state.featureInfo.featureInfo2[1]}</Text>
                        </View>
                    </View>
                    {this.state.charts.valenceHist}
                    <View style={styles.grid}>
                        <View>
                            <Text style={styles.text}>Valence:</Text>
                            <Text style={[styles.text, {color: this.state.featureInfo.featureInfoColour[2]}]}>{this.state.featureInfo.featureInfo1[2]}</Text>
                            <Text style={styles.ptext}>{this.state.featureInfo.featureInfo2[2]}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    grid: {
        margin: 10,
        padding: 20,
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        marginTop: 2,
        marginBottom: 5,
        textAlign: "center"
    },
    ptext: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 16
    }
})