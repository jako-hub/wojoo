import { Api } from "../../services/ApiService";
import endpoints from "../../configs/endpoints";
import { addMessage, consoleError } from "../../utils/functions";
import { startLoading, stopLoading,} from './global.actions';

export const SET_MY_FRIENDS                         = '[USER_DATA] SET_MY_FRIENDS';
export const SET_USER_DATA                          = '[USER_DATA] SET_USER_DATA';
export const SET_USER_VERIFIED                      = '[USER_DATA] SET_USER_VERIFIED';
export const SET_FRIENDSHIP_REQUESTS                = '[USER_DATA] SET_FRIENDSHIP_REQUESTS';
export const REMOVE_FRIENDSHIP_REQUEST              = '[USER_DATA] REMOVE_FRIENDSHIP_REQUEST';
export const SET_USER_FRIENDSHIP_REQUESTS_SENDED    = '[USER_DATA] SET_USER_FRIENDSHIP_REQUESTS_SENDED';
export const CLEAR_USER_DATA                        = '[USER_DATA] CLEAR_USER-DATA';
export const ADD_ADMIN_CLAN                         = '[USER_DATA] ADD_ADMIN_CLAN';
export const SET_ADMIN_CLANS                        = '[USER_DATA] SET_ADMIN_CLANS';
export const REMOVE_ADMIN_CLAN                      = '[USER_DATA] REMOVE_ADMIN_CLAN';
export const SET_CLANES                             = '[USER_DATA] SET_CLANES';
export const ADD_CLAN                               = '[USER_DATA] ADD_CLAN';
export const REMOVE_CLAN                            = '[USER_DATA] REMOVE_CLAN';

export const setClans = (clans) => ({
    type : SET_CLANES,
    clans,
});

export const addClan = (clan) => ({
    type : ADD_CLAN,
    clan,
});

export const removeClan = (code) => ({
    type : REMOVE_CLAN,
    code,
});

export const setAdminClans = (clans) => ({
    type : SET_ADMIN_CLANS,
    clans,
});

export const removeAdminClan = (code) => ({
    type : REMOVE_ADMIN_CLAN,
    code,
});

export const addAdminClan = (clan) => ({
    type : ADD_ADMIN_CLAN,
    clan,
});

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
/**
 * This function allows to fetch any user friends, the response can be store in redux or it can be
 * return to the component who invokes que function.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} playerCode 
 * @param {*} fromOther 
 */
export const fetchMyFriends = (playerCode, fromOther) => (dispatch) => (new Promise((resolve, reject) => {
    Api.doPost(endpoints.jugador.amigos, {
        jugador : playerCode,
    })
        .then(response => {
            const { error, error_controlado } = response;
            if(error || error_controlado) {
                addMessage("Error al consultar tus amigos");                
                consoleError("Error fetching friends: ", response);
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

/**
 * This function allows to fetch from api the current user friendship requests.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
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

/**
 * This function allows to fetch the current user requests sended.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
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

export const fetchPlayerClanes = () => async (dispatch, getState) => {
    const {session:{userCode}} = getState();
    const fetchData = async () => {
        try {
            const response = await Api.doPost(endpoints.clan.jugador, {
                jugador : userCode,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error inesperado al listar los clanes");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                dispatch(setClans(response));
            }
        } catch (response) {
            addMessage("Error al consultar los clanes del jugador");
            consoleError("Player clanes: ", response);
        }
    };
    return await fetchData();
};

export const fetchPlayerAdminClanes = () => async(dispatch, getState) => {
    const {session:{userCode}} = getState();
    const fetchData = async () => {
        try {
            const response = await Api.doPost(endpoints.clan.admin, {
                jugador : userCode,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error inesperado al listar los clanes");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                dispatch(setAdminClans(response));
                console.log("The api clans: ", response);
            }
        } catch (response) {
            addMessage("Error al consultar los clanes del jugador");
            consoleError("Admin clanes: ", response);
        }
    };
    return await fetchData();
};

/**
 * This function allows to save a new admin clan, it send the request to the server and
 * if succesful, then it stores the clan to the redux store.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
export const createAdminClan = ({name, photo={}, gameType}) => async (dispatch, getState) => {
    const {session:{userCode}} = getState();
    const fetchData = async () => {
        dispatch(startLoading());
        try {            
            const data = new FormData();
            if(photo) {
                const {type, uri, name} = photo;
                data.append("foto", {
                    name,
                    type,
                    uri,
                });
            }
            data.append("jugador", userCode);
            data.append("nombre", name);
            data.append("tipo_juego", gameType);

            const response = await Api.uploadFile(endpoints.clan.nuevo, data);
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error inesperado al guardar el clan");
                consoleError("Save clan", response);
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                // Todo reportar el clan guardado
                dispatch(addAdminClan(response));
                return true;
            } 
            return false;
        } catch (response) {
            addMessage("Error al consultar los clanes del jugador");
            consoleError("Admin clanes: ", response);
        } finally {
            dispatch(stopLoading());
        }
        return false;
    };
    return await fetchData();
}