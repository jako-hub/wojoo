import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
/**
 * This component renders a fildset for a form.
 * @param {*} param0 
 */
const FieldSetTitle = ({title}) => (
    <View style={styles.root}>

        <View style={styles.wrapperText}>
            <Icon name="users" size={20} />
            <Text style={{marginLeft : 15}} title >{title}</Text>
        </View>
        <View style={styles.separator} />
    </View>
);

const styles = StyleSheet.create({
    root : {
        flex : 1,
        paddingHorizontal : 15,
        marginBottom : 5,
    },
    separator : {
        borderBottomColor : "#bdbdbd",
        borderBottomWidth : 1,
        marginTop : 10,
    },
    wrapperText : {
        flex : 1,
        flexDirection : "row",
    },
});

FieldSetTitle.propTypes = {
    title : PropTypes.string,
};

export default FieldSetTitle;