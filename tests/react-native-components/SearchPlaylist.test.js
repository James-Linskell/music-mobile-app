import React from 'react';
import renderer from 'react-test-renderer';
import SearchPlaylist from '../../src/screens/SearchPlaylist';

/**
 * Jest + react-test-renderer test for rendering SearchSong.
 */
describe('SearchPlaylist', () => {
    it('renders playlist search screen successfully, with correct' +
        'number of children', () => {
        const tree = renderer.create(<SearchPlaylist route={{
            params: {
                songInfo: {name: "test name", album: "test album",
                    artist: "test artist", art: "test url"}}
        }}/>).toJSON();
        expect(tree.children.length).toBe(1);
    });
});
