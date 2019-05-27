import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { SimpleTouch } from '../../commons/touchables';
import defaultImage from '../../assets/images/default-clan-image.png';
import RatingStarDisplay from '../../commons/rating-start-display';
import {IMAGES_SERVER} from 'react-native-dotenv';
const MAX_CHARS = 12;

/**
 * This component renders te presentation for a single clan card.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} props 
 */
const ClansList =   (props) => {
    const {
        onPress,
        code,
        name,
        photo,
        rating,
    } = props;
    const clanName = name.length > MAX_CHARS? name.substring(0, MAX_CHARS) + '...' : name;
    return (
        <SimpleTouch onPress = { onPress }>
             <View style = {styles.root}>
                <View style = { styles.photoWrapper } >
                    {!photo
                        ? ( <Image style = { [styles.photoDefault, styles.photoOpacity] } source = { defaultImage } /> ) 
                        : ( <Image style = { styles.photoDefault } source = { {uri : `${IMAGES_SERVER}${photo}`} } /> )
                    }
                </View>
                <View style = { styles.bodyWrapper }>
                    <Text style = { styles.name }>
                        {clanName}
                    </Text>
                </View>
                <View style = { styles.actionsWrapper }>
                    <RatingStarDisplay 
                        id      = {`${name}-${code}`} 
                        value   = {rating} />
                </View>
            </View>
        </SimpleTouch>
    );
};

const styles = StyleSheet.create({

    root : {
        padding : 10,
        alignItems : "center",
    },
    photo : {
        width   : 50,
        height  : 50,
    },
    name : {
        fontSize : 12,
    },
    photoDefault : {        
        width   : 50,
        height  : 50,
    },
    photoOpacity : {
        opacity : 0.5,
    },
    photoWrapper : {
        width           : 70,
        height          : 70,
        justifyContent  : "center",
        alignItems      : "center",
        padding         : 5,
        backgroundColor : "#e0e0e0",
        borderRadius    : 5,
    },
    bodyWrapper : {
        marginTop : 5,
        paddingHorizontal : 10,
    },
    actionsWrapper : {
    },
});

ClansList.propTypes = {
    photo           : PropTypes.string,
    clans           : PropTypes.array,
    name            : PropTypes.string,
    playerName      : PropTypes.string,
    playerAlias     : PropTypes.string,
    playerPhoto     : PropTypes.string,
    clanDAte        : PropTypes.string,
    onSelectClan    : PropTypes.func,
    members         : PropTypes.number,
    rating          : PropTypes.number,
};

export default ClansList;