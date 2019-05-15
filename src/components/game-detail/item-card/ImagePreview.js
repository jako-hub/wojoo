import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * This component renders the image preview.
 * @param {*} param0 
 */
const ImagePreview = ({imageUrl}) => {
    return (
        <View style={styles.root}>
            {!imageUrl && (
                <Icon style={styles.icon} name="image" size={80}/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        backgroundColor : '#e0e0e0',
        padding : 5,
        borderRadius : 10,
    },
    icon : {
        color : '#bdbdbd',
    },
});

ImagePreview.propTypes = {
    imageUrl    : PropTypes.string,
    onPress     : PropTypes.func,
};

export default ImagePreview;