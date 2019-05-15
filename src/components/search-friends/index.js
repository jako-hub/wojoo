import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { withSearch, withUserData, withApi } from '../../providers';
import FriendsList from './FriendsList';
import { consoleError, addMessage } from '../../utils/functions';
import endpoints from '../../configs/endpoints';
import FriendshipSuggestion from '../my-profile/friendship-suggestion';
import { EmptyObject } from '../../commons/others';

/**
 * This component handles the friends search.
 */
class SearchFriends extends Component {
    state = {
        loading : true,
    };
    componentDidMount() {
        this.fetchFriends();
    }

    fetchFriends() {
        this.setState({
            loading : true,
        });
        this.props.fetchFriends()
            .then(() => {
                this.setState({ loading : false });
            })
            .catch(() => {
                this.setState({ loading : false });
            })
    }

    onRefresh() {
        this.fetchFriends();
    }

    renderEmpty() {
        return (
            <View style = { styles.emptyRoot }>
                <EmptyObject 
                    message = "No hay usuarios que mostrar"
                    icon = "users"
                />
            </View>
        );
    }

    getFilteredFriends() {
        const {resultsFriends, searchQuery, userCode} = this.props;
        let filteredData = [...resultsFriends];
        filteredData = filteredData.filter(item => item.codigo_jugador !== userCode );
        filteredData = filteredData.filter(item => !this.isInFriends(item.codigo_jugador));
        if(searchQuery) {
            filteredData = filteredData.filter(item => {
                const regExp = new RegExp(`.*(${searchQuery.toLowerCase()}).*`, "g");
                return `${item.nombre_corto.toLowerCase()}`.match(regExp) || `${item.seudonimo.toLowerCase()}`.match(regExp);
            });
        }
        return filteredData;
    }

    isInFriends(userCode) {
        const friend = this.props.friends.find(item => item.codigo_jugador_amigo === userCode);
        return Boolean(friend);
    }

    sendedRequest(userCode) {
        const request = this.props.friendshipRequestsSended.find(item => item.codigo_jugador === userCode);
        return request;
    }

    onRequestFriendship(friend) {
        
    }

    onViewProfile({seudonimo:playerAlias, codigo_jugador:playerCode}) {
        const {navigation} = this.props;
        navigation.navigate("PlayerProfile", {playerCode, playerAlias});
    }

    async onCancelRequest({codigo_jugador}) {
        const request = this.props.friendshipRequestsSended.find(item => item.codigo_jugador === codigo_jugador);
        const {startLoading, stopLoading} = this.props;
        startLoading();
        try {
            const response = await this.props.doPost(endpoints.jugador_solicitud.cancelar, {
                solicitud : request.codigo_jugador_solicitud
            });
            const {error, error_controlador} = response;
            if(error || error_controlador) {
                addMessage("Error al cancelar la solicitud");
            } else {
                await this.props.fetchUserSendedRequests();
                addMessage("Se canceló la solicitud de amistad.");
            }
        } catch (err) {
            consoleError("Cancel friendship request", err);
            addMessage("Error al cancelar la solicitud");
            
        } finally {
            stopLoading();
        }
    }

    render() {
        const { loading } = this.state;
        const { navigation } = this.props;
        const resultsFriends = this.getFilteredFriends();
        const totalFriends = resultsFriends.length;
        return (
            <>            
            <ScrollView
                refreshControl = {
                    <RefreshControl 
                        refreshing = { loading }
                        onRefresh = { () => this.onRefresh() }
                    />
                }
            >
                <FriendshipSuggestion onlyIfResults navigation = { navigation } />  
                {totalFriends === 0 && this.renderEmpty() }
                {totalFriends > 0 && (
                    <FriendsList 
                        friends = {resultsFriends}
                        onViewProfile = {this.onViewProfile.bind(this)}
                        onRequestFriendship = {this.onRequestFriendship.bind(this)}
                        sendedRequest = {this.sendedRequest.bind(this)}
                        onCancel = {this.onCancelRequest.bind(this)}
                    />
                )}
            </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    root : {},
    emptyRoot : {
        paddingVertical : 20,
    },
});

SearchFriends.propTypes = {
    fetchFriends        : PropTypes.func,
    resultsFriends      : PropTypes.array,
    searchQuery         : PropTypes.string,
    navigation          : PropTypes.any,
    userCode            : PropTypes.any,
    friends             : PropTypes.array,
    friendshipRequestsSended : PropTypes.array,
};

export default withApi(withSearch(withUserData(SearchFriends)));