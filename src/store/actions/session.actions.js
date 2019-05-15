import {readSession, writeInSession, writeAllInSession} from "../../services/SessionService";
import {startLoading, stopLoading} from './global.actions';
import AsynStorageService, {SESSION} from "../../services/AsyncStorageService";
import { consoleInfo, consoleError } from "../../utils/functions";
import { setVerified, clearUserData, setUserData } from "./userData.actions";

export const SET_SESSION_VAR = '[SESSION] SET_SESSION_VAR';
export const DEL_SESSION_VAR = '[SESSION] DEL_SESSION_VARS';
export const SET_SESSION_STACK = '[SESSION] SET_SESSION_STACKS';
export const SET_ALL_IN_SESSION = '[SESSION] SET_ALL_IN_SESSION';
export const CLEAR_SESSION = '[SESSION] CLEAR_SESSION';

/**
 * This action allows to set the entire redux stack.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param stack
 * @returns {{stack: *, type: string}}
 */
export const setSessionStack = (stack) => ({
    type : SET_SESSION_STACK,
    stack,
});

export const clearSession = () => ({
    type : CLEAR_SESSION,
});


/**
 * This action allows to set a variable inside the redux stack.
 * @param keyName
 * @param value
 * @returns {{keyName: *, type: string, value: *}}
 */
export const  setSessionVar = (keyName, value) => ({
    type : SET_SESSION_VAR,
    keyName,
    value,
});

/**
 * This function allows to delete a position from the redux session stack.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param keyName
 * @returns {{keyName: *, type: string}}
 */
export const  delSessionVar = (keyName) => ({
    type : DEL_SESSION_VAR,
    keyName,
});

/**
 * This function set all the states in session.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param data
 * @returns {{data: *, type: string}}
 */
export const setAllSessionVars = (data) => ({
    type : SET_ALL_IN_SESSION,
    data,
});


/*******************************************************************************
 ********************           Async functions             ********************
 *******************************************************************************/

/**
 * This function allows to initialize the application session.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @returns {Function}
 */
export const initializeSession = () => {    
    return (dispatch, getState) => {
        dispatch(startLoading());
        const {global:{loading}} = getState();
        readSession()
            .then(session => {
                // First we read the session from the async storage,
                // if the when the session read is done, then we set the reading state to false
                session.reading = false;
                const userInfo = session.user_info || {};
                dispatch(setSessionStack(session)); // Then we set the session stack to the main redux state.
                dispatch(stopLoading());
                dispatch(setUserData({photo : userInfo.foto}));
            })
            .catch(error => {
                console.log("Error : ", error);
                dispatch(stopLoading());
            });
    };
};

/**
 * This function allows to write or update in session a key.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param key
 * @param value
 * @returns {Function}
 */
export const sessionWrite = (key, value) => {
    return (dispatch) => {
        writeInSession(key, value)
            .then((saved) => {
                if(saved) {
                    dispatch(setSessionVar(key, value));
                } else {
                    console.error("could not save the session var");
                }
            })
            .catch((response) => {
                console.error("Error while saving the session: ", response);
            })
    };
};

/**
 * This function allows to write vars in session.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param data
 * @returns {Function}
 */
export const sessionWriteAll = (data) => {
    return (dispatch) => {
        writeAllInSession(data)
            .then((saved) => {
                if(saved) {
                    dispatch(setAllSessionVars(data));
                } else {
                    console.error("could not save the session var");
                }
            })
            .catch((response) => {
                console.error("Error while saving the session: ", response);
            })
    };
};

export const logout = (navigation) => {
    return (dispatch) => {
        dispatch(clearSession());
        AsynStorageService.clearEntity(SESSION)
            .then(() => {
                if(navigation) navigation.navigate("Register");
                dispatch(setVerified(false));
                clearUserData();
            })
            .catch(response => {
                consoleError('Error loginout', response);
            });
        
    };
};

export const login = ({user, imei, userCode, crearJuego}) => dispatch => (new Promise((resolve, reject) => {
    writeAllInSession({
        user, imei, logged : true, userCode, crearJuego
    })
        .then((saved) => {
            if(saved) {
                dispatch(setAllSessionVars({
                    logged : true,
                    user,
                    imei,
                    userCode,
                    crearJuego,
                }));
                resolve();
            } else {
                consoleInfo("could not save the session var (Login)");
                reject(false);
            }
        })
        .catch((response) => {
            consoleInfo("Error while saving the session (Login): ", response);
            reject(response);
        })
}));