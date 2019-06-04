import React from 'react';
import {Text, View, Thumbnail} from 'native-base';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {DEFAULT_USER_IMG, IMAGES_SERVER} from 'react-native-dotenv';

/**
 * @author Jhoan López <jhoanlt19@gmail.com>
 * Listar jugadores del clan
 * @param {*} param0 
 */
const ListPlayers = ({players=[]}) => {
    return(
        <View>
            {players.length === 0 ? 
                <View style = { styles.emptyList }>
                    <Text note style = { styles.emptyText }>No hay jugadores que mostrar</Text>
                </View> : 
                players.map((item, key) => (
                    <View thumbnail style = { styles.listItem } noBorder key={key}>
                        <View style = { styles.listItemAvatar }>
                            <Thumbnail 
                                source = { {uri : (item.jugador_foto? `${IMAGES_SERVER}${item.jugador_foto}` : DEFAULT_USER_IMG)}}
                                style = { [styles.listPhoto, styles.thumbWrapper] }
                            />
                        </View>
                        <View style = { styles.listItemBody }>
                            <Text>{item.jugador_nombre_corto}</Text>
                            <Text note>{item.jugador_seudonimo}</Text>
                        </View>
                    </View>
                ))
            }
        </View>
    )
};

ListPlayers.propTypes = {
    players : PropTypes.array
};

const styles = StyleSheet.create({
    thumbWrapper : {
        backgroundColor : "#e0e0e0",
    },
    listPhoto : {
        width : 40,
        height : 40,
        marginBottom : 10,
    },
    listItem : {
        flexDirection : "row",
        marginTop     : 12
    },
    listItemBody : {
        flex : 7,
    },
    listItemAvatar : {
        flex : 2,
        justifyContent  : "center",
        alignItems      : "center",
    },
    emptyList : {
        flexDirection   : "row",
        justifyContent  : "center",
        paddingTop      : 20,
        marginTop       : 10,        
    },
    emptyText : {
        textAlign : "center",
    },
});

export default ListPlayers;