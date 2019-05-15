import { Api } from "../../services/ApiService";
import endpoints from "../../configs/endpoints";
import { addMessage, consoleError } from "../../utils/functions";

export const SET_MY_FRIENDS = '[USER_DATA] SET_MY_FRIENDS';
export const SET_USER_DATA  = '[USER_DATA] SET_USER_DATA';
export const SET_USER_VERIFIED = '[USER_DATA] SET_USER_VERIFIED';
export const SET_FRIENDSHIP_REQUESTS = '[USER_DATA] SET_FRIENDSHIP_REQUESTS';
export const REMOVE_FRIENDSHIP_REQUEST = '[USER_DATA] REMOVE_FRIENDSHIP_REQUEST';
export const SET_USER_FRIENDSHIP_REQUESTS_SENDED = '[USER_DATA] SET_USER_FRIENDSHIP_REQUESTS_SENDED';
export const CLEAR_USER_DATA = '[USER_DATA] CLEAR_USER-DATA';

export const setMyFriends = (friends=[]) => ({
    type : SET_MY_FRIENDS,
    friends,
});

export const setFriendshipRequests = (requests) => ({
    type : SET_FRIENDSHIP_REQUESTS,
    requests,
});

export const removeFriendshipRequest = (id) => ({
    type : REMOVE_FRIENDSHIP_REQUEST,
    id
});

export const setUserData = (userData) => ({
    type : SET_USER_DATA,
    userData,
});

export const setVerified = (verified) => ({
    type : SET_USER_VERIFIED,
    verified,
});

export const clearUserData = () => ({
    type : CLEAR_USER_DATA
});

export const setUserFriendshipRequestsSended = (requests=[]) => ({
    type : SET_USER_FRIENDSHIP_REQUESTS_SENDED,
    requests,
});

/***************************
 ***** Async functions *****
 ***************************/
export const fetchMyFriends = (playerCode, fromOther) => (dispatch) => (new Promise((resolve, reject) => {
    Api.doPost(endpoints.jugador.amigos, {
        jugador : playerCode,
    })
        .then(response => {
            const { error, error_controlado } = response;
            if(error || error_controlado) {
                addMessage("Error al consultar tus amigos");                
                reject(false);
            } else {                
                if(!fromOther) {
                    dispatch(setMyFriends(response));
                }
                resolve(response);
            }
        })
        .catch(response => {
            addMessage("Error al consultar tus amigos");
            consoleError("List my friends", response);
        });
}));

export const fetchFriendshipRequest = () => (dispatch, getState) => (new Promise((resolve, reject) => {
    const {session:{userCode}} = getState();
    Api.doPost(endpoints.jugador_solicitud.pendiente, {
        jugador : userCode,
        tipo : 'responder'
    })
        .then(response => {
            const { error, error_controlado } = response;
            if(error || error_controlado) {
                addMessage("Error al consultar solicitudes de amistad");                
                reject(false);
                console.log(response);
            } else {
                dispatch(setFriendshipRequests(response));
                resolve(true);
            }
        })
        .catch(response => {
            addMessage("Error al consultar solicitudes de amistad");                
            consoleError("List my friend requests", response);
        });
}));

export const fetchUserSendedRequests = () => async (dispatch, getState) => {
    const {session:{userCode}} = getState();
    const fetchData = async () => {
        try {
            const response = await Api.doPost(endpoints.jugador_solicitud.envaidas, {
                jugador : userCode,
            });
            const {error, error_controlado} = response;
            if(error || error_controlado) {
                addMessage("Error al consultar sus solicitudes de amistad");
            } else {
                dispatch(setUserFriendshipRequestsSended(response));
                return response;
            }
        } catch (error) {
            addMessage("Error al consultar sus solicitudes de amistad");
            return false;
        }

    };
    return await fetchData();
};