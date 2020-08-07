import * as React from 'react';
import { StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'About'
    };

    openLinkedin() {
        Linking.openURL('https://www.linkedin.com/in/james-linskell-187382188');
    }

    openGithub() {
        Linking.openURL('https://github.com/James-Linskell');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.mainText}>
                    This site was created to give musicians and music lovers a greater insight into how Spotify processes
                    and analyses music. Spotify uses machine learning algorithms to process every song on its platform,
                    which allows them to make predictions about how "danceable", "energetic", "instrumental" or "positive" a
                    song sounds.
                    Although the details of these algorithms are kept secret, Spotify
                    makes the results of the analysis available for anyone to access from their web interface. This
                    website uses Spotify's web interface to interpret and visualise data for songs and playlists. The
                    Song Analyser lets you see detailed data for a single song, and the Playlist Analyser lets you compare
                    a song's features to all the other songs in a chosen playlist, calculating how well your song fits in
                    the playlist.
                </Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <Text style={styles.title}>Contact</Text>
                <Text style={styles.contact}>Please use the links below to get in touch with any queries or feedback</Text>
                <View style={styles.socials}>
                    <TouchableOpacity onPress={this.openGithub} style={{backgroundColor: "white", marginRight: 10}}>
                        <AntDesign name="github" size={45} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openLinkedin} style={{backgroundColor: "white", marginLeft: 10}}>
                        <AntDesign name="linkedin-square" size={45} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '80%',
    },
    mainText: {
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 10
    },
    socials: {
        flex: 0,
        flexDirection: "row",
        margin: 20
    },
    contact: {
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    }
});
