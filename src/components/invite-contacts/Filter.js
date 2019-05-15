import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, } from 'react-native';
import { 
    View,
    Text,
    Form,
    Input,
    Item,
 } from 'native-base';
 import Icon from 'react-native-vector-icons/FontAwesome5';
const Filter = ({value, onChange, onClear}) => (
    <Form style = { styles.root }>
        <Item>
          <Input 
            onChangeText = { text =>  onChange(text) } 
            placeholder = "Buscar..."
            value = { value || "" }
            />
            {value !== "" && (
                <TouchableOpacity onPress = { onClear }>            
                    <View style = { styles.iconWrapper }>
                        <Icon  
                            style = { styles.icon } 
                            name = "times" size = {20} 
                        />
                    </View>
                </TouchableOpacity>
            )}
        </Item>
    </Form>
);

const styles = StyleSheet.create({
    root : {

    },
    icon : {
        color : "#b3b3b3",
    },
    iconWrapper : {
        paddingRight : 15,
    }
});

Filter.propTypes = {
    value : PropTypes.string,
    onChange : PropTypes.func,
};

export default Filter;