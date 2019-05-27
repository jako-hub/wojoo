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
import { ImagePicker, SubmitButton } from '../../commons/forms';


/**
 * This component allows to render only the clan creator form.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const ClanForm = (props) => {
    const {
        gameTypes=[],
        formValid,
        gameType,
        name,
        //city,
        onChange,
        onSelectImage,
        photo={},
        onSubmit,
    } = props;
    return (
        <Form style = {styles.root} >
            <View style = { styles.row }>
                <ImagePicker 
                    onSelectImage   = { onSelectImage           }
                    imgSrc          = { photo? photo.uri : null }
                />
            </View>
            <Label style = { styles.pickerLabel }><Text>Tipo de juego</Text></Label>
            <Item>
                <Picker                
                    note
                    mode            = "dropdown"
                    style           = { { width: 120 }   }
                    selectedValue   = { gameType         }
                    onValueChange   = {value => onChange? onChange("gameType", value) : null}
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
                <Input 
                    value           = { name }
                    onChangeText    = { text => onChange? onChange("name", text) : null }
                    onSubmitEditing = { () => formValid && onSubmit? onSubmit() : null }
                />
            </Item>
            <View style = { styles.buttonRow }>
                <SubmitButton 
                    primary 
                    disabled    = { !formValid  }
                    onPress     = { onSubmit    }
                    block
                >
                    Guardar clan
                </SubmitButton>
            </View>
        </Form>
    );
};

const styles = StyleSheet.create({
    pickerLabel : {
        paddingLeft : 20,
    },
    buttonRow : {
        marginTop       : 20,
        flexDirection   : "row",
        justifyContent  : "center"
    },
});

ClanForm.propTypes = {
    formValid       : PropTypes.bool,
    gameType        : PropTypes.any,
    name            : PropTypes.string,
    city            : PropTypes.any,
    onChange        : PropTypes.func,
    onSubmit        : PropTypes.func,
    onSelectImage   : PropTypes.func,
    photo : PropTypes.shape({
        type    : PropTypes.string,
        uri     : PropTypes.string,
    }),

};

export default ClanForm;