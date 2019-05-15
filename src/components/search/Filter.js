import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Input,
    Form,
    Item,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

/** 
 * 
 */
const Filter = ({value, onChange}) => (
    <View style={styles.root}>
        <Form style={styles.form}>
            <Item rounded style={styles.row}>
                <Input
                    placeholder="Busca juegos"
                    value       = { value }
                    onChangeText= { text => onChange(text) }
                />
                <Icon 
                    style={styles.icon} 
                    name="search" 
                    size={30}                 
                />
            </Item>
        </Form>
    </View>
);

const styles = StyleSheet.create({
    root : {
        flexDirection : "row",
        alignItems : "flex-start",
        justifyContent : "flex-start",        
    },
    form : {
        flex : 1,
    },
    icon : {
        marginRight : 15,
        color : "#cfd8dc",
    },
    row : {
        paddingLeft : 30,
    },
    input : {
        width : "100%",
    },
});

Filter.propTypes = {
    onChange : PropTypes.func,
    value    : PropTypes.string,
};

export default Filter;
