import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {
    Container,
} from 'native-base';
import {_t} from "../../configs/dictionary";
import stylesPalette from "../../utils/stylesPalette";
import ListMyGamesComponent from './my-games-list';
import {withGames, withSearch} from "../../providers";
import ShareGameModal from '../../commons/buttons/share-game-button/ShareGameModal';

/**
 * This component allows to handle the user games
 * @author Jorge Alejandro Quiroz Serna
 */
class MyGamesComponent extends React.Component {
    state = {
        currentTab  : 0,
        games       : [],
        loading     : false,
        selectedGame : null,
        openShare : false,
    };

    componentDidMount() {
        this.fetchGames();
    }

    /**
     * This function request the user games to the API.
     */
    fetchGames() {
        this.setState({loading : true});
        this.props.fetchMyGames(this.props.userCode)
            .then(() => this.setState({loading : false}))
            .catch(() => this.setState({loading : false}));
    }

    /**
     * This function send the user to see a game detail.
     *
     * @param {*} selectedGame
     * @memberof MyGamesComponent
     */
    onSelectGame(selectedGame) {
        this.props.selectGame(selectedGame);
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("GameDetail", {prevRoute : currentRoute, disallowJoin : true});
    }

    goToSearch() {
        this.props.navigation.navigate("Search");
    }

    onViewProfile({juego_codigo_jugador=0, jugador_seudonimo=""}) {
        this.props.navigation.navigate("PlayerProfile", {playerCode : juego_codigo_jugador, playerAlias : jugador_seudonimo});
    }

    onRefresh() {
        this.fetchGames();
    }

    onShareGame(selectedGame) {
        this.setState({
            selectedGame,
        });
    }

    onClose() {
        this.setState({
            selectedGame : null,
        });
    }

    render() {
        const { myGames=[] } = this.props;
        const {
            selectedGame,
        } = this.state;
        return (
            <>
                <Container>
                    <ListMyGamesComponent
                        games        = { myGames }
                        onSelectGame = { this.onSelectGame.bind(this)   }
                        goToSearch   = { this.goToSearch.bind(this)     }
                        onViewProfile= { this.onViewProfile.bind(this)  }
                        onRefresh    = { () => this.onRefresh()         }
                        loading      = { this.state.loading             }
                        onShare      = { this.onShareGame.bind(this)    }
                    />
                </Container>
                {selectedGame && (
                    <ShareGameModal 
                        open    = { Boolean(selectedGame)   } 
                        game    = { selectedGame            }
                        onClose = {() => this.onClose()     } 
                    />
                )}
            </>
        );
    }
}

const palette = stylesPalette();
const styles = StyleSheet.create({
    tab : {
        backgroundColor : palette.primary.color,
    },
    tabActive : {
        backgroundColor : palette.primary.color,
    },
});

MyGamesComponent.propTypes = {
    navigation      : PropTypes.object.isRequired,
    fetchMyGames    : PropTypes.func,
    myGames         : PropTypes.array,
    userCode        : PropTypes.any,
};

export default withGames(withSearch(MyGamesComponent));