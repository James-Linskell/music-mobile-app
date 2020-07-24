import * as React from 'react';
import {Button, KeyboardAvoidingView, StyleSheet} from 'react-native';

import Colors from "../constants/Colors";
import { Text, View, TextInput } from '../components/Themed';
import {MaterialIcons} from "@expo/vector-icons";
import Navigation from "../navigation";

function SearchIcon(props: { name: string; color: string }) {
    return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default class PlaylistAnalyser extends React.Component {
    constructor(props: any) {
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
        this.props.navigation.navigate('PlaylistSearch1', {
            textInput: this.state.search
        });
    }

    // Sending data in navigation: https://reactnativecode.com/pass-textinput-entered-value-activity-screen/
    render() {
        return (
            <View style={styles.container}>
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
    },
    separator: {
        marginVertical: 5,
        height: 1,
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
        textAlign: "center",
        position: "absolute",
        bottom: 15
    },
    input: {
        padding: 15,
        fontSize: 20,
        marginRight: 10
    },
    searchBox: {
        display: "flex",
        flexDirection: "row",
    },
});
