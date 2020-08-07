import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View, TextInput } from '../components/Themed';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export default class PlaylistAnalyser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
        }
    }

    static navigationOptions = {
            title: 'PlaylistAnalyser'
        };

    onSearchChange = (search: any) => {
        this.setState({ search });
    };

    onButtonPress = () => {
        if (this.state.search === "") {
            return;
        }
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Alert.alert("No Internet Connection", "This app requires an internet connection to function.")
            } else {
                this.props.navigation.navigate('SearchSong', {
                    textInput: this.state.search,
                    chain: "playlist"
                });
            }
        });
    }

    // Sending data in navigation: https://reactnativecode.com/pass-textinput-entered-value-activity-screen/
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search for a song..."
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
                    <Text style={styles.title}>Playlist Analyser</Text>
                    <View style={styles.separator} darkColor="rgba(255,255,255,0.5)" lightColor="rgba(0, 0, 0, 0.1)"/>
                    <Text
                        style={styles.mainText}>
                        The Playlist Analyser calculates how well your song fits in a chosen playlist, and shows you a detailed
                        breakdown of the results. Search for a song to get started!
                    </Text>
                    <Text style={styles.footer}>
                        Note: song and playlist must be on Spotify.
                    </Text>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15,
        textAlign: "center"
    },
    separator: {
        marginVertical: 5,
        height: 1,
        alignSelf: "center",
        width: '80%',
    },
    mainText: {
        fontSize: 20,
        lineHeight: 32,
        textAlign: 'center',
        margin: 20,
    },
    footer: {
        fontSize: 17,
        lineHeight: 26,
        flex: 0,
        textAlign: "center",
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
        marginTop: 100
    },
    searchButton: {
        textAlign: "center",
        fontSize: 20
    }
});
