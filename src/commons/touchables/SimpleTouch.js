import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const SimpleTouch = ({children, onPress, wrapType="center", style}) => (
    <TouchableOpacity onPress = { onPress } style = { [{alignSelf : wrapType}, style] }>
        {children}
    </TouchableOpacity>
);

SimpleTouch.propTypes = {
    onPress : PropTypes.func,
};

export default SimpleTouch;