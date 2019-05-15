import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    RefreshControl,
    View,
    StyleSheet,
} from 'react-native';
import {
    Text,
} from 'native-base';
import { Button } from '../../commons/forms';
import Item from './item';
import { withSession } from '../../providers';
import { EmptyObject } from '../../commons/others';

const EmptySet = ({goToCreate, crearJuego}) => (
    <View style={styles.EmptySet}>
        <View>
            <EmptyObject 
                message = "Al parecer no hay juegos cercanos"
                icon = "futbol-o"
            />
            {crearJuego && (
                <View style={{flex : 1, alignItems : "center", marginTop: 15}}>
                    <Button info onPress={goToCreate}>
                        Crea un juego e invita tus amigos
                    </Button>
                </View>
            )}
        </View>
    </View>
);

const Results = ({isInGame, onShare, userCode, sessionStack:{crearJuego}, onViewProfile, results=[], onSelectItem, onJoinToGame, loading=false, onRefresh, goToCreate, }) => (
    <ScrollView 
        style           = { {marginTop : 15, flex : 1, flexDirection: "column"} }
        refreshControl  = {(
            <RefreshControl 
                refreshing = { loading   }
                onRefresh  = { onRefresh }
            />
        )}
    >   
        {results.length === 0 && (
            <EmptySet goToCreate={ goToCreate } crearJuego={crearJuego} />
        )}
        {results.map((item, key) => (
            <Item 
                key         = { `${item.code}-${key}` } 
                onSelect    = { () => onSelectItem(item) }
                item        = { item }
                organizer   = { userCode === item.codigo_jugador }
                isInGame    = { isInGame(item) }
                onAdd       = { () => onJoinToGame? onJoinToGame(item) : null }
                onViewProfile = {() => onViewProfile(item.codigo_jugador, item.jugador_seudonimo)}
                onShare     = { onShare }
            />
        ))}
    </ScrollView>
);

const styles = StyleSheet.create({
    EmptySet : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "center",
        paddingVertical : 30,
    },
});

Results.propTypes = {
    results      : PropTypes.array.isRequired,
    loading      : PropTypes.bool,
    onSelectItem : PropTypes.func,
    onJoinToGame : PropTypes.func,
    onRefresh    : PropTypes.func,
    goToCreate   : PropTypes.func,
    onViewProfile: PropTypes.func,
    userCode     : PropTypes.any,
    isInGame     : PropTypes.func,
};

export default withSession(Results);