import * as React from "react";
import {Text, TextInput, View} from "../components/Themed";
import FetchData from "../helpers/FetchData"
import GenerateInfo from "../helpers/GenerateInfo"
import {Button, ScrollView, StyleSheet} from "react-native";
import SongCard from "../components/SongCard";
import EditScreenInfo from "../components/EditScreenInfo";
import {StackActions} from "@react-navigation/native";

export default class PlaylistSearch2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            chosenCard: null,
            search: ""
        }
    }

    static navigationOptions = {
        title: 'PlaylistSearch2'
    };

    onButtonPress = () => {
        this.props.navigation.navigate('PlaylistSearch3', {
            textInput: this.state.search,
            songId: this.props.route.params.songInfo.songId
        });
    }

    onSearchChange = (search: any) => {
        this.setState({ search });
    };

    componentDidMount() {
        console.log(this.props);

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
                    <View style={styles.searchContainer}>
                        <Text>
                            Search for a playlist to compare your chosen song:
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Search for a playlist..."
                            onChangeText={this.onSearchChange}
                            value={this.state.search}
                        />
                        <Button title="Search" onPress={this.onButtonPress}/>
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
        padding: 15,
        fontSize: 20,
        marginRight: 10,
        backgroundColor: "white",
    },
    searchContainer: {
        flex: 1
    }
});