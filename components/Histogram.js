import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";

/**
 * Generates a chart using Chart.js library. Creates histogram for a single mood feature of a song
 * (danceability, energy or valence). Takes an array of integers of data which has been pre-processed into bins.
 */
export default class Histogram extends React.Component {
    /**
     * Sets default state values.
     * @constructor
     */
    constructor() {
        super();
        this.state = {
            chart: null
        }
    }

    /**
     * Calls function to generate a chart once component has mounted. Necessary to receive props.
     */
    componentDidMount() {
        this.generateChart(this.props.data, this.props.index, this.props.type);
    }

    /**
     * Generates the chart.
     * @param data binned spotify feature data
     * @param index index in 'data' of comparison song
     * @param type mood feature name (provides label for the chart)
     * @return mood feature chart component
     */
    generateChart(data, index, type) {
        let translatedData = [];
        // Initialises chart.js data index:
        let n = 0;
        // Sorts the data into an array of json objects as input for Chart.js:
        data.forEach(item => {
            translatedData.push({ feature: n, number: item });
            n++;
        })

        // Creates chart:
        let chart =
            <VictoryChart width={350}>
                <VictoryAxis
                    label={`${type}`}
                />
                <VictoryAxis dependentAxis
                             label="Number of Songs"
                />
                <VictoryBar
                    data={translatedData}
                    x="feature"
                    y="number"
                    alignment="start"
                    style={{
                        data: {
                            // This sets the colour of the bin of the comparison song to green, and the rest red:
                            fill: ({datum}) => datum._x === index ? "#4ce600" : "#d6645c"
                        }
                    }}
                />
            </VictoryChart>
        // Sets state to chart for rendering:
        this.setState({chart: chart});
    }

    /**
     * Renders the chart component
     * @return <Histogram/>
     */
    render() {
        return (
            this.state.chart
        );
    }
}