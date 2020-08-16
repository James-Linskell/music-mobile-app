import React from 'react';
import renderer from 'react-test-renderer';
import SongAnalyser from '../../src/screens/SongAnalyser';

/**
 * Jest + react-test-renderer test for rendering SongAnalyser.
 */
describe('SongAnalyser', () => {
    it('renders song analyser screen successfully, with correct number of children', () => {
        const tree = renderer.create(<SongAnalyser />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});
