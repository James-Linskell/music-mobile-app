import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../../NotFound';

/**
 * Jest + react-test-renderer test for rendering NotFound screen.
 */
describe('NotFound', () => {
    it('renders 404 Not Found screen successfully, with correct number of children', () => {
        const tree = renderer.create(<NotFound />).toJSON();
        expect(tree.children.length).toBe(2);
    });
});
