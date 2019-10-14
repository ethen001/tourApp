//__tests__/DoublePicker-test.js
import 'react-native'
import React from 'react';
import {DoublePicker} from '../DoublePicker';
import {store} from '../../../reduxConfig'

import renderer from 'react-test-renderer';


jest.mock('Platform', () => {
    const platform = require.requireActual('Platform');
    platform.OS = 'android';
    return platform;
})

it('renders correctly', () => {
    const tree = renderer.create(
        <DoublePicker
            defaultOptions={["Select tour guide", "Select lead chaperone"]}
            group={store.getState().groupAuth.group}
            onGroupSelected={(selection) => console.log(selection)}
        /> 
    ).toJSON();
    jsxExpressionContainer(tree).toMatchSnapshot();
});