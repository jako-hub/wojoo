import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    Right,
    Body,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * This component allows to render the user profile options.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const UserOptions = ({onLogout, togglePublications, viewClans}) => (
    <List>
        <ListItem button onPress = { togglePublications }>
            <Body><Text>Publicaciones</Text></Body>
            <Right>
                <Icon name = { "newspaper" } size = {20} />
            </Right>
        </ListItem>
        <ListItem button onPress = { viewClans }>
            <Body><Text>Clanes</Text></Body>
            <Right>
                <Icon name = { "users" } size = {20} />
            </Right>
        </ListItem>
        <ListItem button onPress = { onLogout } noIndent>
            <Body><Text>Salir</Text></Body>
            <Right>
                <Icon name = { "sign-out-alt" } size = {20} />
            </Right>
        </ListItem>
    </List>
);

UserOptions.propTypes = {
    onLogout : PropTypes.func,
};

export default UserOptions;