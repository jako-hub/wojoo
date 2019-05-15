import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet
} from 'react-native';
import {
    View,
    Text,
    Item,
    Input,
    List,
    ListItem,
    Body,
    Right,
    Label,
} from 'native-base';
import { PrettyButton, IconButton, RoundedButton } from '../../commons/forms';

const PhoneNumberItem = ({number, onRemove}) => (
    <ListItem noBorder noIndent>
        <Body>
            <Text>{number}</Text>
        </Body>
        <Right>
            <IconButton icon = "times" onPress = { onRemove } />
        </Right>
    </ListItem>
);

const InviteForm = ({onCancel, onSend}) => {
    const [numbers=[], setNumbers] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const totalNumbers = numbers.length;
    const removeNumber = (numberToRemove) => {
        setNumbers(numbers.filter(number => number !== numberToRemove));
    };
    const addNumber = () => {
        if(phoneNumber.length < 10) return false;
        const foundItem = numbers.find(number => number === phoneNumber);
        if(!foundItem) setNumbers([phoneNumber, ...numbers]);
        setPhoneNumber("");
    };
    const send = () => {
        if(onSend) {
            const newNumbers = [];
            numbers.forEach(item => {
                newNumbers.push({
                    phoneNumbers : [ {number : item} ]
                });
            });
            onSend(newNumbers);
        }
        onCancel();
    }
    return (
        <View style = { styles.root }>
            <View style = { styles.header }>
                <Text style = { {textAlign : "center" }}>
                    Comparte JAKO con tus amigos
                </Text>
            </View>
            <View style = { styles.row }>
                <View style = { styles.inputWrapper }>
                    <Item floatingLabel> 
                        <Label>
                            <Text>Ingresa el número de teléfono</Text>
                        </Label>
                        <Input 
                            value = { phoneNumber }
                            onChangeText = { text => setPhoneNumber(text) }
                            keyboardType = { "number-pad" }
                            onSubmitEditing = { () => addNumber() }
                        />
                    </Item>
                </View>
                <View style = {styles.buttonWrapper}>
                    <PrettyButton disabled={phoneNumber.length < 10} onPress = { () => addNumber() }>
                        Añadir
                    </PrettyButton>
                </View>
            </View>
            {totalNumbers === 0 && (
                <View style = { styles.empty }>
                    <Text note style = { {textAlign : "center"} }>Añade al menos un número de teléfono</Text>
                </View>
            )}
            {totalNumbers > 0 && (
                <View style = { styles.list }>
                    <List>
                        {numbers.map((number, key) => (
                            <PhoneNumberItem
                                key = {`phone-number-item-invite-${key}-{number}`}
                                number = { number }
                                onRemove = { () => removeNumber(number) }
                             />
                        ))}
                    </List>                    
                </View>
            )}
            <View style = { styles.sendButtonWrapper }>
                <PrettyButton onPress = { onCancel } >Cancelar</PrettyButton>
                {totalNumbers > 0 && (<PrettyButton onPress = { () => send() } primary >Enviar invitación</PrettyButton>)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        paddingHorizontal : 20,
    },
    header : {
        marginVertical : 20,
    },
    row : {
        marginTop : 20,
        flexDirection : "row",
        justifyContent : "space-between",
    },
    inputWrapper : {
        flex : 7
    },
    buttonWrapper : {
        flex : 3,
    },
    empty : {
        marginTop : 20,
    },
    list : {

    },
    sendButtonWrapper : {
        flexDirection : "row",
        justifyContent : "center",
        marginTop : 30,
    },
});

InviteForm.propTypes = {
    onSend : PropTypes.func,
    onCancel : PropTypes.func,
};

export default InviteForm;