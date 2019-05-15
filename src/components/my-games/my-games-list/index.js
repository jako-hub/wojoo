import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    RefreshControl,
} from 'react-native';
import {
    Text,
} from 'native-base';
import PropTypes from 'prop-types';
import Item from './item';
import { Button, IconButton } from '../../../commons/forms';
import { EmptyObject } from '../../../commons/others';

const EmptySet = ({goToSearch}) => (
    <View style={styles.EmptySet}>
        <View>
            <EmptyObject 
                message = "No te encuentras en ningún juego en el momento"
                icon = "futbol-o"
            />
            <View style={{flex : 1, alignItems : "center", marginTop: 15}}>
                <Button info onPress={goToSearch}>
                    Busca juegos y únete
                </Button>
            </View>
        </View>
    </View>
);

const ListComponent = (props) => {
    const { 
        games=[], 
        onSelectGame, 
        goToSearch, 
        onViewProfile,
        onRefresh,
        loading,
        onShare,
    } = props;
    let content = null;
    if(games.length === 0) {
        content = (<EmptySet goToSearch={goToSearch} />);
    } else {
        content = (
            <>
                <View style={styles.root}>
                    {Array.isArray(games) && games.map((item, key) => (
                        <Item
                            item            = { item                   }
                            key             = { `my-games-item-${key}` }
                            onShare         = { () => onShare(item)    }
                            onSelect        = { () => onSelectGame? onSelectGame(item) : null   }
                            onViewProfile   = { () => onViewProfile? onViewProfile(item) : null }
                        />
                    ))}
                </View>
                <View style={styles.inviteToSearch}>
                    <View style={{flex :1, alignItems :"center"}}>
                        <Text note>También puedes buscar juegos y unirte</Text>                
                        <IconButton
                            icon="search"
                            onPress = {() => goToSearch()}
                        />
                    </View>
                </View>
            </>
        );
    }

    return (
        <ScrollView
            refreshControl  = {(
                <RefreshControl 
                    refreshing = { loading   }
                    onRefresh  = { onRefresh }
                />
            )}
        >            
            { content }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root : {
        paddingVertical     : 10,
        paddingHorizontal   : 5,
    },
    inviteToSearch : {
        flex : 1,
        justifyContent : "center",
        flexDirection : "row",
        alignItems : "center",
        paddingLeft : 20,
    },
    EmptySet : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "center",
        paddingVertical : 30,
    },
});

ListComponent.propTypes = {
    games           : PropTypes.array.isRequired,
    onSelectGame    : PropTypes.func,
    goToSearch      : PropTypes.func.isRequired,
    onViewProfile   : PropTypes.func,
    onShare         : PropTypes.func,
};

export default ListComponent;