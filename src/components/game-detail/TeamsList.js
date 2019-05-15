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
} from 'native-base';
import { DEFAULT_USER_IMG, IMAGES_SERVER } from 'react-native-dotenv';
import stylesPalette from '../../utils/stylesPalette';


const RenderTeam = ({teamName, team=[], onViewProfile, playerCode}) => (
    <>
        <ListItem itemDivider>
            <Text>{teamName}</Text>
        </ListItem>
        {team.length === 0 && (
            <ListItem>
                <Text note style={{textAlign : "center"}}>Sin jugadores aún</Text>
            </ListItem>
        )}
        {team.map((player, key) => {
            const playerNumber = parseInt(player.numero);
            return (
                <ListItem 
                    key={`player-item-list-${player.codigo_jugador}-${key}`}
                    noIndent
                    avatar
                >
                    <Left>
                        <Thumbnail source={{uri : player.foto? `${IMAGES_SERVER}${player.foto}` : DEFAULT_USER_IMG}} />
                    </Left>
                    <Body>
                        <TouchableOpacity onPress = { () => onViewProfile(player.codigo_jugador, player.jugador_nombre_corto) }>
                            <View style = {{flexDirection : "row", justifyContent : "flex-start"}}>
                                <Text note>
                                    ({player.seudonimo})
                                </Text>
                                <Text>
                                    {playerCode === player.codigo_jugador? "Tú" : player.jugador_nombre_corto}
                                </Text>                                
                            </View>
                        </TouchableOpacity>                                                
                        <View style={{flex: 1, flexDirection : "row"}}>
                            <Text note>Pos:</Text><View style={styles.badge} primary><Text style={styles.textBadge}>{player.posicion_nombre}</Text></View>
                        </View>        
                    </Body>
                    <Right>
                        <Text note>{`#${playerNumber < 9? '0' : ''}${player.numero}`}</Text>
                    </Right>
                </ListItem>
            );
        })}
    </>
);

const TeamsList = ({teams={}, onViewProfile, playerCode}) => {
    const teamNames = Object.keys(teams);
    return (
        <View style={styles.root}>
            <List>
                {teamNames.map((teamName, key) => (
                    <RenderTeam 
                        key             = { `team-list-item-${teamName}-${key}` } 
                        team            = { teams[teamName] }
                        teamName        = { teamName        }
                        onViewProfile   = { onViewProfile   }
                        playerCode      = { playerCode      }
                    />
                ))}
                
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
    playerCode      : PropTypes.any
};

export default TeamsList;