import {
    SET_MY_FRIENDS,   
    SET_USER_DATA,
    SET_USER_VERIFIED,
    SET_FRIENDSHIP_REQUESTS,
    REMOVE_FRIENDSHIP_REQUEST,
    SET_USER_FRIENDSHIP_REQUESTS_SENDED,
    CLEAR_USER_DATA,
} from '../actions/userData.actions';

const defaultState = {
    friends  : [],
    friendshipRequests : [],
    friendshipRequestsSended : [],
    photo    : null,
    verified : false,
    moneyPoints : 0,
};

export default gameReducer = (state=defaultState, action) => {
    switch (action.type) {       
        case SET_MY_FRIENDS : return ({
            ...state,
            friends : action.friends,
        });
        case SET_USER_DATA : return ({
            ...state,
            ...action.userData,
        });
        case CLEAR_USER_DATA : return defaultState;
        case SET_USER_VERIFIED : return ({
            ...state,
            verified : action.verified,
        });
        case SET_FRIENDSHIP_REQUESTS : return ({
            ...state,
            friendshipRequests : action.requests,
        });
        case REMOVE_FRIENDSHIP_REQUEST : return ({
            ...state,
            friendshipRequests : state.friendshipRequests.filter(item => item.codigo_jugador_solicitud !== action.id),
        });
        case SET_USER_FRIENDSHIP_REQUESTS_SENDED : return ({
            ...state,
            friendshipRequestsSended : action.requests,
        });
        default : return ({
            ...state,
        });
    }
};