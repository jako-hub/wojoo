import endpoints from "../../configs/endpoints";
import { Api } from "../../services/ApiService";

/**
 * This file contains the global actions for global reducer.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @type {string}
 */
export const SET_VAR        = '[GLOBAL] SET_VARS';
export const SET_LOADING    = '[SET_LOADING] SET_LOADING';
export const ADD_NOTIFY     = '[GLOBAL] ADD_NOTIFY';
export const POP_NOTIFY     = '[GLOBAL] POP_NOTIFY';
export const REMOVE_NOTIFY  = '[GLOBAL] REMOVE_NOTIFY';
export const VIEW_NOTIFY    = '[GLOBAL] VIEW_NOTIFY';
export const SET_NEWS       = '[GLOBAL] SET_NEWS';

export const setVar = (key, value) => ({
    type : SET_VAR,
    key,
    value,
});

export const addNotify = (notify) => ({
    type : ADD_NOTIFY,
    notify,
});

export const popNotify = () => ({
    type : POP_NOTIFY,
});

export const removeNotify = (id, read=false) => ({
    type : REMOVE_NOTIFY,
    id,
    read,
});

export const viewNotify = ({ id }) => ({
    type : VIEW_NOTIFY,
    id,
});

export const setNews = (news=[]) => ({
    type : SET_NEWS,
    news,
});

/**
 * This function activates the loading process.
 */
export const startLoading = () => ({
    type    : SET_LOADING,
    loading : true,
});

/** 
 * This function stop the loading process
 */
export const stopLoading = () => ({
    type    : SET_LOADING,
    loading : false,
});

export const notify = notify => dispatch => {    
    dispatch(addNotify(notify));
};

export const fetchNews = () => (dispatch, getState) => (new Promise((resolve, reject) => {
    const {session:{userCode}} = getState();
    Api.doPost(endpoints.publicacion.lista, {
        jugador : userCode,
    })
        .then(response => {
            const { error, error_controlado } = response;            
            if(error || error_controlado) {
                addMessage("Error al consultar noticias");                
                reject(false);
            } else {
                dispatch(setNews(response));
                resolve(true);                
            }
        })
        .catch(response => {
            addMessage("Error al consultar noticias");                
            consoleError("List my friend requests", response);
        });
}));