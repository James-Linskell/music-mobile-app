import React from 'react';
import renderer from 'react-test-renderer';
import SearchPlaylistResults from '../../screens/SearchPlaylistResults';

/**
 * Jest + react-test-renderer test for rendering SearchPlaylistResults.
 */
describe('SearchSong', () => {
    it('renders playlist search results screen successfully, with correct number of children', () => {
        const tree = renderer.create(<SearchPlaylistResults />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});
