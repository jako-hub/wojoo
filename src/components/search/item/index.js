import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Header from '../../game-item-header';
import Content from './Content';
import { GameItemBody, } from '../../game-item-header';
import Footer from './Footer';
import ImagePreview from './ImagePreview';
import PropTypes from 'prop-types';
import {
    Text,
} from 'native-base';
import stylesPalette from '../../../utils/stylesPalette';
import GameImagePreview from '../../game-item-header/ImagePreview';

/**
 * This component renders the Item presentation
 * @param {*} param0 
 */
const Item = ({item, onShare, isInGame=true, organizer, onSelect, onAdd, onViewProfile,}) => (
    <View style={styles.root}>
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.wrapper}>
                <View style={styles.pictureWrapper}>
                    <GameImagePreview />
                    {isInGame && (
                        <View style = { styles.isInGame }>
                            <Text style={ {color : "#FFF"} }>Participas</Text>
                        </View>
                    )}
                </View>
                <View style={styles.infoWrapper}>
                    <Header
                        isInGame         = { isInGame                   }
                        title            = { item.nombre                }
                        date             = { item.fecha_desde           }
                        dateTo           = { item.fecha_hasta           }
                        totalPlayers     = { item.jugadores             }
                        confirmedPlayers = { item.jugadores_confirmados }
                    />
                    <GameItemBody 
                        game={item}
                    />                    
                </View>
            </View>
        </TouchableOpacity>
        <Footer
            isInGame    = { isInGame }
            onAdd       = { onAdd    }
            user        = { organizer? "Tú" : item.jugador_seudonimo }
            onViewProfile = {onViewProfile}
            onShare     = { () => onShare(item) }
         />
    </View>
    
);
const palette = stylesPalette();
const styles = StyleSheet.create({
    root : {
        flex : 1,
        marginVertical : 5,
        borderBottomColor : palette.accent.divider,
        borderBottomWidth : 1,
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20,
        paddingBottom : 10,
    },
    wrapper : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "space-between",
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
    isInGame : {
      backgroundColor : palette.primary.color,
      paddingHorizontal : 10,
      marginTop : 5,
      borderRadius : 10,
    },
});

Item.propTypes = {
    onSelect    : PropTypes.func,
    onAdd       : PropTypes.func,
    onComment   : PropTypes.func,
    user        : PropTypes.string,
    onViewProfile : PropTypes.func,
    isInGame    : PropTypes.bool,
};

export default Item;