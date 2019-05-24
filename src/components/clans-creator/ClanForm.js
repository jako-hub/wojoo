import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { 
    View, 
    Form,
    Text, 
    Item,
    Input,
    Label,
    Picker,
} from 'native-base';
import { ImagePicker, PrettyButton, SubmitButton } from '../../commons/forms';

const ClanForm = (props) => {
    const {
        gameTypes=[],
        gameType,
        onChange,
        onSelectImage,
    } = props;    
    return (
        <Form style = {styles.root} >
            <View style = { styles.row }>
                <ImagePicker 
                    onSelectImage = { onSelectImage }
                />
            </View>
            <Label style = { styles.pickerLabel }><Text>Tipo de juego</Text></Label>
            <Item>
                <Picker                
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    selectedValue={gameType}
                    onValueChange={onChange}
                    >
                    {gameTypes.map((item, key) => (
                        <Picker.Item 
                            key     = { `game-type-creator-item-${key}` }
                            label   = { item.label} value={item.code    } 
                        />
                    ))}
                </Picker>
            </Item>
            <Item floatingLabel>
                <Label><Text>Nombre del clan</Text></Label>
                <Input />
            </Item>
            <View style = { styles.buttonRow }>
                <SubmitButton primary>
                    Guardar
                </SubmitButton>
            </View>
        </Form>
    );
};

const styles = StyleSheet.create({
    root : {

    },
    pickerLabel : {
        paddingLeft : 20,
    },
    buttonRow : {
        marginTop : 20,
        flexDirection : "row",
        justifyContent : "center"
    },
});

ClanForm.propTypes = {
    gameType : PropTypes.any,
    name     : PropTypes.string,
    photoUri        : PropTypes.string,
    onChange : PropTypes.func,
    onSelectImage : PropTypes.func,
};

export default ClanForm;