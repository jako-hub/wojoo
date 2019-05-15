import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    ListItem,
    Left,
    Body,
    Thumbnail,
    Right,
    Text,
} from 'native-base';
import {SimpleTouch} from '../../../commons/touchables';
import { IconButton } from '../../../commons/forms';
import {IMAGES_SERVER, DEFAULT_USER_IMG} from 'react-native-dotenv';

/**
 * This component renders only the items presentation.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const RequestItem = ({request, onAccept, onCancel, onViewProfile}) => {
    const {
        foto,
        jugador_nombre_corto:short_name,
        jugador_seudonimo:alias,
    } = request;
    return (
        <ListItem thumbnail style = { styles.listItem } noBorder>
            <Left style = { styles.listItemAvatar }>
                <SimpleTouch
                    wrapType = "stretch"
                    onPress = { onViewProfile }
                >
                    <Thumbnail 
                        source = { {uri : foto? `${IMAGES_SERVER}${foto}` : DEFAULT_USER_IMG} } 
                        style = { [styles.listPhoto, styles.thumbWrapper] }
                    />
                </SimpleTouch>
            </Left>
            <Body style = { styles.listItemBody }>
                <SimpleTouch wrapType = "stretch" onPress = { onViewProfile }>
                    <Text>{short_name}</Text>
                </SimpleTouch>
                <SimpleTouch wrapType = "stretch" onPress = { onViewProfile }>
                    <Text note>{alias}</Text>
                </SimpleTouch>
            </Body>
            <Right style = { styles.listItemActions }>
                <IconButton onPress = { onAccept } style = { styles.listItemActionIcon } icon = "check" small />
                <IconButton onPress = { onCancel } style = { styles.listItemActionIcon } icon = "times" small />
            </Right>
        </ListItem>
    )
};

RequestItem.propTypes = {
    request : PropTypes.shape({
        foto                    : PropTypes.string,
        jugador_nombre_corto    : PropTypes.string,
        jugador_seudonimo       : PropTypes.string,
    }),
};

const styles = StyleSheet.create({
    thumbWrapper : {
        backgroundColor : "#e0e0e0",
    },
    listItemActions : {
        flex            : 4,
        flexDirection   : "row",
        justifyContent  : "center",
        alignItems      : "center",
    },
    listItemBody : {
        flex : 7,
    },
    listItemAvatar : {
        flex : 2,
    },
    listItemActionIcon : {
        marginHorizontal : 5,
    },
});

export default RequestItem;