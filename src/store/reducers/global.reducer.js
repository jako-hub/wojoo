import {
    SET_VAR,
    SET_LOADING,
    ADD_NOTIFY,
    REMOVE_NOTIFY,
    VIEW_NOTIFY,
    SET_NEWS,
} from '../actions/global.actions';
const defaultState = {
    someState       : false,
    loadingState    : false,
    notifications   : [
        //{id : 1, title : "my notify", message : "Hello world!", action : true, type : 'new-game', path_data : 50, path : "GameDetail"},
    ],
    news : [

    ],
};

export default globalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_VAR: return ({
            ...state,
            [action.key] : action.value,
        });
        case SET_LOADING : return ({
            ...state,
            loadingState : action.loading,
        });
        case ADD_NOTIFY : return ({
            ...state,
            notifications : [action.notify, ...state.notifications],
        });
        case REMOVE_NOTIFY : return ({
            ...state,
            notifications : state.notifications.map((item) => {
                if(item.id === action.id) {
                    item.removed = true
                    if(action.read) item.read = true;
                };
                return item;
            }),
        });
        case SET_NEWS : return ({
            ...state,
            news : action.news,
        });
        case VIEW_NOTIFY : return ({
            ...state,
            notifications : state.notifications.map((item) => {
                if(item.id === action.id) item.read = true;
                return item;
            }),
        });
        default : return ({
            ...state,
        });
    }
};