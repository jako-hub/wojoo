import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import Star from './Star';

/**
 * This component allows to render a rating stars.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const RatingStarDisplay = ({id = "", value=0, stars=5}) => {
    const startsToDraw = [];
    for(let i = 1; i <= stars; i ++) {
        startsToDraw.push(value >= i? 1 : 0);
    }    
    return (
        <View style = {styles.root}>
            {startsToDraw.map((item, key) => (
                <Star 
                    key = { `rating-start-key-${key}-${id}` }
                    value={item}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        alignSelf       : "flex-start",
        flexWrap        : "wrap",
        flexDirection   : "row",
        paddingVertical : 2,
    }
});

RatingStarDisplay.propTypes = {
    id      : PropTypes.any.isRequired,
    value   : PropTypes.number,
    stars   : PropTypes.number,
};

export default RatingStarDisplay;