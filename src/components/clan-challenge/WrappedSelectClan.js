import React from 'react';
import { FullScreenModal } from '../../commons/modals';
import {Text, View, Item, Label, Input} from 'native-base';
import SelectClan from './SelectClan';
import {StyleSheet} from 'react-native';
import { SimpleLoader } from '../../commons/loaders';
import PropTypes from 'prop-types';

/**
 * Componente que representa en un modal el listado de clanes
 * @author Jhoan López <jhoanlt19@gmail.com>
 * @param {*} param0 
 */
const WrappedSelectClan = ({openModal, toggleModal, clans=[], loading, onPress, onPressItem}) => {
    return(
        <FullScreenModal
            title = 'Selecciona el clan'
            open = { openModal }
            onClose = { toggleModal }
            disableScroll
        >   
            {loading ? 
                <SimpleLoader/> :  
                <SelectClan 
                    clans       = {clans}
                    name_button ='Añadir'
                    onPress     = {onPress}
                    onPressItem = {onPressItem}
                    seeker
                />
            }
        </FullScreenModal>
    );
}

WrappedSelectClan.propTypes = {
    openModal   : PropTypes.bool,
    toggleModal : PropTypes.func,
    clans       : PropTypes.array,
    loading     : PropTypes.bool,
    onPress     : PropTypes.func,
    onPressItem : PropTypes.func
};

export default WrappedSelectClan;