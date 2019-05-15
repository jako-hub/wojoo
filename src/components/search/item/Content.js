import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    Body,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RenderRow = ({title, value, icon}) => (
    <View style={styles.row}>
        <View style={styles.info}><Text>{icon && (<Icon size={15} name={icon}/>)}{icon? ` ${title}` : title}</Text></View>
        <View style={styles.value}><Text>{value}</Text></View>
    </View>
);

const Content = (props={}) => {
    const {
        negocio_nombre,
        escenario_nombre,
        acceso,
    } = props.item||{};
    return (
        <View style={styles.root}>
            <Body style={styles.body}>
                <RenderRow title={escenario_nombre} value={negocio_nombre}/>
                <RenderRow title={""} value={acceso}/>
            </Body>
        </View>
    );
}

const styles = StyleSheet.create({
    root : {
        marginVertical : 2,
    },
    body : {
        flex                : 1,
        paddingRight        : 30,
    },
    row : {
        flex            : 1,
        justifyContent  : "space-between",
        flexDirection   : 'row',
        marginBottom    : 5,
    },
    info : {
        flex : 1,
    },
    value : {
        flex        : 1,
        alignItems  : "flex-end",
    },
});

Content.propTypes = {
    item : PropTypes.shape({
        codigo      : PropTypes.any,
        nombre      : PropTypes.string,
        fecha       : PropTypes.string,
        tipo        : PropTypes.string,
        jugadores   : PropTypes.number,
        confirmados : PropTypes.number,
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
        comentarios : PropTypes.arrayOf(PropTypes.shape({
            usuario : PropTypes.object,
            comment : PropTypes.string,
        })),
    }),
};

export default Content;