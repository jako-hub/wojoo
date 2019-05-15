import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SimpleModal } from '../../commons/modals';
import TeamsList from './TeamsList';
import { SubmitButton } from '../../commons/forms';
import { CustomChip } from '../../commons/others';

const ModalTerminate = ({teams=[], onSubmit, players=[], attendance, noAttendance=0, playerCode, onValueChange, onClose, open, }) => {
    return (
        <SimpleModal
            open = {open}
            onClose = {onClose}
            title = "Cerrar juego"
        >
            <View style = {styles.root}>
                <View>
                    <View style = {styles.chipWrapper}>
                        <CustomChip icon={"thumbs-up"} label = { attendance }    />
                        <CustomChip icon={"thumbs-down"} label = { noAttendance }  type="danger" />
                    </View>
                </View>
            </View>
            <TeamsList 
                teams = { teams }
                playerCode = { playerCode }
                onValueChange = { onValueChange }
                players = { players }
            />
            <View style= { {marginVertical : 20,} }>
                <SubmitButton 
                    label = "Cerrar Juego"
                    primary
                    block
                    onPress = { onSubmit }
                />
            </View>
        </SimpleModal>
    );
}

const styles = StyleSheet.create({
    root : {
        justifyContent      : "center",
        flexDirection       : "row",
        marginVertical      : 10,
    },
    chipWrapper : {
        marginTop           : 10,
        justifyContent      : "center",
        flexDirection       : "row",
    },
});

ModalTerminate.propTypes = {
    onValueChange : PropTypes.func,
    players  : PropTypes.array,
};

export default ModalTerminate;