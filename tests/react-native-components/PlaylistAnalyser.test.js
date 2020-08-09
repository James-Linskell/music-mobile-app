import React from 'react';
import renderer from 'react-test-renderer';
import PlaylistAnalyser from '../../screens/PlaylistAnalyser';

/**
 * Jest + react-test-renderer test for rendering PlaylistAnalyser.
 */
describe('PlaylistAnalyser', () => {
    it('renders playlist analyser screen successfully, with correct number of children', () => {
        const tree = renderer.create(<PlaylistAnalyser />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});
