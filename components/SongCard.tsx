import * as React from "react";
import {Text, View} from "../components/Themed";
import {StyleSheet, TouchableOpacity, Image} from "react-native";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
    }

    componentDidMount() {
        this.setState({
            image: this.props.art
        })
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View>
                    <Image
                        source={{uri: this.props.art}}
                        style={styles.img}/>
                </View>
                <View style={styles.info}>
                    <Text style={styles.text}>{this.props.name}</Text>
                    <Text style={styles.text}>{this.props.album}</Text>
                    <Text style={styles.text}>{this.props.artist}</Text>
                </View>
            </TouchableOpacity>

        )
    }
}

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
    }
})