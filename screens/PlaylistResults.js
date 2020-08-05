import * as React from "react";
import {Text, View} from "../components/Themed";
import {Dimensions, ScrollView, StyleSheet} from "react-native";
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
            },
            fit: {
                stDevs: [0, 0, 0],
                sigmas: [0, 0, 0]
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

        let [charts, fit, featureInfo] = SongFitter.fitData(featureData);

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
                            <Text style={styles.text}>Positivity:</Text>
                            <Text style={[styles.text, {color: this.state.featureInfo.featureInfoColour[2]}]}>{this.state.featureInfo.featureInfo1[2]}</Text>
                            <Text style={styles.ptext}>{this.state.featureInfo.featureInfo2[2]}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} darkColor="rgba(255,255,255,0.5)" lightColor="rgba(0, 0, 0, 0.1)"/>
                    <View id="Detail">
                        <Text style={styles.head}>Mood features explained:</Text>
                        <Text style={styles.description}>All mood feature data is taken from Spotify, who use algorithms to calculate the numbers shown.</Text>
                        <Text style={styles.head}>Energy:</Text>
                        <Text style={styles.description}>
                            The 'Energy' of a song determines how energetic the song feels, and is a measure of intensity and musical activity, with energetic
                            tracks feeling fast, busy and noisy. Energy is calculated by taking into account the dynamic range,
                            the loudness, the timbre, and the onset rate (rate of notes played). Energy is determined on a scale of 0 - 10,
                            with 10 being the most energetic.
                        </Text>
                        <Text style={styles.description}>
                            The standard deviation of Energy values for the songs in this playlist is {this.state.fit.stDevs[1].toFixed(3)}.
                            The Energy of your song falls within {this.state.fit.sigmas[1]} σ (sigma) of the distribution.
                        </Text>
                        <Text style={styles.head}>Danceability:</Text>
                        <Text style={styles.description}>
                            The 'Danceability' of a song describes how good a track is to dance to. This takes into account
                            a number of musical elements including tempo, how stable the rhythm is, the strength of each beat,
                            and how regular the musical pattern is. Dancibility is determined on a scale of 0 - 10, with 10 being
                            the most danceable.
                        </Text>
                        <Text style={styles.description}>
                            The standard deviation of Danceability values for the songs in this playlist is {this.state.fit.stDevs[0].toFixed(3)}.
                            The danceability of your song falls within {this.state.fit.sigmas[0]} σ (sigma) of the distribution.
                        </Text>
                        <Text style={styles.head}>Positivity:</Text>
                        <Text style={styles.description}>
                            The happiness or 'Valence' of a song is how positive it sounds. Tracks with high valence sound more positive
                            (happy, cheerful, euphoric) while tracks with low valence sound more negative (sad, depressed, angry).
                            Happiness is determined on a scale of 0 - 10, with 10 being the most positive sounding.
                        </Text>
                        <Text style={styles.description}>
                            The standard deviation of Positivity values for the songs in this playlist is {this.state.fit.stDevs[2].toFixed(3)}.
                            The Positivity of your song falls within {this.state.fit.sigmas[2]} σ (sigma) of the distribution.
                        </Text>
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
    },
    description: {
        fontSize: 16,
        padding: 5,
        marginLeft: 10
    },
    head: {
        margin: 10,
        fontSize: 18,
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '100%',
    },
})