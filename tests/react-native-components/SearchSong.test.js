import React from 'react';
import renderer from 'react-test-renderer';
import SearchSong from '../../src/screens/SearchSong';

/**
 * Jest + react-test-renderer test for rendering SearchSong.
 */
describe('SearchSong', () => {
    it('renders song search screen successfully, with correct number of children', () => {
        const tree = renderer.create(<SearchSong />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});
