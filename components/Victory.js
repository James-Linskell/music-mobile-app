import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

export default class Victory extends React.Component {
    constructor() {
        super();
        this.state = {
            chart: null
        }
    }

    componentDidMount() {
        this.generateChart(this.props.data, this.props.index);
    }

    generateChart(data, index) {
        let translatedData = [];
        let n = 0;
        console.log(index);
        data.forEach(item => {
            translatedData.push({ feature: n, number: item });
            n++;
        })

        let chart =
            <VictoryChart width={350}>
                <VictoryBar
                    data={translatedData}
                    x="feature"
                    y="number"
                    alignment="start"
                    style={{
                        data: {
                            fill: ({datum}) => datum._x === index ? "blue" : "#c43a31"
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});