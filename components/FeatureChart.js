import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native";

export default class FeatureChart extends React.Component {
    constructor() {
        super();
        this.state = {
            chart: null
        }
    }

    componentDidMount() {
        this.generateChart(this.props.data);
    }

    generateChart(data) {
        let sortedData = [Number((data.danceability * 10).toFixed(2)), Number((data.energy * 10).toFixed(2)),
            Number((data.valence * 10).toFixed(2))]
        let translatedData = [];
        let n = 1;
        sortedData.forEach(item => {
            translatedData.push({ feature: n, number: item });
            n++;
        })

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
                            labels={({ datum }) => // This labels the bars in the correct order.
                                datum._x === 1 ? "Danceability" :
                                    datum._x === 2 ? "Energy" : "Positivity"
                            }
                            labelComponent={<VictoryLabel
                                textAnchor={({ datum }) => datum._y >= 4 ? "end" : "start"} // This makes the label inside the bar if it is too long, or outside if the bar is short.
                                dx={({ datum }) => datum._y >= 4 ? -4 : 4}/>} // This gives the labels a bit of padding according to the same rules as above.
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

        this.setState({chart: chart});
    }

    render() {
        return (
            this.state.chart
        );
    }
}