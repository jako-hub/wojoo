import {
    SET_MY_GAMES,
    ADD_TO_MY_GAMES,
    SET_POSITIONS,
    SET_GAME_INVITATIONS,
    REMOVE_GAME_INVITATION,
} from '../actions/game.actions';

const defaultState = {
    myGames     : [],
    positions   : [],
    gameInvitations : [],
};

export default gameReducer = (state=defaultState, action) => {
    switch (action.type) {
        case SET_MY_GAMES: return ({
            ...state,
            myGames : action.games,
        });
        case ADD_TO_MY_GAMES : return ({
            ...state,
            myGames : [...state.myGames, action.game],
        });
        case SET_POSITIONS : return ({
            ...state,
            positions : action.positions,
        });
        case SET_GAME_INVITATIONS : return ({
            ...state,
            gameInvitations : action.invitations,
        });
        case REMOVE_GAME_INVITATION : return ({
            ...state,
            gameInvitations : state.gameInvitations.filter(item => item.codigo_juego_invitacion !== action.invitationCode),
        });
        default : return ({
            ...state,
        });
    }
};