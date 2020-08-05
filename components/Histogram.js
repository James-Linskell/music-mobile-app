import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";

export default class Histogram extends React.Component {
    constructor() {
        super();
        this.state = {
            chart: null
        }
    }

    componentDidMount() {
        this.generateChart(this.props.data, this.props.index, this.props.type);
    }

    generateChart(data, index, type) {
        let translatedData = [];
        let n = 0;
        data.forEach(item => {
            translatedData.push({ feature: n, number: item });
            n++;
        })

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
                            fill: ({datum}) => datum._x === index ? "#4ce600" : "#d6645c"
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