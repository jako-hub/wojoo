import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    Text,
} from 'native-base';
import RoundedButton from '../../commons/forms/RoundedButton';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputSelector = ({onOpen, selected}) => {
    return (
        <TouchableOpacity onPress={onOpen}>
            <View style={styles.container}>
                <View style={styles.textWrapper}>
                    <Text>{!selected? "Selecciona un escenario" : selected.nombre}</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <RoundedButton primary onPress={onOpen}>
                        <Icon name="search" size={20}/>
                    </RoundedButton>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container : {
        flex            : 1, 
        flexDirection   : "row",
        justifyContent  : "space-between",
        alignItems      : "flex-end",
        paddingVertical : 30,
        paddingLeft     : 10,
        marginVertical  : 10,
        height          : 80,
        paddingLeft     : 15,
    },
    textWrapper : {
        flex : 7,
    },
    buttonWrapper : {
        
    },
});

InputSelector.propTypes = {
    onOpen   : PropTypes.func,
    selected : PropTypes.any,
};

export default InputSelector;