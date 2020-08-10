import {Alert} from "react-native";

/**
 * Helper module which has functions to fetch data from both the Node server and Spotify's API.
 */
export default class FetchData {
    /**
     * Calls Spotify API to retrieve track/playlist data.
     * @param input search string or song/playlist id
     * @param type string for search type (track/artist/playlist/ etc). Input as empty string if not applicable
     * @param searchType search/features/track/analysis
     * @returns Spotify json data
     */
    static fetchData = async (input, type, searchType) => {
        let data = '';
        /**
         * Calls my node server which requests a Spotify client access token.
         * @returns json body containing Spotify client token and test message
         */
        const getToken = async () => {
            const response = await fetch('https://songmapper.herokuapp.com/authenticate').then((response) => {
                if (!response.ok) {
                    // If HTTP response is bad, throw error:
                    throw new Error("There was a problem connecting to the Songmap service." + response.status);
                }
                return response;
            }).catch((error) => {
                // If any other error occurred (eg. url invalid), throw error:
                throw new Error(error);
            });
            const body = await response.json().catch((error) => {
                // If error in parsing json data, throw error:
                throw new Error(error);
            });
            return body;
        };
        const requestToken = await getToken();
        const token = requestToken.myToken;
        // Defines authorisation header for Spotify request:
        var myOptions = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        let url = "";
        if (type === "search") {
            // Replaces special characters in query:
            input = input.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, " ")
            const endpoint = 'https://api.spotify.com/v1/search?';
            const query = 'q=' + input;
            const type = '&type=' + searchType;
            url = endpoint + query + type;
        } else if (type === "analysis") {
            const endpoint = 'https://api.spotify.com/v1/';
            const ty = searchType;
            const id = input;
            url = endpoint + ty + id;
        }
        // Makes request to Spotify API:
        const response = await fetch(url, myOptions).then((response) => {
            // If HTTP response is bad, throw error:
            if (!response.ok) {
                throw new Error("There was a problem connecting to the Spotify service.\n" + response.status);
            }
            return response;
        }).catch((error) => {
            // If any other error occurred (eg. url invalid), throw error:
            throw new Error(error);
        });
        data = await response.json();
        return data;
    }
}