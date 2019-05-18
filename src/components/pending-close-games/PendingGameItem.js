import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'native-base';
import {
    Image,
    StyleSheet,
} from 'react-native';
import defaultIcon from '../../assets/images/game-default-image.png';
import moment from 'moment';
import { SimpleTouch } from '../../commons/touchables';

/**
 * This component renders the pending game item structure.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const PendingGameItem = ({name, dateTo, onPress}) => {
    const objDateTo = moment(dateTo);
    const currentDate = moment();
    const daysAgo = currentDate.diff(objDateTo, "days");
    const hoursAgo = currentDate.diff(objDateTo, "hours");
    const minutesAgo = currentDate.diff(objDateTo, "minutes");
    let timeDiffMessage = "";

    if(daysAgo === 0 && hoursAgo === 0 && minutesAgo > 0) {
        timeDiffMessage = `Hace ${minutesAgo} ${minutesAgo === 1? 'minuto' : 'minutos'}`;
    } else if(daysAgo === 0 && hoursAgo > 0) {
        timeDiffMessage = `Hace ${hoursAgo} ${hoursAgo === 1? 'hora' : 'horas'}`;
    } else {
        timeDiffMessage = `Hace ${daysAgo} ${daysAgo == 1? 'día' : 'días'}`;
    }

    return (
        <SimpleTouch wrapType="stretch" onPress = { onPress }>
            <View style = { styles.root }>
                <View style = { styles.imageWrapper }>
                    <Image source = { defaultIcon } style = { styles.icon } />
                </View>
                <View style = { styles.contentWrapper}>
                    <Text>{name}</Text>
                    <Text note>
                        {timeDiffMessage}
                    </Text>
                </View>
            </View>
        </SimpleTouch>
    )
};

const styles = StyleSheet.create({
    root : {
        flexDirection   : "row",
        marginBottom    : 10,
    },
    imageWrapper : {
        flex            : 2,
        justifyContent  : "center",
        alignItems      : "center",
    },
    icon : {
        width           : 30,
        height          : 30,
        borderRadius    : 150,
    },
    contentWrapper : {
        flex : 12,
    },
});

PendingGameItem.propTypes = {
    name    : PropTypes.string,
    dateTo  : PropTypes.string,
    onPress : PropTypes.func,
};

export default PendingGameItem;