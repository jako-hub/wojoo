import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import { withGames } from '../../providers';
import PendingGameItem from './PendingGameItem';
import { SimpleTouch } from '../../commons/touchables';

const ActionButton = ({onPress, title}) => (
    <SimpleTouch onPress = { onPress }>
        <View style = { styles.viewMore }>
            <Text style ={ styles.viewMoreText } note >{title}</Text>
        </View>
    </SimpleTouch>
);

/**
 * This component lists the pending games to close.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class PendingCloseGames extends React.Component {
    state = {
        displayMore : false,
    };

    componentDidMount() {
        this.fetchGames();
    }

    async fetchGames() {
        await this.props.fetchPendingCloseGames();
    }

    onPress(game) {
        alert(game.codigo_juego);
    }

    toggleViewMore() {
        this.setState({
            viewMore : !this.state.viewMore,
        });
    }

    render () {
        const {maxDisplayItems=2, displayIfNull, pendingGamesToClose=[]} = this.props;
        const {viewMore} = this.state;
        const totalGames = pendingGamesToClose.length;
        let games = [...pendingGamesToClose], others=0;
        if(!viewMore && totalGames > maxDisplayItems) {
            others = games.slice(maxDisplayItems).length;
            games = games.slice(0, maxDisplayItems);            
        }
        if(!displayIfNull && games.length === 0) return null;
        return (
            <View style = { styles.root }>
                {games.map((game, key) => (
                    <PendingGameItem 
                        key     = {`pending-game-item-${key}`   }
                        name    = { game.juego_nombre           }
                        dateTo  = { game.juego_fecha_hasta      }
                        onPress = { () => this.onPress(game)    }
                    />
                ))}
                {others > 0 && (
                    <ActionButton onPress = { () => this.toggleViewMore() } title = { `Ver ${others} más ` } />
                )}
                {viewMore && (
                    <ActionButton onPress = { () => this.toggleViewMore() } title = { `Ver menos` } />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {},
    viewMore : {
        paddingVertical : 10,
    },
    viewMoreText : {
        textAlign : "center",
    },
});

PendingCloseGames.propTypes = {
    displayIfNull   : PropTypes.bool,
    fetchPendingCloseGames: PropTypes.func,
    pendingGamesToClose      : PropTypes.array,
    maxDisplayItems         : PropTypes.number,
};


export default withGames(PendingCloseGames);