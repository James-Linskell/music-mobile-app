import React from 'react';
import renderer from 'react-test-renderer';
import SongCard from '../../src/components/SongCard';

/**
 * Jest + react-test-renderer test for rendering SongCard. This currently fails for all modules with graphs
 * due to jest not processing tsx properly, which the victory-native graph library uses. The graphs still work in practice.
 */
describe('SongCard', () => {
    // USES A GRAPH SO CURRENTLY FAILS:
    it('renders song card component successfully, with correct number of children', () => {
        const tree = renderer.create(<SongCard />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});
