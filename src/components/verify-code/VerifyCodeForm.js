import React from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    View,
    Text, 
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
const VerifyCodeForm = ({code, phone, onCancel, isValid, onSubmit, error, onChange}) => (
    <View style={styles.root}>
            <ScrollView>
                <View>
                    <Text note style = {{textAlign : "center"}} >Se enviará un mensaje de texto al {phone} para verificar tu identidad</Text>
                </View>
                <Form style={styles.form}>
                    <Item 
                        floatingLabel
                        style           = { styles.row } 
                        error           = { error }
                    >
                        <Label>
                            <Text>Ingresa el código de verificación</Text>
                        </Label>
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
                    <View style = { styles.buttonRow }>
                        <SubmitButton 
                            block 
                            onPress     = { onCancel }
                            label       = "Cancelar"
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
    onCancel    : PropTypes.func,
    phone       : PropTypes.string,
};
export default VerifyCodeForm;