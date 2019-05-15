import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    Fab,    
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import stylesPalette from '../../utils/stylesPalette';

const FabButton = ({onPress, icon}) => (
    <Fab 
        active
        direction="down"
        onPress = {onPress}
        style = {styles.root}
    >                
        <Icon name={icon} />
    </Fab>  
);

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        backgroundColor : palette.accent.color,
    },
});

FabButton.propTypes = {
    onPress : PropTypes.func,
};

export default FabButton;