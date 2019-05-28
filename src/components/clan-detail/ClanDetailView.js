import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import {PhotoDisplay} from '../../commons/containers';
import {IMAGES_SERVER} from 'react-native-dotenv';
import RatingStarDisplay from '../../commons/rating-start-display';
import defaultImage from '../../assets/images/default-clan-image.png';

const Row = ({title, text}) => (
    <View style = { styles.row }>
        <Text style = { styles.textBold }>{title}</Text>
        <Text style = { styles.text }>{text}</Text>
    </View>
);

const CenteredRow = ({children}) => (
    <View style = { styles.centeredRow }>
        {children}
    </View>
);

/**
 * This Component displays a game base information
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} props 
 */
const ClanDetailView = (props) => {
    const {
        name, 
        typeName, 
        photo, 
        victories=0,
        defeats=0,
        rating,
    } = props;
    return (
        <View style = { styles.root }>
            <View style = { styles.photoWrapper }>
                <PhotoDisplay opacity = { !photo } imageSource = { photo? {uri : `${IMAGES_SERVER}${photo}` } : defaultImage } />
            </View>
            <View style = { styles.infoWrapper }>
                <Row title = "Nombre" text = { name } />
                <Row title = "Tipo" text = { typeName } />
                <Row title = "Victorias" text = { victories } />
                <Row title = "Derrotas" text = { defeats } />
                <CenteredRow>
                    <RatingStarDisplay id = {"game-detail"} value = { rating } />
                </CenteredRow>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        flexDirection : "row",
        paddingHorizontal : 10,

    },
    photoWrapper : {
        justifyContent : "center",
        alignItems : "center",
        flex : 4,
    },
    infoWrapper : {
        flex : 8,
        paddingHorizontal : 10,
        paddingVertical : 10,
    },
    row : {
        flexDirection : "row",
        justifyContent : "space-between",
    },
    centeredRow : {
        alignSelf : "center",
    }
});

ClanDetailView.propTypes = {
    typeName    : PropTypes.string,
    name        : PropTypes.string,
    rating      : PropTypes.number,    
    navigation  : PropTypes.any,
    victories   : PropTypes.number,
    defeats     : PropTypes.number,
};

export default ClanDetailView;