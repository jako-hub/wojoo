import React from 'react';
import PropTypes from 'prop-types';
import {IMAGES_SERVER, DEFAULT_USER_IMG} from 'react-native-dotenv';
import {
    StyleSheet,    
} from 'react-native';
import {
    Thumbnail,
    ListItem,
    View,
    Text,
    Body,
} from 'native-base';


/**
 * This component renders the others count presentation
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com> 
 * @param {*} param0 
 */
const OthersElement = ({others=[], toggleOthers}) => {
    const maxPrevs = 3;
    const total = others.length;
    const itemsList = others.slice(0,maxPrevs);
    const thumbs = itemsList.map((item, key) => (
        <Thumbnail 
            source = { {uri : item.foto? `${IMAGES_SERVER}${item.foto}` : DEFAULT_USER_IMG} }
            key = { `thumb-item-diplay-request-sended-${key}` }
            style = {[styles.thumb, styles[`thumb_${key}`]] } 
        />
    ));
    return (
        <ListItem noBorder button noIndent onPress = { toggleOthers }>
            <Body style = { styles.othersWrapper } >
                <View style = { styles.thumbOthersContainer }>
                    {thumbs}
                    {total > maxPrevs && (<View style = { styles.tipMoreOhers }><Text note>+</Text></View>)}
                </View>
                <Text note style = { {textAlign : "center"} }>
                    Y {total > 1? `${total} Jugadores más` : `1 Jugador más`}
                </Text>
            </Body>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    thumbOthersContainer : {
        width           : 60,
        height          : 60,
        justifyContent  : "center",
        alignItems      : "flex-start",
    },
    thumb : {
        backgroundColor : "#e0e0e0",
        position        : "absolute",
        width           : 30,
        height          : 30,
    },
    thumb_0 : { transform : [ {translateX : 0},] },
    thumb_1 : { transform : [ {translateX : 10}, ] },
    thumb_2 : { transform : [{translateX : 20}] },
    othersWrapper : {
        flexDirection       : "row",
        justifyContent      : "center",
        alignItems          : "center",       
        padding             : 0,
        paddingTop          : 0,
        paddingBottom       : 0, 
    },
});

OthersElement.propTypes = {
    others          : PropTypes.array,
    toggleOthers    : PropTypes.func,
};

export default OthersElement;