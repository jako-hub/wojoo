import {
    SET_MY_FRIENDS,   
    SET_USER_DATA,
    SET_USER_VERIFIED,
    SET_FRIENDSHIP_REQUESTS,
    REMOVE_FRIENDSHIP_REQUEST,
    SET_USER_FRIENDSHIP_REQUESTS_SENDED,
    CLEAR_USER_DATA,
    ADD_CLAN,
    SET_CLANES,
    REMOVE_CLAN,
    ADD_ADMIN_CLAN,
    SET_ADMIN_CLANS,
    REMOVE_ADMIN_CLAN,
    SET_CLAN_INVITATIONS,
    REMOVE_CLAN_INVITATION,
} from '../actions/userData.actions';

const defaultState = {
    friends                     : [],
    friendshipRequests          : [],
    friendshipRequestsSended    : [],
    clans                       : [],
    adminClans                  : [],
    clanInvitations             : [],
    photo                       : null,
    verified                    : false,
    moneyPoints                 : 0,
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
        case SET_CLANES : return ({
            ...state,
            clans : action.clans
        });
        case REMOVE_CLAN : return ({
            ...state,
            clans : state.clans.filter(item => item.codigo_clan !== action.code),
        });
        case ADD_CLAN : return ({
            ...state,
            clans : [...state.clans, action.clan],
        });
        case SET_ADMIN_CLANS : return ({
            ...state,
            adminClans : action.clans,
        });
        case ADD_ADMIN_CLAN : return ({
            ...state,
            adminClans : [action.clan, ...state.adminClans],
        });
        case REMOVE_ADMIN_CLAN : return ({
            ...state,
            adminClans : state.adminClans.filter(item => item.codigo_clan !== action.code),
        });
        case SET_CLAN_INVITATIONS : return ({
            ...state,
            clanInvitations : action.invitations,
        });
        case REMOVE_CLAN_INVITATION : return ({
            ...state,
            clanInvitations : state.clanInvitations.filter(item => item.codigo_jugador_clan !== action.code),
        });
        default : return ({
            ...state,
        });
    }
};