import * as React from 'react';
import {BarChart} from "react-native-charts";
import {View} from "./Themed";

export default class Histogram extends React.Component {
    constructor() {
        super();
    }

    /**
     * Generates a histogram for mood features, using pre-processed data provided through props which has been separated
     * into bins of 0.5.
     */
    static generateChart(data, index) {
        let translatedData = [];
        let n = 0;
        data.forEach(item => {
            translatedData.push({ value: item });
        })
        console.log(translatedData);
        console.log("Index: " + index);

        let chosenSong = [
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
            { value: 0 },
        ]
        chosenSong[index] = translatedData[index];
        console.log(translatedData, translatedData[index])

        let dataset = [
            {
                fillColor: '#46b3f7',
                data: translatedData
            },
            {
                fillColor: '#ff0000',
                data: chosenSong
            },
        ]
        return dataset;
    }
}