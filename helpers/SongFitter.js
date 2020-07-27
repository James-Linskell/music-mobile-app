import * as React from 'react';
import Histogram from "../components/Histogram";
import {BarChart} from "react-native-charts";

export default class SongFitter extends React.Component {

    static fitData = async (featureData) => {
        let fit = await this.simplifyData(featureData);
        let scores = [];
        let featureInfo1 = [];
        let featureInfo2 = [];
        let featureInfoColour = [];

        for (let i = 0; i < 3; i++) {
            let feat = "";
            if (i === 0) {
                feat = "Danceability";
            } else if (i === 1) {
                feat = "Energy";
            } else {
                feat = "Positivity";
            }

            if (fit.sigmas[i] === 1 && fit.stDevs[i] <= 0.15) {
                scores[i] = 4;
                featureInfo1[i] = "Perfect fit!"
                featureInfo2[i] = `The ${feat} of your chosen song fits the chosen playlist perfectly! The playlist songs
                all have very a similiar ${feat}, and your chosen song sits right in the middle of the distribution.`;
                featureInfoColour[i] = "#1E9600";
            } else if (fit.sigmas[i] === 1 && fit.stDevs[i] > 0.15) {
                scores[i] = 3;
                featureInfo1[i] = "Great fit!"
                featureInfo2[i] = `The ${feat} of your chosen song fits the chosen playlist very well. The playlist songs
                don't follow a close pattern for ${feat}, and the values vary a lot. This means ${feat} isn't so important
                for this playlist, but your song still fits well!`;
                featureInfoColour[i] = "#77b300";
            } else if ((fit.sigmas[i] === 2 || fit.sigmas[i] === 3) && fit.stDevs[i] > 0.15) {
                scores[i] = 2;
                featureInfo1[i] = "Average fit"
                featureInfo2[i] = `The ${feat} of your chosen song isn't a great fit. The playlist songs don't
                follow a close pattern for ${feat} however, so ${feat} isn't that important for this playlist. There is a lot of
                variation, so your song could potentially still fit here!`;
                featureInfoColour[i] = "#ffcc00";
            } else if (fit.sigmas[i] === 2 && fit.stDevs[i] <= 0.15) {
                scores[i] = 1;
                featureInfo1[i] = "Poor fit";
                featureInfo2[i] = `The ${feat} of your chosen song doesn't fit the chosen playlist well. The ${feat} of the songs on this
                playlist follow a very tight pattern, and your song's ${feat} doesn't follow this pattern. This is a sign
                that your song may not be right for this playlist.`;
                featureInfoColour[i] = "#cc2900";
            } else {
                scores[i] = 0;
                featureInfo1[i] = "Terrible fit";
                featureInfo2[i] = `The ${feat} of your chosen song does not fit the playlist well. It falls very far outside
                the distribution. This is a sign that your song probably isn't right for this playlist.`;
                featureInfoColour[i] = "#e60000";
            }
        }

        let totalScore = [scores.reduce((a, b) => a + b, 0)];
        let featureInfo = {
            score: totalScore,
            featureInfo1: featureInfo1,
            featureInfo2: featureInfo2,
            featureInfoColour: featureInfoColour,
            fit: fit
        }

        let scoreDataset = [
            {
                fillColor: '#46b3f7',
                data: [
                    { value: totalScore },
                ]
            },
        ]

        let scoreChart = <BarChart
            dataSets={scoreDataset}
            graduation={1}
            horizontal={false}
            showGrid={true}
            barSpacing={0}
            style={{
                height: 300,
                margin: 15,
            }}/>
    }

