import {
    SET_SESSION_STACK,
    SET_SESSION_VAR,
    DEL_SESSION_VAR,
    SET_ALL_IN_SESSION,
    CLEAR_SESSION,
} from '../actions/session.actions';

const defaultState = {
    logged          : false,
    reading         : true,
    data            : null,
    firebaseData    : {},
};

/**
 * Session reducer, handles the application session states.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
export default sessionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SESSION_STACK : return {
            ...state,
            ...action.stack,
        };
        case SET_SESSION_VAR : return {
            ...state,
            [action.keyName] : action.value,
        };
        case DEL_SESSION_VAR :return {
            ...state,
            [action.keyName] : null,
        };
        case SET_ALL_IN_SESSION : return {
            ...state,
            ...action.data,
        };
        case CLEAR_SESSION : return {};
        default : return {...state};
    }
};