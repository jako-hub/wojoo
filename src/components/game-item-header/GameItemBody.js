import React from 'react';
import {
    StyleSheet,        
} from 'react-native';
import {
    Body,
    Text,
    View,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RenderRow = ({title, value, full, icon}) => (
    <View style={styles.row}>
        <View style={styles.info}><Text>{icon && (<Icon size={15} name={icon}/>)}{icon? ` ${title}` : title}</Text></View>
        {!full && (<View style={styles.value}><Text>{value}</Text></View>)}
    </View>
);

export const MAX_CHARS_SCENARIO = 10;

const GameItemBody = (props={}) => {
    const {
        noLimitChars=false,
        game={}
    } = props;
    const {
        negocio_nombre,
        escenario_nombre,
        juego_acceso,
        acceso
    } = game;
    let scenario = (escenario_nombre.length > MAX_CHARS_SCENARIO && !noLimitChars)
                    ? `${escenario_nombre.substring(0, MAX_CHARS_SCENARIO)}...` 
                    : escenario_nombre;
    return (
        <View style={styles.root}>
            <Body style={styles.body}>
                <RenderRow title={negocio_nombre} value = { juego_acceso || acceso }/>
            </Body>
        </View>
    );
}

const styles = StyleSheet.create({
    root : {
        //marginVertical : 2,
    },
    body : {
        flex                : 1,
        paddingRight        : 30,
    },
    row : {
        flex            : 1,
        justifyContent  : "space-between",
        flexDirection   : 'row',
        //marginBottom    : 5,
    },
    info : {
        flex : 1,
    },
    value : {
        flex        : 1,
        alignItems  : "flex-end",
    },
});

GameItemBody.propTypes = {
    game : PropTypes.shape({
        codigo      : PropTypes.any,
        nombre      : PropTypes.string,
        fecha       : PropTypes.string,
        tipo        : PropTypes.string,
        jugadores   : PropTypes.number,
        confirmados : PropTypes.number,
        noLimitChars: PropTypes.bool,
        escenario : PropTypes.shape({
            codigo      : PropTypes.any,
            negocio     : PropTypes.string,
            ubiacion    : PropTypes.string,
        }),
        anfitrion : PropTypes.shape({
            usuario     : PropTypes.string,
            foto        : PropTypes.string,
            codigo      : PropTypes.any,
        }),
    }),
};

export default GameItemBody;