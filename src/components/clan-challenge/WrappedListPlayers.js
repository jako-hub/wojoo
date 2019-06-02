import React from 'react';
import { SimpleModal } from '../../commons/modals';
import ListPlayers from './ListPlayers';
import PropTypes from 'prop-types';
import { SimpleHeader } from '../../commons/containers';

/**
 * Componente que representa en un modal la lista de jugadores
 * @author Jhoan López <jhoanlt19@gmail.com>
 * @param {*} param0 
 */
const WrappedListPlayers = ({openModalItem, toggleModalItem, players}) => {
    return(
        <SimpleModal
            open    = { openModalItem }
            onClose = { toggleModalItem }
        >   
            <SimpleHeader title='Jugadores'/>
            <ListPlayers
                players = {players}
            />
        </SimpleModal>
    );
}

WrappedListPlayers.propTypes = {
    openModalItem   : PropTypes.bool,
    toggleModalItem : PropTypes.func
};

export default WrappedListPlayers;