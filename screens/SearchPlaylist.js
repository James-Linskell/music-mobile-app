import * as React from "react";
import {Text, TextInput, View} from "../components/Themed";
import FetchData from "../helpers/FetchData"
import GenerateInfo from "../helpers/GenerateInfo"
import {Button, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import SongCard from "../components/SongCard";
import EditScreenInfo from "../components/EditScreenInfo";
import {StackActions} from "@react-navigation/native";

export default class SearchPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            chosenCard: null,
            search: ""
        }
    }

    static navigationOptions = {
        title: 'SearchPlaylist'
    };

    onButtonPress = () => {
        this.props.navigation.navigate('SearchPlaylistResults', {
            textInput: this.state.search,
            songId: this.props.route.params.songInfo.songId,
            songInfo: this.props.route.params.songInfo
        });
    }

    onSearchChange = (search: any) => {
        this.setState({ search });
    };

    componentDidMount() {
        let chosenCard = <SongCard
            name={this.props.route.params.songInfo.name}
            album={this.props.route.params.songInfo.album}
            artist={this.props.route.params.songInfo.artist}
            art={this.props.route.params.songInfo.art}/>

        this.setState({
            chosenCard: chosenCard,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.separator}/>
                    <View>
                        {this.state.chosenCard}
                    </View>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <Text style={{padding: 30, fontSize: 18}}>
                        Search for a playlist to compare your chosen song:
                    </Text>
                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search for a playlist..."
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
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
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
        marginTop: 20,
    },
    searchButton: {
        textAlign: "center",
        fontSize: 20
    },
});