    static simplifyData = async (data) => {
        let dance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let energy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let valence = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let danceArray = [];
        let energyArray = [];
        let valenceArray = [];
        let danceIndex = 0;
        let energyIndex = 0;
        let valenceIndex = 0;
        let n = 0;
        data.audio_features.forEach(track => {
            if (track.danceability < 0.05) {
                dance[0]++;
            } else if (0.05 < track.danceability < 0.1) {
                dance[1]++;
            } else if (0.1 < track.danceability < 0.15) {
                dance[2]++;
            } else if (0.15 < track.danceability < 0.2) {
                dance[3]++;
            } else if (0.2 < track.danceability < 0.25) {
                dance[4]++;
            } else if (0.25 < track.danceability < 0.3) {
                dance[5]++;
            } else if (0.3 < track.danceability < 0.35) {
                dance[6]++;
            } else if (0.35 < track.danceability < 0.4) {
                dance[7]++;
            } else if (0.4 < track.danceability < 0.45) {
                dance[8]++;
            } else if (0.45 < track.danceability < 0.55) {
                dance[9]++;
            } else if (0.5 < track.danceability < 0.55) {
                dance[10]++;
            } else if (0.55 < track.danceability < 0.6) {
                dance[11]++;
            } else if (0.6 < track.danceability < 0.65) {
                dance[12]++;
            } else if (0.65 < track.danceability < 0.7) {
                dance[13]++;
            } else if (0.7 < track.danceability < 0.75) {
                dance[14]++;
            } else if (0.75 < track.danceability < 0.8) {
                dance[15]++;
            } else if (0.8 < track.danceability < 0.85) {
                dance[16]++;
            } else if (0.85 < track.danceability < 0.9) {
                dance[17]++;
            } else if (0.9 < track.danceability < 0.95) {
                dance[18]++;
            } else if (0.95 < track.danceability < 1.0) {
                dance[19]++;
            }

            if (track.energy < 0.05) {
                energy[0]++;
            } else if (0.05 < track.energy < 0.1) {
                energy[1]++;
            } else if (0.1 < track.energy < 0.15) {
                energy[2]++;
            } else if (0.15 < track.energy < 0.2) {
                energy[3]++;
            } else if (0.2 < track.energy < 0.25) {
                energy[4]++;
            } else if (0.25 < track.energy < 0.3) {
                energy[5]++;
            } else if (0.3 < track.energy < 0.35) {
                energy[6]++;
            } else if (0.35 < track.energy < 0.4) {
                energy[7]++;
            } else if (0.4 < track.energy < 0.45) {
                energy[8]++;
            } else if (0.45 < track.energy < 0.55) {
                energy[9]++;
            } else if (0.5 < track.energy < 0.55) {
                energy[10]++;
            } else if (0.55 < track.energy < 0.6) {
                energy[11]++;
            } else if (0.6 < track.energy < 0.65) {
                energy[12]++;
            } else if (0.65 < track.energy < 0.7) {
                energy[13]++;
            } else if (0.7 < track.energy < 0.75) {
                energy[14]++;
            } else if (0.75 < track.energy < 0.8) {
                energy[15]++;
            } else if (0.8 < track.energy < 0.85) {
                energy[16]++;
            } else if (0.85 < track.energy < 0.9) {
                energy[17]++;
            } else if (0.9 < track.energy < 0.95) {
                energy[18]++;
            } else if (0.95 < track.energy < 1.0) {
                energy[19]++;
            }

            if (track.valence < 0.05) {
                valence[0]++;
            } else if (0.05 < track.valence < 0.1) {
                valence[1]++;
            } else if (0.1 < track.valence < 0.15) {
                valence[2]++;
            } else if (0.15 < track.valence < 0.2) {
                valence[3]++;
            } else if (0.2 < track.valence < 0.25) {
                valence[4]++;
            } else if (0.25 < track.valence < 0.3) {
                valence[5]++;
            } else if (0.3 < track.valence < 0.35) {
                valence[6]++;
            } else if (0.35 < track.valence < 0.4) {
                valence[7]++;
            } else if (0.4 < track.valence < 0.45) {
                valence[8]++;
            } else if (0.45 < track.valence < 0.55) {
                valence[9]++;
            } else if (0.5 < track.valence < 0.55) {
                valence[10]++;
            } else if (0.55 < track.valence < 0.6) {
                valence[11]++;
            } else if (0.6 < track.valence < 0.65) {
                valence[12]++;
            } else if (0.65 < track.valence < 0.7) {
                valence[13]++;
            } else if (0.7 < track.valence < 0.75) {
                valence[14]++;
            } else if (0.75 < track.valence < 0.8) {
                valence[15]++;
            } else if (0.8 < track.valence < 0.85) {
                valence[16]++;
            } else if (0.85 < track.valence < 0.9) {
                valence[17]++;
            } else if (0.9 < track.valence < 0.95) {
                valence[18]++;
            } else if (0.95 < track.valence < 1.0) {
                valence[19]++;
            }

            // Find index of comparison song:
            if (n === 0) {
                danceIndex = dance.findIndex((val) => {
                    return val >= 0.01;
                });
                energyIndex = energy.findIndex((val) => {
                    return val >= 0.01;
                });valenceIndex = valence.findIndex((val) => {
                    return val >= 0.01;
                });
            }

            danceArray.push(track.danceability);
            energyArray.push(track.energy);
            valenceArray.push(track.valence);
            n++;
        });

        if (n < 20) {
            this.setState({
                errorVis: "visible"
            })
        }

        let values = [data.audio_features[0].danceability, data.audio_features[0].energy, data.audio_features[0].valence];
        let means = [danceArray.reduce((a,b) => a+b)/n, energyArray.reduce((a,b) => a+b)/n, valenceArray.reduce((a,b) => a+b)/n];
        let stDevs = [Math.sqrt(danceArray.map(x => Math.pow(x-means[0],2)).reduce((a,b) => a+b)/n),
            Math.sqrt(energyArray.map(x => Math.pow(x-means[1],2)).reduce((a,b) => a+b)/n),
            Math.sqrt(valenceArray.map(x => Math.pow(x-means[2],2)).reduce((a,b) => a+b)/n)]
        let sigmas = [];

        for (let i = 0; i < 3; i++) {
            if (stDevs[i] > 0.15) {
                console.log("There is a high variance in the data.")
            }

            console.log("Standard deviation: " + stDevs[i]);
            if ((means[i] - stDevs[i]) <= values[i] && values[i] <= (means[i] + stDevs[i])) {
                sigmas[i] = 1;
            } else if ((means[i] - (2 * stDevs[i])) <= values[i] && values[i] <= (means[i] + (2 * stDevs[i]))) {
                sigmas[i] = 2;
            } else {
                sigmas[i] = 3;
            }
        }
        let fit = {
            stDevs,
            sigmas
        };

        let charts = {
            danceHist: <Histogram data={dance} songIndex={danceIndex}/>,
            energyHist: <Histogram data={energy} songIndex={energyIndex}/>,
            valenceHist: <Histogram data={valence} songIndex={valenceIndex}/>
        }

        console.log(fit);
        return fit;
    }
}