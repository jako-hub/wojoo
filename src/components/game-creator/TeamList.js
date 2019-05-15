import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'react-native';
import {
    List,
    ListItem,
    Body,
    Right,
    Text,
} from 'native-base';
import { IconButton } from '../../commons/forms';

/**
 * This component renders the team list.
 * @author Jorge Alejanro Quiroz Serna <jakop.box@gmail.com>
 */
const TeamList = ({teams=[], onRemove}) => (
    <View>
        {teams.length === 0 && (
            <Text style={{textAlign : "center", marginBottom: 20, paddingVertical : 20}} note>{"Añade al menos un equipo"}</Text>
        )}
        <List>
            {teams.map((item, key) => (
                <ListItem key={`item-manager-item-${key}`}  noIndent>
                    <Body>
                        <Text>{`${item.nombre}`}</Text>
                        <Text note>{`Jugadores: ${item.jugadores}`}</Text>
                    </Body>
                    <Right>
                        <IconButton icon="trash-alt" onPress={() => onRemove? onRemove(key) : null}/>
                    </Right>
                </ListItem>
            ))}
        </List>
    </View>
);

TeamList.propTypes = {
    teams : PropTypes.arrayOf(PropTypes.shape({
        nombre      : PropTypes.string,
        jugadores   : PropTypes.any,
    })),
    onRemove : PropTypes.func,
};

export default TeamList;