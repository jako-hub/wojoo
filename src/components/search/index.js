import React from 'react';
import { withSearch, withGames } from '../../providers';
import PropTypes from 'prop-types';
import Results from './Results';
import ShareGameModal from '../../commons/buttons/share-game-button/ShareGameModal';

/**
 * This component handles the items search.
 */
class SearchComponent extends React.Component {
    state = {
        loading : true,
        selectedGame : null,
    };
    componentDidMount() {
        this.fetchGames();
        if(this.props.myGames.length === 0)
            this.props.fetchMyGames(this.props.userCode); 
    }

    fetchGames() {
        this.setState({loading : true});
        this.props.fetchGames()
            .then(() => this.setState({loading : false,}))
            .catch(() => this.setState({loading : false}));
    }

    /**
     * This function aplies the filters to the search.
     */
    getFilteredList() {
        let elements = [...this.props.results];
        const {searchQuery} = this.props;
        if(searchQuery !== "") {
            elements = elements.filter(item => {
                const searchStr = 
                                searchQuery
                                    .toLowerCase()
                                    .replace(/\(/g, '\\(')
                                    .replace(/\)/g, '\\)');
                const regExp = new RegExp(`.*(${searchStr}).*`, "g");
                return `${item.nombre.toLowerCase()}`.match(regExp);
            });
        }
        return elements;
    }

    onSelectResult(item) {
        this.props.selectGame(item);
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("GameDetail", {prevRoute : currentRoute});
    }

    joinToGame(selectedGame) {
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("JoinToGame", {prevRoute : currentRoute, selectedGame});
    }

    refreshGames() {
        this.fetchGames();
    }

    goToCreate() {
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("CreateGame", {prevRoute : currentRoute});
    }

    onViewProfile(playerCode=0, playerAlias="") {
        this.props.navigation.navigate("PlayerProfile", {playerCode, playerAlias});
    }

    isInGame({codigo_juego}) {
        const gameFound = this.props.myGames.find(item => item.codigo_juego === codigo_juego);    
        return gameFound !== undefined;
    }

    onClose() {
        this.setState({
            selectedGame : null,
        });
    }

    onShare(selectedGame) {
        this.setState({
            selectedGame,
        });
    }

    render() {
        const {
            loading,   
            selectedGame,         
        } = this.state;
        const { 
            userCode,
        } = this.props;
        const results = this.getFilteredList() || [];
        return (
            <>
                <Results
                    userCode        = { userCode }
                    loading         = { loading  } 
                    results         = { results  }
                    isInGame        = { this.isInGame.bind(this)        }
                    onSelectItem    = { this.onSelectResult.bind(this)  }
                    onJoinToGame    = { this.joinToGame.bind(this)      }
                    onRefresh       = { () => this.refreshGames()       }
                    goToCreate      = { () => this.goToCreate()         }
                    onViewProfile   = { this.onViewProfile.bind(this)   }
                    onShare         = { this.onShare.bind(this)         }
                />
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

SearchComponent.propTypes = {
    results             : PropTypes.array,
    searchQuery         : PropTypes.string,
    fetchGames          : PropTypes.func,
    startLoading        : PropTypes.func,
    stopLoading         : PropTypes.func,
    onChangeQuery       : PropTypes.func,
    clearSelectedGame   : PropTypes.func,
    selectGame          : PropTypes.func,
    setSelectedGame     : PropTypes.func,
    navigation          : PropTypes.object.isRequired,
    myGames             : PropTypes.array,
    userCode            : PropTypes.any,

};

export default withSearch(withGames(SearchComponent));