import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Header, { GameItemBody } from '../../../game-item-header';
import Footer from './Footer';
import PropTypes from 'prop-types';
import GameImagePreview from '../../../game-item-header/ImagePreview';
import stylesPalette from '../../../../utils/stylesPalette';

/**
 * This component renders the Item presentation
 * @param {*} param0 
 */
const Item = ({item, onSelect, onViewProfile, onShare}) => (
    <View style={styles.root}>
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.wrapper}>
                <View style={styles.pictureWrapper}>
                    <GameImagePreview />
                </View>
                <View style={styles.infoWrapper}>
                    <Header
                        title               = { item.juego_nombre                }
                        date                = { item.juego_fecha_desde           }
                        dateTo              = { item.juego_fecha_hasta           }
                        totalPlayers        = { item.juego_jugadores             }
                        confirmedPlayers    = { item.juego_jugadores_confirmados }
                    />
                    <GameItemBody 
                        game={item}
                    />
                </View>
            </View>
        </TouchableOpacity>
        <Footer
            user            = { item.jugador_seudonimo  }
            gameCode        = { item.codigo_juego       }
            onViewProfile   = { onViewProfile           }
            onShare         = { onShare                 }
         />
    </View>
    
);

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flex : 1,
        marginVertical : 5,                
        borderBottomWidth : 1,
        marginHorizontal : 10,
        paddingBottom : 10,
        borderBottomColor : palette.accent.divider,
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20,
    },
    wrapper : {
        flex : 1,
        flexDirection   : "row",
        alignItems      : "center",
    },
    pictureWrapper : {
        flex : 3,
        justifyContent : "center",
        alignItems  : "center",
    },
    infoWrapper : {
        flex : 7,
    },
});

Item.propTypes = {
    onSelect        : PropTypes.func,
    onAdd           : PropTypes.func,
    onComment       : PropTypes.func,
    onViewProfile   : PropTypes.func,
    onShare         : PropTypes.func,
};

export default Item;