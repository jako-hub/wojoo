import endpoints from "../../configs/endpoints.js";
import { startLoading, stopLoading, } from "./global.actions";
import { Api } from "../../services/ApiService.js";
import { addMessage, consoleError } from "../../utils/functions.js";

export const SET_MY_GAMES       = '[GAME] SET_MY_GAMES';
export const ADD_TO_MY_GAMES    = '[GAME] ADD_TO_MY_GAMES';
export const SET_POSITIONS      = '[GAME] SET_POSITIONS';
export const SET_GAME_INVITATIONS = '[GAME] SET_GAME_INVITATIONS';
export const REMOVE_GAME_INVITATION = '[GAME] REMOVE_GAME_INVITATION';
export const SET_PENDING_CLOSE_GAMES = '[GAME] SET_PENDING_CLOSE_GAMES';
export const REMOVE_PENDING_CLOSE_GAME = '[GAME] REMOVE_PENDING_CLOSE_GAME';
// export const UPDATE_GAME = '[GAME] UPDATE_GAME';

export const setGames = (games=[]) => ({
    type : SET_MY_GAMES,
    games,
});

export const addToMyGames = (game={}) => ({
    type : ADD_TO_MY_GAMES,
    game,
});

export const setPositions = (positions=[]) => ({
    type : SET_POSITIONS,
    positions,
});

export const setGameInvitations = (invitations) => ({
    type : SET_GAME_INVITATIONS,
    invitations,
});

export const removeGameInvitation = invitationCode => ({
    type : REMOVE_GAME_INVITATION,
    invitationCode,
});

export const setPendingCloseGames = games => ({
    type : SET_PENDING_CLOSE_GAMES,
    games : games,
});

export const removePendingCloseGame = gameCode => ({
    type : REMOVE_PENDING_CLOSE_GAME,
    gameCode,
});

/***************************
 ***** Async functions *****
 ***************************/
/**
 * This function allows to fetch all user games.
 * @param code
 * @returns {function(*): (Promise<any> | Promise<*>)}
 */
export const fetchMyGames = (jugador=0) => (dispatch) => (new Promise((resolve, reject) => {
    Api.doPost(endpoints.juego.jugador, {
        jugador,
    })
    .then(response => {        
        const {error, error_controlado} = response;
        if(error || error_controlado) {
            addMessage("Ocurrió un error al listar los juegos");
            consoleError("Listing my games", response);
            reject(false);
        } else {            
            dispatch(setGames(response));
            resolve(true);
        }        
    })
    .catch(response => {
        reject(response);
    }); 
}));

export const fetchPositions = () => (dispatch) => (new Promise((resolve, reject) => {
    dispatch(startLoading());
    Api.doPost(endpoints.posicion.lista, {})
    .then(response => {
        resolve(true);
        dispatch(setPositions(response));
        dispatch(stopLoading());
    })
    .catch(response => {
        reject(response);
        dispatch(stopLoading());
    }); 
}));

export const onChangeQueryString = text => dispatch => {
    dispatch(setQuery(text));
};

/**
 * This function allows to fetch all game invitations.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
export const fetchGameInvitations = () => async (dispatch, getState) => {
    const {session:{userCode}} = getState();
    const fetchData = async () => {
        const response = await Api.doPost(endpoints.juego.invitaciones, {
            jugador : userCode,
        });  
        const {error, error_controlado} = response;
        if(error || error_controlado) {
            consoleError("Listing invitation", response);
        } else {
            dispatch(setGameInvitations(response));
        }
    };
    return await fetchData();
}

/**
 * This function allows to cancel a game invitation
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} invitationCode 
 */
export const rejectGameInvitation = (invitationCode) => async (dispatch) => {
    const sendRequest = async () => {
        const response = await Api.doPost(endpoints.juego.rechazarInvitacion, {
            invitacion : invitationCode,
        });
        const {error, error_controlado} = response;
        if(error || error_controlado) {
            consoleError("Rejecting invitation", response);
        } else {
            dispatch(removeGameInvitation(invitationCode));
        }
    };
    return await sendRequest();
};

/**
 * This function allows to list the games that need to be closed.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
export const fetchPendingCloseGames = () => async (dispatch, getState) => {
    const {session:{userCode}} = getState();
    const sendRequest = async () => {
        const response = await Api.doPost(endpoints.juego.pendientesCierre, {
            jugador : userCode,
        });
        const {error, error_controlado} = response;
        if(error) {
            addMessage("Ocurrió un error inesperado");
        } else if(error_controlado) {
            addMessage(error_controlado);
        } else {
            dispatch(setPendingCloseGames(response));
        }
    };
    return await sendRequest();
};