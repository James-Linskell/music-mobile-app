import * as React from "react";
import {Text, View, ScrollView} from "../../Themed";
import {ActivityIndicator, Alert, Dimensions, StyleSheet, TextComponent} from "react-native";
import FetchData from "../helpers/FetchData";
import FeatureChart from "../components/FeatureChart";
import SongCard from "../components/SongCard";

/**
 * Module for Song Analyser results screen. Shows results of the analysis, with information boxes and graphs.
 * @class
 */
class PlaylistResults extends React.Component {
    /**
     * Sets default state values. These are necessary to pre-populate the graphs with null data while the page waits
     * to fetch results. Initialises a loading indicator.
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            rawFeatures: [],
            featureChart:
                <View style={styles.loading}>
                    <Text style={styles.loadingText}>Loading Results...</Text>
                    <ActivityIndicator size="large"/>
                </View>,
            rawAnalysis: [],
            rawTrack: {
                album: {
                    id: "null"
                },
                available_markets: []
            },
            rawAlbum: [],
            data: [],
            options: [],
            prompt: null,
            invalid: false,
            modality: "",
            songCard: null,
            bgImage: null,
            explicit: null,
            live: null,
            instrumental: null,
            musicality: null,
            key: null,
            artists: null,
            embedAlbum: null
        }
    }

    /**
     * Calls the main functions to produce song results asynchronously.
     */
    componentDidMount = async() => {
        await this.waitForFeatures();
        await this.waitForTrack();
        await this.waitForAlbum();
    }

    /**
     * Fetches song data results from the Spotify web API using the FetchData helper class. Throws an error and alerts
     * user if the network connection failed.
     */
    waitForTrack = async () => {
        // Set timeout for 'searching' message to appear:
        setTimeout(() => {
            this.setState({
                prompt: "Searching for results..."
            });
        }, 1000);
        // Fetch search data:
        const songId = this.props.route.params.songInfo.songId;
        const data = await FetchData.fetchData(songId, 'analysis', 'tracks/');
        // Error handling if no search results are returned:
        if (data.length === 0) {
            this.setState({
                prompt: "Invalid song ID",
                invalid: true
            });
            return;
        }

        this.setState({
            rawTrack: data,
        });
        // Fetch my API endpoint for sorting and truncating track data for song card:
        const sortTrackData = await fetch('https://songmapper.herokuapp.com/api/songSort/truncate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let response = await sortTrackData.json();

        let artists = "";
        this.state.rawTrack.artists.forEach(datum => {
            artists += datum.name + ", "
        })
        // Remove final comma:
        artists = artists.substring(0, (artists.length) - 2)
        let explicit = "No";
        if (this.state.rawTrack.explicit) {
            explicit = "Yes";
        }
        this.setState({
            artists: artists,
            explicit: explicit
        })
    }

    /**
     * Fetches song mood feature data results from the Spotify web API using the FetchData helper class. Throws an error and alerts
     * user if the network connection failed.
     */
    waitForFeatures = async () => {
        const songId = this.props.route.params.songInfo.songId;
        const data = await FetchData.fetchData(songId, 'analysis', 'audio-features/');
        // Error handling if no search results are returned:
        if (data.length === 0) {
            this.setState({
                prompt: "Invalid song ID",
                invalid: true
            });
            return;
        }

        // Fetch my API endpoint for sorting track feature data:
        const sortTrackData = await fetch('https://songmapper.herokuapp.com/api/songSort/sortFeatures', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch((error) => {
            // If any fetch error occurred (eg. network or json parsing error), throw error and alert user:
            Alert.alert("Network Error", "" + error);
            throw new Error(error);
        });
        let response = await sortTrackData.json();

        let featureChart = <FeatureChart data={data}/>

        this.setState({
            rawFeatures: data,
            featureChart: featureChart,
            live: response.live,
            acoustic: response.acoustic,
            instrumental: response.instrumental,
            musicality: response.musicality,
            key: response.key
        });
        if (data.mode === 1) {
            this.setState({modality: "Major"})
        } else if (data.mode === 0) {
            this.setState({modality: "Minor"})
        }
    };

    /**
     * Fetches album data results from the Spotify web API using the FetchData helper class. Throws an error and alerts
     * user if the network connection failed.
     */
    waitForAlbum = async () => {
        if (this.state.invalid === true) {
            return;
        }
        const data = await FetchData.fetchData(this.state.rawTrack.album.id, 'analysis', 'albums/').catch((error) => {
            // If any fetch error occurred (eg. network or json parsing error), throw error and alert user:
            Alert.alert("Network Error", "" + error);
            throw new Error(error);
        });
        // Error handling if no search results are returned:
        if (data.length === 0) {
            this.setState({
                prompt: "Invalid song ID",
                invalid: true
            });
            return;
        }
        this.setState({
            rawAlbum: data,
        });
    };

    /**
     * Renders the results page with a loading header 'Loading Results' with a progress indicator. This loading header
     * is updated in the method waitForFeatures when the fetch promise has been returned and the graph created.
     */
    render() {
        return (
            <View>
                <ScrollView>
                    <View style={styles.imgContainer} darkColor="rgba(255,255,255,0.15)" lightColor="rgba(150, 150, 255, 0.1)">
                        <SongCard
                            name={this.props.route.params.songInfo.name}
                            album={this.props.route.params.songInfo.album}
                            artist={this.props.route.params.songInfo.artist}
                            art={this.props.route.params.songInfo.art}/>
                    </View>
                    <View>
                        {this.state.featureChart}
                    </View>
                    <View style={styles.info}>
                        <View style={styles.box} darkColor="rgba(255,255,255,0.15)" lightColor="rgba(150, 150, 255, 0.13)">
                            <Text>Name: {this.state.rawTrack.name}</Text>
                            <Text>Artists: {this.state.artists}</Text>
                            <Text>Explicit lyrics: {this.state.explicit}</Text>
                            <Text>Popularity: {this.state.rawTrack.popularity}</Text>
                            <Text>Length: {((this.state.rawFeatures.duration_ms) / 1000 / 60).toFixed(2)} minutes</Text>
                            <Text>Live: {this.state.live}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.box} darkColor="rgba(255,255,255,0.15)" lightColor="rgba(150, 150, 255, 0.13)">
                            <Text>Tempo: {Math.round(this.state.rawFeatures.tempo)}</Text>
                            <Text>Time signature: {this.state.rawFeatures.time_signature}/4</Text>
                            <Text>Key: {this.state.key}</Text>
                            <Text>Modality: {this.state.modality}</Text>
                            <Text>Acoustic: {this.state.acoustic}</Text>
                            <Text>Instrumental: {this.state.instrumental}</Text>
                            <Text>Musicality: {this.state.musicality}</Text>
                        </View>
                    </View>
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
                            <Text style={styles.head}>Danceability:</Text>
                            <Text style={styles.description}>
                                The 'Danceability' of a song describes how good a track is to dance to. This takes into account
                                a number of musical elements including tempo, how stable the rhythm is, the strength of each beat,
                                and how regular the musical pattern is. Dancibility is determined on a scale of 0 - 10, with 10 being
                                the most danceable.
                            </Text>
                            <Text style={styles.head}>Positivity:</Text>
                            <Text style={styles.description}>
                                The happiness or 'Valence' of a song is how positive it sounds. Tracks with high valence sound more positive
                                (happy, cheerful, euphoric) while tracks with low valence sound more negative (sad, depressed, angry).
                                Happiness is determined on a scale of 0 - 10, with 10 being the most positive sounding.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

// Defines styles for Song Results:
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
    embed: {
        alignItems: "center",
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

export default PlaylistResults;