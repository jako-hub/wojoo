import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import {
    Form,
    Item,
    Input,    
    Label,
} from 'native-base';
import {Button} from '../../commons/forms';
import { 
    NumberPicker,
 } from '../../commons/forms';

/**
 * This component only renders the Teams form
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const TeamForm = ({defaultName="", defaultPlayers=1, onSubmit}) => {
    const [teamName, setName] = useState(defaultName);
    const [players, setPlayers] = useState(defaultPlayers);
    const onAddTeam = () => {
        setName("");
        return onSubmit && onSubmit({nombre : teamName, jugadores : players});
    };
    return (
        <Form style={styles.root}>
            <View style={styles.row}>
                <Item floatingLabel style={styles.col}>
                    <Label>{"Nombre del equipo"}</Label>
                    <Input 
                        value           = { teamName }
                        onChangeText    = { text => setName(text) }

                    />
                </Item>
                <View style={styles.col}>
                    <NumberPicker 
                        label           = { "No. jugadores" }
                        min             = { 1   }
                        max             = { 100 }
                        defaultValue    = { players }
                        onChange        = { number => setPlayers(number) }
                    />
                </View>                
            </View>
            <View style={{flex : 1, alignItems : "center", paddingVertical: 10, marginTop: 10,}}>
                <Button
                    info
                    disabled    = { teamName === ""   }
                    onPress     = { () => onAddTeam() }
                >
                    Agregar Equipo
                </Button>
            </View>
        </Form>
    )
};

const styles = StyleSheet.create({
    root : {
        flex : 1,
        marginBottom : 0,
    },
    row : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
    },
    col: {
        flex : 1,
        paddingHorizontal : 5,
    }
});

TeamForm.propTypes = {
    onSubmit : PropTypes.func,
};

export default TeamForm;