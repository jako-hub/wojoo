import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import defaultImage from '../../../assets/images/game-default-image.png';

/**
 * This component renders the image preview.
 * @param {*} param0 
 */
const ImagePreview = ({imageUrl}) => {
    return (
        <View style={styles.root}>
            {!imageUrl && (
                <Image style = { styles.image } source = { defaultImage } />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        padding : 5,
        borderRadius : 10,
    },
    icon : {
        color : '#bdbdbd',
    },
    image : {
        width : 80,
        height : 80,
    },
});

ImagePreview.propTypes = {
    imageUrl    : PropTypes.string,
    onPress     : PropTypes.func,
};

export default ImagePreview;