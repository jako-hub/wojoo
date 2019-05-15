import { startLoading, stopLoading } from './global.actions';
import { Api } from '../../services/ApiService';
import endpoints from '../../configs/endpoints';
import { consoleError } from '../../utils/functions';
export const SET_RESULTS = '[SEARCH] SET_RESULTS';
export const SET_RESULTS_FRIENDS = '[SEARCH] SET_RESULTS_FRIENDS';
export const SET_QUERY  = '[SEARCH] SET_QUERY';
export const SET_SELECTED_GAME = '[SEARCH] SET_SELECTED_GAME';
export const SELECT_GAME = '[SEARCH] SELECT_GAME';
export const CLEAR_SELECTED_GAME = '[SEARCH] CLEAR_SELECTED_GAME';

export const setResults = results => ({
    type : SET_RESULTS,
    results,
});

export const setFriends = results => ({
    type : SET_RESULTS_FRIENDS,
    results,
});

export const setQuery = query => ({
    type : SET_QUERY,
    query,
});

export const setSelectedGame = selectedGame => ({
    type : SET_SELECTED_GAME,
    selectedGame,
});

export const selectGame = selectedGame => ({
    type        : SELECT_GAME,
    openDetail  : true,
    selectedGame,
});

export const clearSelectedGame = () => ({
    type : CLEAR_SELECTED_GAME,
});

/***************************
 ***** Async functions *****
 ***************************/
/**
 * This function allows to fetch all user games.
 * @param code
 * @returns {function(*): (Promise<any> | Promise<*>)}
 */
export const fetchGames = () => (dispatch, getState) => (new Promise((resolve, reject) => {
    const {session:{userCode}} = getState();
    Api.doPost(endpoints.juego.buscar, {
        jugador : userCode,
    })
    .then(response => {
        const {error, error_controlado} = response;
        if(error || error_controlado) {
            reject(response);
            consoleError("Listing search results");
        } else {
            resolve(true);
            dispatch(setResults(response));            
        }
        //dispatch(stopLoading());        
    })
    .catch(response => {
        reject(repsonse);
        //dispatch(stopLoading());
    }); 
}));

export const fetchFriends = () => (dispatch) => (new Promise((resolve, reject) => {
    Api.doPost(endpoints.jugador.buscar, {})
    .then(response => {
        const {error, error_controlado} = response;
        if(error || error_controlado) {
            reject(response);
            consoleError("Listing search results");
        } else {
            resolve(true);
            dispatch(setFriends(response));
        }
        //dispatch(stopLoading());        
    })
    .catch(response => {
        reject(repsonse);
        //dispatch(stopLoading());
    }); 
}));

export const onChangeQueryString = text => dispatch => {
    dispatch(setQuery(text));
};