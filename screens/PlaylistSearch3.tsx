import * as React from "react";
import {Text, View} from "../components/Themed";
import SongCard from "../components/SongCard";
import GenerateInfo from "../helpers/GenerateInfo";
import FetchData from "../helpers/FetchData";

export default class PlaylistSearch3 extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.route.params);
    }

    render() {
        return (
            <View>
                <Text>{this.props.route.params.textInput}</Text>
            </View>
        )
    }
    }