import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    List,
    ListItem,
    Body,
    Left,
    Right,
    Text,
    Thumbnail,
    Switch,
} from 'native-base';
import { DEFAULT_USER_IMG, IMAGES_SERVER } from 'react-native-dotenv';
import stylesPalette from '../../utils/stylesPalette';

const MAX_CHARS = 15;
const RenderTeam = ({players=[], onValueChange, playerCode}) => (
    <>
        {players.length === 0 && (
            <ListItem>
                <Text note style={{textAlign : "center"}}>Sin jugadores aún</Text>
            </ListItem>
        )}
        {players.map((player, key) => {
            const playerNumber = parseInt(player.numero);
            return (
                <ListItem 
                    key={`player-item-list-${player.codigo_jugador}-${key}`}
                    noIndent
                    avatar
                >
                    <Left>
                        <Thumbnail 
                            style = { {width : 30, height : 30} }
                            source={{uri : player.foto? `${IMAGES_SERVER}${player.foto}` : DEFAULT_USER_IMG}} 
                        />
                    </Left>
                    <Body>
                        <View style = {{justifyContent : "flex-start"}}>
                            <Text note>
                            #{playerNumber} {player.seudonimo} 
                            </Text>
                            <Text>
                                {playerCode === player.codigo_jugador? "Tú" : player.jugador_nombre_corto}
                            </Text>                                
                        </View>                                            
                    </Body>
                    <Right style = { { justifyContent : "center" } }>
                        <Switch 
                            value = {player.attended}
                            onValueChange = { () => onValueChange? onValueChange(player) : null }
                        />
                    </Right>
                </ListItem>
            );
        })}
    </>
);

const TeamsList = ({teams={}, players, onValueChange, onViewProfile, playerCode}) => {
    const teamNames = Object.keys(teams);
    return (
        <View style={styles.root}>
            <List>
                <RenderTeam 
                    players         = {players}
                    onViewProfile   = { onViewProfile   }
                    playerCode      = { playerCode      }
                    onValueChange   = { onValueChange }
                />                
            </List>
        </View>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {

    },
    badge : {
        padding : 2,
        paddingHorizontal   : 10,
        paddingVertical     : 2,
        backgroundColor     : palette.primary.color,
        borderRadius        : 10,
        justifyContent      : "center",
        alignItems          : "center",
        alignSelf           : "baseline",
    },
    textBadge : {
        fontSize    : 12,
        textAlign   : "center",
        color       : "#fff",
    },
});

TeamsList.propTypes = {
    teams           : PropTypes.any,
    onViewProfile   : PropTypes.func,
    playerCode      : PropTypes.any,
    players : PropTypes.array,
};

export default TeamsList;