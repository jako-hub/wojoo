import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Button,
} from 'native-base';

/**
 * This component allows to display a view where we tell to the user
 * that he needs to give permissions.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const NoPermission = ({requestAgain}) => (
    <View style={styles.root}>
        <View style={styles.wrapper}>
            <Icon name="user-lock" size={120}/>
            <Text style={styles.text}>
                Para continuar con el registro es necesario que brindes permiso a la aplicación.
            </Text>
            <View style={styles.buttonWrapper}>
                <Button style={styles.button} rounded light block onPress={ requestAgain }>
                    <Text>
                        Asignar permisos
                    </Text>
                </Button>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    root : {
        flex            : 1,
        justifyContent  : "center",
        alignItems      : "center",
    },
    wrapper : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        maxWidth : "50%"
    },
    text : {
        marginTop : 20,
        textAlign : "center",
        fontSize : 18,
    },
    buttonWrapper : {
        marginTop : 25,
    },
    button : {
        width : "100%",
    },
});

NoPermission.propTypes = {
    requestAgain : PropTypes.func,
};

export default NoPermission;