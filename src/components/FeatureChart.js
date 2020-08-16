import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native";

/**
 * Generates a chart using Chart.js library. Creates chart for the mood features of a song (danceability, energy and valence).
 * Takes raw data returned from the Spotify API as input and returns a React component.
 */
class FeatureChart extends React.Component {
    /**
     * Sets default state values.
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        }
    }

    /**
     * Calls function to generate a chart once component has mounted. Necessary to receive props.
     */
    componentDidMount() {
        this.generateChart(this.props.data);
    }


    /**
     * Preprocesses data and generates the chart.
     * @param data raw spotify track data
     * @return mood feature chart component
     */
    generateChart(data) {
        // Rounds the feature values to 2 decimal places:
        let sortedData = [Number((data.danceability * 10).toFixed(2)), Number((data.energy * 10).toFixed(2)),
            Number((data.valence * 10).toFixed(2))]
        let translatedData = [];
        // Initialises chart.js data index:
        let n = 1;
        // Sorts the data into an array of json objects as input for Chart.js:
        sortedData.forEach(item => {
            translatedData.push({ feature: n, number: item });
            n++;
        })

        // Creates chart:
        let chart =
            <VictoryChart width={350} domainPadding={{ x: 25 }} height={200}>
                <VictoryAxis
                    label="Mood Features"
                    style={{tickLabels: {fontSize: 0}}}
                />
                <VictoryAxis dependentAxis
                             label="Score"
                             tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                />
                <VictoryBar horizontal
                            barWidth={20}
                    // This labels the bars in the correct order:
                            labels={({ datum }) =>
                                datum._x === 1 ? "Danceability" :
                                    datum._x === 2 ? "Energy" : "Positivity"
                            }
                            labelComponent={<VictoryLabel
                                // This makes the label inside the bar if it is too long, or outside if the bar is short:
                                textAnchor={({ datum }) => datum._y >= 4 ? "end" : "start"}
                                // This gives the labels a bit of padding according to the same rules as above:
                                dx={({ datum }) => datum._y >= 4 ? -4 : 4}/>}
                            data={translatedData}
                            x="feature"
                            y="number"
                            style={{
                                data: {
                                    fill: "#d6645c"
                                },
                                labels: {
                                    fill: "white"
                                }
                            }}
                />
            </VictoryChart>
        // Sets chart to state for rendering:
        this.setState({chart: chart});
    }

    /**
     * Renders the chart component
     * @return <FeatureChart/>
     */
    render() {
        return (
            this.state.chart
        );
    }
}

export default FeatureChart;