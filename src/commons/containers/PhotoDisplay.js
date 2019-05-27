import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'native-base';
import {
    StyleSheet,
    Image,
} from 'react-native';
import defaultImage from '../../assets/images/empty-image.png';

const PhotoDisplay = (props) => {
    const {
        imageSource=defaultImage,        
        avatar,
        opacity,
    } = props;
    let {
        width=100,
        height=100,
    } = props;    
    const imageStyles = [
        styles.image,
        { width, height },
        (avatar? styles.avatar : null),
        (opacity? styles.opacity : null),
    ];
    const rootStyles = [
        styles.root,
        (avatar? styles.avatarRoot : null),
    ];
    return (
        <View style = { rootStyles }>
            <Image style = { imageStyles } source = { imageSource } />
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        justifyContent  : "center",
        alignItems      : "center",
        padding         : 10,
        backgroundColor : "#e0e0e0",
        borderRadius    : 10,
    },
    avatarRoot : {
        width : 40,
        height : 40,
        borderRadius : 150,
    },
    image : {
        
    },
    opacity : {
        opacity : 0.6,
    },
    avatar : {
        width : 30,
        height : 30,
    },
});

PhotoDisplay.propTypes = {
    imageSource : PropTypes.any,
    avatar      : PropTypes.bool,
    opacity     : PropTypes.bool,
};

export default PhotoDisplay;