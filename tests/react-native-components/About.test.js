import React from 'react';
import renderer from 'react-test-renderer';
import About from '../../screens/About';

/**
 * Jest + react-test-renderer test for rendering About screen.
 */
describe('About', () => {
    it('renders about screen successfully, with correct number of children', () => {
        const tree = renderer.create(<About />).toJSON();
        expect(tree.children.length).toBe(5);
    });
});
