import * as React from "react";
import {Text, View} from "../components/Themed";
import {ActivityIndicator, Alert, Dimensions, ScrollView, StyleSheet} from "react-native";
import FetchData from "../helpers/FetchData";
import SongCard from "../components/SongCard";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import Histogram from "../components/Histogram";

/**
 * Module for Playlist Analyser results screen. Shows results of the analysis, with information boxes and graphs.
 */
export default class PlaylistResults extends React.Component {
    /**
     * Sets default state values then calls the main function (waitForFetch). These are necessary to pre-populate the graphs with null data while the page waits
     * to fetch results. Initialises a loading indicator.
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            charts: {
                danceHist: null,
                energyHist: null,
                valenceHist: null
            },
            scoreChart: null,
            score: 0,
            featureInfo: {
                featureInfo1: [],
                featureInfo2: [],
                featureInfoColour: [],
            },
            fit: {
                stDevs: [0, 0, 0],
                sigmas: [0, 0, 0]
            },
            loadContent:
                <View style={styles.loading}>
                    <Text style={styles.loadingText}>Analysing playlist...</Text>
                    <ActivityIndicator size="large"/>
                </View>
        }
        this.waitForFetch();
    }

    /**
     * Fetches song/playlist data results from the Spotify web API using the FetchData helper class. Then it creates the
     * final score chart and histograms, renders the finished page and saves this page to state. Throws an error and alerts
     * user if the network connection failed.
     */
    waitForFetch = async () => {
        // Fetch search data:
        const plId = this.props.route.params.plId;
        const plTracks = await FetchData.fetchData('', 'analysis', 'playlists/' +
            plId + '/tracks').catch((error) => {
            // If any fetch error occurred (eg. network or json parsing error), throw error and alert user:
            Alert.alert("Network Error", "" + error);
            throw new Error(error);
        });
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
            ',' + plTrackIds, 'analysis', 'audio-features/?ids=').catch((error) => {
            // If any fetch error occurred (eg. network or json parsing error), throw error and alert user:
            Alert.alert("Network Error", "" + error);
            throw new Error(error);
        });

        // Fetch my API endpoint for sorting and pre-processing the data:
        const sortData = await fetch('http://music-web-app-server.herokuapp.com/api/plSort', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(featureData)
        }).catch((error) => {
            // If any fetch error occurred (eg. network or json parsing error), throw error and alert user:
            Alert.alert("Network Error", "" + error);
            throw new Error(error);
        });
        // Receive the sorted json data:
        let response = await sortData.json();
        let screenWidth = Dimensions.get('window').width - 60;

        let scoreChart =
            <VictoryChart width={screenWidth} height={93} padding={10}>
                <VictoryAxis dependentAxis
                             domain={[0, 12]}
                             style={{axis: {strokeWidth: 0}}}
                />
                <VictoryBar
                    horizontal
                    data={[{ feature: 0, number: response.score }]}
                    x="feature"
                    y="number"
                    alignment="start"
                    barWidth={70}
                    style={{
                        data: {
                            fill: response.chartColour
                        }
                    }}
                />
            </VictoryChart>

        let charts = {
            danceHist: <Histogram data={response.simplify.datasets.dance} index={response.simplify.index.danceIndex} type="Danceability"/>,
            energyHist: <Histogram data={response.simplify.datasets.energy} index={response.simplify.index.energyIndex} type="Energy"/>,
            valenceHist: <Histogram data={response.simplify.datasets.valence} index={response.simplify.index.valenceIndex} type="Positivity"/>,
        }

        this.setState({
            charts: charts,
            featureInfo: {
                featureInfo1: response.featureInfo1,
                featureInfo2: response.featureInfo2,
                featureInfoColour: response.featureInfoColour,
            },
            scoreChart: scoreChart,
            score: response.score,
            fit: response.simplify.fit
        })

        this.setState({
            loadContent:
                <View>
                    <View style={styles.imgContainer} darkColor="rgba(255,255,255,0.15)" lightColor="rgba(150, 150, 255, 0.1)">
                        <SongCard
                            name={this.props.route.params.songInfo.name}
                            album={this.props.route.params.songInfo.album}
                            artist={this.props.route.params.songInfo.artist}
                            art={this.props.route.params.songInfo.art}/>
                    </View>
                    <View style={{width: "85%", marginLeft: 28}} darkColor="rgba(255,255,255,0.9)" lightColor="rgba(150, 150, 255, 0.1)">
                        {this.state.scoreChart}
                    </View>
                    <View style={styles.info}>
                        <View style={styles.boxFit} darkColor="rgba(255,255,255,0.15)" lightColor="rgba(150, 150, 255, 0.1)">
                            <Text style={styles.textFit}>{Math.round((this.state.score/12) * 100)}% Fit!</Text>
                        </View>
                    </View>
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
                </View>
        })
    }

    /**
     * Renders the results page with a loading header 'Analysing Playlist' with a progress indicator. This loading header
     * is updated in the method waitForFetch when all fetch promises have been returned.
     */
    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        {this.state.loadContent}
                    </View>

                    <View style={styles.separator} darkColor="rgba(255,255,255,0.8)" lightColor="rgba(150, 150, 255, 0.1)"/>
                    <View style={styles.info}>
                        <View style={styles.box} darkColor="rgba(255,255,255,0.15)" lightColor="rgba(150, 150, 255, 0.13)">
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
                    </View>
                </ScrollView>
            </View>
        );
    }
}

// Defines styles for Playlist Results:
const styles = StyleSheet.create({
    grid: {
        margin: 5,
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
    textFit: {
        fontSize: 40,
        marginTop: 2,
        marginBottom: 5,
        textAlign: "center"
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
        width: '95%',
        alignSelf: "center"
    },
    info: {
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: 10,
        paddingBottom: 10,
    },
    box: {
        padding: 20,
    },
    boxFit: {
        padding: 10,
        marginTop: 10
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
    },
    imgContainer: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
})