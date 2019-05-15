import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text,
    Form,
    Item,
    Input,
    Label,
    Picker,
} from 'native-base';
import {
    SubmitButton,
} from '../../commons/forms';
import _ from 'underscore';


const JoinForm = ({positions=[], teams=[], onSubmit}) => {
    const [form, setForm] = useState({
        number      : null,
        position    : null,
        team        : null,
    });

    const onChange = (key, value) => setForm({...form, [key] : value});
    const isValid = () => (
        (form.number    !== "" && form.number   !== null) && 
        (form.position  !== "" && form.position !== null) && 
        (form.team      !== "" && form.team     !== null)
    );
    return (
        <Form style={styles.root}>            
            <View style={styles.formRow}>
                <Text>Equipo</Text>
                <Picker
                    note
                    mode="dropdown"
                    selectedValue = {form.team}                
                    onValueChange = {value => onChange("team", value)}
                >
                    <Picker.Item 
                        label={"Ninguno"} 
                        value=""
                    />
                    {teams.map((team, key) => (
                        <Picker.Item 
                            label={`${team.nombre} (${team.jugadores_confirmados}/${team.jugadores})`} 
                            value={team.codigo_juego_equipo} key={`team-list-drop-down-icon-${key}`}
                        />
                    ))}
                    
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text>Posición</Text>
                <Picker
                    note
                    mode="dropdown"
                    selectedValue = {form.position}                
                    onValueChange = {value => onChange("position", value)}
                >
                    <Picker.Item 
                        label={"Ninguna"} 
                        value=""
                    />
                    {positions.map((position, key) => (
                        <Picker.Item 
                            label={position.nombre} 
                            value={position.codigo_posicion} key={`position-list-drop-down-icon-${key}`}
                        />
                    ))}
                </Picker>
            </View>
            <Item floatingLabel>
                <Label>{"Tu número de jugador"}</Label>
                <Input 
                    value           = {form.number? form.number.toString() : ''}
                    onChangeText    = {text => onChange("number", text)}
                    keyboardType    = "numeric"
                    maxLength       = {4}
                />
            </Item>
            <View style={{marginTop : 25,}}>
                <SubmitButton
                    primary
                    block
                    label = {"Unirme"}
                    disabled = {!isValid()}
                    onPress = {() => onSubmit(form)}
                />
            </View>
        </Form>
    );
}

const styles = StyleSheet.create({
    root : {
        paddingHorizontal : 25,
    },
    formRow : {        
        marginBottom : 10,
        paddingHorizontal : 10,
    },
});

JoinForm.propTypes = {
    positions : PropTypes.array,
    onSubmit : PropTypes.func,
};

export default JoinForm;