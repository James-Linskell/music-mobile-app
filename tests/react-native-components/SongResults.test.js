import React from 'react';
import renderer from 'react-test-renderer';
import SongResults from '../../src/screens/SongResults';

// I tried everything I could to get the config for victory-native to work, modifying my package.json with their own jest config
// as mentioned at their website (https://formidable.com/open-source/victory/docs/native/):
//
//     "jest": {
//     "preset": "react-native",
//         "transformIgnorePatterns": [
//         "node_modules/(?!victory|react-native-svg|react-native)"
//     ],
//         "transform": {
//         "^.+\\.jsx?$": "babel-jest"
//     }
// }
//
// This still did not work so I reset package.json. This is problem with victory-native.

/**
 * Jest + react-test-renderer test for rendering SongResults. This currently fails for all modules with graphs
 * due to jest not processing tsx properly, which the victory-native graph library uses. The graphs still work in practice.
 */
describe('SongResults', () => {
    // USES A GRAPH SO CURRENTLY FAILS:
    it('renders SongResults screen successfully, with correct number of children', () => {
        const tree = renderer.create(<SongResults />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});
