import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { withUserData, withApi } from '../../../providers';
import { LoadingSpinner } from '../../../commons/loaders';
import RequestItem from './RequestItem';
import endpoints from '../../../configs/endpoints';
import { addMessage, consoleError } from '../../../utils/functions';

/**
 * This component renders and handles the friend suggestions.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class FriendshipSuggestion extends React.Component {
    state = {
        loading     : true,
        suggestions : [],
    };

    componentDidMount() {        
        this.fetchRequests();
    }

    async fetchRequests() {
        this.setState({loading : true});
        const {
            friendshipRequests=[], 
            friendshipRequestsSended=[],
            fetchFriendshipRequest,
            fetchUserSendedRequests,
        } = this.props;
        if(friendshipRequests.length === 0) await fetchFriendshipRequest();
        if(friendshipRequestsSended.length === 0) await fetchUserSendedRequests();
        await this.fetchSuggestions();
        this.setState({loading : false});
    }

    /**
     * This function allows to fetch the current suggestions.
     */
    async fetchSuggestions() {
        this.setState({loading : true});
        const {doPost, userCode:jugador} = this.props;
        let suggestions = [];
        try {
            const response = await doPost(endpoints.jugador_solicitud.sugerencias, {
                jugador,
            });
            const {error, error_controlado} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al consultar las sugerencias de amistad");
                consoleError("Fetching suggestions: ", response);
            } else {                
                suggestions = response.filter(item => !this.isInSended(item.codigo_jugador));
            }
        } catch(err) {
            consoleError("Fetching suggestions: ", err);
            addMessage("Ocurrió un error al consultar las sugerencias de amistad");
        } finally {
            this.setState({
                loading : false,
                suggestions,
            });
        }
    }


    /**
     * 
     * @param {*} param0 
     */
    onViewProfile({codigo_jugador:playerCode, jugador_seudonimo:playerAlias}) {
        if(this.props.navigation) {
            this.props.navigation.navigate("PlayerProfile", {playerCode, playerAlias});
        }
    }

    onRequestDone =  (playerCode) => {
        setTimeout(() => {
            this.setState(({suggestions}) => ({
                suggestions : suggestions.filter(item => item.codigo_jugador !== playerCode),
            }));
        }, 200);
    }

    isInSended(playerCode) {
        const {friendshipRequestsSended=[]} = this.props;
        const foundItem = friendshipRequestsSended.find(item => item.codigo_jugador === playerCode);
        return Boolean(foundItem);
    }

    renderList() {
        const {suggestions=[]} = this.state;
        let suggestionsList = [...suggestions];        
        const totalSuggestions = suggestionsList.length;
        if(totalSuggestions === 0) return (
            <View style = { styles.empty }>
                <Text note >No hay sugerencias de amistad</Text>
            </View>
        );
        return (
            <ScrollView
                horizontal
            >
                <View style = { styles.list }>
                    {suggestionsList.map((item, key) => (
                        <RequestItem 
                            key = { `friendship-suggestion-item-list-${key}-${item.codigo_jugador_solicitud}` }
                            suggestion = { item }                            
                            onViewProfile = { () => this.onViewProfile(item) }
                            onRequestDone = { this.onRequestDone.bind(this) }
                            smallPeresentation = { this.props.small }
                        />
                    ))}
                </View>
            </ScrollView>
        );
    }

    renderLoader() {
        return (
            <View style = { styles.loader }>
                <LoadingSpinner />
            </View>
        );
    }

    render() {
        const {loading, suggestions} = this.state;        
        const {onlyIfResults, small} = this.props;
        let content = null;
        const total = suggestions.length;
        if(loading) {
            return null;
        } else if(total === 0 && onlyIfResults) {
            return null;
        } else {
            content = this.renderList();
        }        
        return (
          <View style = {styles.root}>
                <View style = { styles.header }>
                    <Text style = { styles.headerText }>
                        {small? "Quizá conoces a" : "Sugerencias de amistad"}
                    </Text>
                </View>
              {content}
          </View>  
        );
    }
}

const styles = StyleSheet.create({
    root : {
        
    },
    list : {
        flexDirection : "row",
        justifyContent : "flex-start",
        height : 150,
    },
    header : {
        backgroundColor : "#f7f7f7",
        padding         : 15,
    },
    headerText : {
        textAlign : "center",
        color : "#707070",
    },
    empty : {
        paddingVertical : 15,
        justifyContent  : "center",
        alignItems      : "center",
    },
    buttonHide : {alignItems : "center", flexDirection : "row", justifyContent : "center"}
});

FriendshipSuggestion.propTypes = {
    navigation                  : PropTypes.any.isRequired,
    maxResults                  : PropTypes.number,
    doPost                      : PropTypes.func,
    startLoading                : PropTypes.func,
    stopLoading                 : PropTypes.func,
    onlyIfResults               : PropTypes.bool,
    userCode                    : PropTypes.number,
    friendshipRequestsSended    : PropTypes.array,
    fetchUserSendedRequests     : PropTypes.func,
    friendshipRequests          : PropTypes.array,
    fetchFriendshipRequest      : PropTypes.func,
    small                       : PropTypes.bool,
};

export default withApi(withUserData(FriendshipSuggestion));