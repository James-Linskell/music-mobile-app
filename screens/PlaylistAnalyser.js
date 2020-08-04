import * as React from 'react';
import {Button, KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native';

import Colors from "../constants/Colors";
import { Text, View, TextInput } from '../components/Themed';
import {MaterialIcons} from "@expo/vector-icons";
import Navigation from "../navigation";

function SearchIcon(props: { name: string; color: string }) {
    return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

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
        this.props.navigation.navigate('SearchSong', {
            textInput: this.state.search,
            chain: "playlist"
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
                        />
                        <Button title="Search" onPress={this.onButtonPress}/>
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
        padding: 15,
        fontSize: 20,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 30,
        width: 250,
        backgroundColor: "white",
    },
    searchBox: {
        display: "flex",
        flexDirection: "row",
        margin: 15,
        justifyContent: "center",
    },
});
