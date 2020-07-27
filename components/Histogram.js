import * as React from 'react';
import {BarChart} from "react-native-charts";
import {View} from "./Themed";

export default class Histogram extends React.Component {
    constructor() {
        super();
        this.state = {
            dataset: {},
        }
    }

    componentDidMount() {
        this.generateChart();
    }

    /**
     * Generates a histogram for mood features, using pre-processed data provided through props which has been separated
     * into bins of 0.5.
     */
    generateChart() {
        let data = this.props.data;

        let dataset = [
            {
                fillColor: '#46b3f7',
                data: [
                    { value: 15 },
                    { value: 10 },
                    { value: 12 },
                    { value: 11 },
                    { value: 25 },
                    { value: 20 },
                    { value: 22 },
                    { value: 21 },
                ]
            },
            {
                fillColor: '#ff0000',
                data: [
                    { value: 14 },
                    { value: 11 },
                    { value: 14 },
                    { value: 13 },
                    { value: 24 },
                    { value: 21 },
                    { value: 24 },
                    { value: 23 },
                ]
            },
        ]
        this.setState({
            dataset: dataset
        })
    }

    render() {
        return (
            <BarChart
                dataSets={this.state.dataset}
                graduation={1}
                horizontal={false}
                showGrid={true}
                barSpacing={0}
                style={{
                    height: 300,
                    margin: 15,
                }}/>
        )
    }
}