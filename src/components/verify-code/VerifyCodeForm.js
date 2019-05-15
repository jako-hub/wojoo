import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { 
    Form,
    Item,
    Label,
    Input,
 } from 'native-base';
import PropTypes from 'prop-types';
import { SubmitButton } from '../../commons/forms';

/**
 * This component renders the verification code form only
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const VerifyCodeForm = ({code, isValid, onSubmit, error, onChange}) => (
    <View style={styles.root}>
            <ScrollView>
                <Form style={styles.form}>
                    <Item 
                        floatingLabel
                        style           = { styles.row } 
                        error           = { error }
                    >
                        <Label>Ingresa el código de verificación</Label>
                        <Input                             
                            keyboardType    = "numeric"
                            value           = { code                   }
                            onChangeText    = { text => onChange(text) }
                            maxLength       = { 4 }
                            onSubmitEditing = { onSubmit }
                        />
                        
                    </Item>
                    <View style={styles.buttonRow}>
                        <SubmitButton 
                            block 
                            primary 
                            disabled    = { !isValid } 
                            onPress     = { onSubmit }
                            label       = "Verificar"
                        />
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
    }
});

VerifyCodeForm.propTypes = {
    onChange    : PropTypes.func,
    code        : PropTypes.string,
    onSubmit    : PropTypes.func,
    isValid     : PropTypes.bool,
};
export default VerifyCodeForm;