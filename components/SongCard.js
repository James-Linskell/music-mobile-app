import * as React from "react";
import {Text, View} from "./Themed";
import {StyleSheet, TouchableOpacity, Image} from "react-native";

/**
 * Creates a custom SongCard component which displays the data for a song and the album artwork in a small container.
 */
export default class SongCard extends React.Component {
    /**
     * Renders the SongCard component.
     * @return <SongCard/>
     */
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View>
                    <Image
                        source={{uri: this.props.art}}
                        style={styles.img}/>
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>{this.props.name}</Text>
                    <Text style={styles.text}>{this.props.album}</Text>
                    <Text style={styles.text}>{this.props.artist}</Text>
                </View>
            </TouchableOpacity>

        )
    }
}

// Defines styles for SongCard:
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    img: {
        width: 110,
        height: 110,
    },
    info: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        margin: 3,
        textAlign: "center",
    },
    title: {
        margin: 3,
        textAlign: "center",
        fontSize: 19
    }
})