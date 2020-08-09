import GenerateInfo from "../../helpers/GenerateInfo";
// Run with 'npm test', not 'jest'.

/**
 * Jest test for GenerateInfo.generatePlaylistInfo().
 */
describe("generatePlaylistInfo()", () => {
    it("should simplify raw Spotify playlist json into simpler json of playlist ids", () => {
        // Input data:
        const inputData = [{
            name: "playlist1",
            description: "description",
            id: "id1",
            album: {
                artwork: "test"
            },
            owner: {
                display_name: "owner name"
            },
            images: [
                {
                    url: "test url"
                },
                {
                    url: "test url 2"
                }
            ]
        }, {
            name: "playlist2",
            description: "description",
            id: "id2",
            album: {
                artwork: "test"
            },
            owner: {
                display_name: "owner name"
            },
            images: [
                {
                    url: "test url"
                },
                {
                    url: "test url 2"
                }
            ]
        }]
        // Test:
        expect(GenerateInfo.generatePlaylistInfo(inputData)).toStrictEqual(
            [{
                playlistId: "id1",
                art: "test url",
                description: "description",
                name: "playlist1",
                owner: "owner name",
            }, {
                playlistId: "id2",
                art: "test url",
                description: "description",
                name: "playlist2",
                owner: "owner name",
            }]);
        expect(() => GenerateInfo.generatePlaylistInfo(null)).toThrow(TypeError);
    });
});

/**
 * Jest test for GenerateInfo.generateSongInfo().
 */
describe("generateSongInfo()", () => {
    it("should simplify raw Spotify song json into simpler json of song info", () => {
        // Input data:
        const inputData = [{
            name: "song name",
            artists: [
                {
                    name: "artist 1"
                },
                {
                    name: "artist 2",
                }
            ],
            album: {
                name: "album name",
                id: "album id",
                images: [
                    {
                        url: "image small url"
                    },
                    {
                        url: "image large url"
                    }
                ]
            },
            id: "song id",
        }]
        // Test:
        expect(GenerateInfo.generateSongInfo(inputData)).toStrictEqual(
            [{name: "song name", artist: "artist 1", album: "album name", art: "image large url", songId: "song id"}]);
        expect(() => GenerateInfo.generateSongInfo(null)).toThrow(TypeError);
    });
});