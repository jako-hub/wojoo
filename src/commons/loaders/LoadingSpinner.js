import React from 'react';
import {
    Spinner,
} from 'native-base';
import stylesPalette from '../../utils/stylesPalette';

const palette = stylesPalette();

const LoadingSpinner = () => (
    <Spinner color={palette.primary.color}/>
);

export default LoadingSpinner;