import React from 'react';
import {ScrollView, View} from "react-native";
import {Form, Input, Item, Label, Text} from "native-base";
import { StyleSheet } from 'react-native';
import SubmitButton from "../../commons/forms/SubmitButton";
import PropTypes from 'prop-types';

/**
 * This component renders the login form.
 * @param form
 * @param onChange
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
const LoginForm = ({form, onChange, onSubmit}) => (
    <View style={styles.root}>
        <ScrollView>
            <Form style={styles.form}>
                <View style={{alignItems : "center"}}>
                    <Text >
                        Ingresa a jako
                    </Text>
                </View>
                <Item floatingLabel style={styles.row}>
                    <Label><Text>Teléfono celular</Text></Label>
                    <Input
                        keyboardType    = "numeric"
                        value           = {form.phoneNumber}
                        onChangeText    = {text => onChange('phoneNumber', text)}
                    />
                </Item>
                <View style={styles.buttonRow}>
                    <SubmitButton block primary onPress={onSubmit}>
                        Ingresar
                    </SubmitButton>
                </View>
            </Form>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    root : {
        paddingHorizontal : 40,
    },
    row : {
        marginBottom : 20,
    },
    form : {
        flex : 1,
    },
    buttonRow: {
        marginBottom : 15,
    },
    passwordButton : {
        width : 45,
        justifyContent : "center",
    },
});

LoginForm.propTypes = {
    onChange : PropTypes.func,
    onSubmit : PropTypes.func,
    form : PropTypes.shape({
        phoneNumber : PropTypes.string,
        password    : PropTypes.string,
    }),
};

export default LoginForm;