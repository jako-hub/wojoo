const texts = {
    "home1"     : "",
    "my_games_title_1"      : "Mis juegos",
    "my_games_title_2"      : "Mis Juegos",
    "my_games_title_3"      : "Historico",
    "create_game_title_1"   : "Crear juego",
    "my_profile_title_1"    : "Mi perfil",
    "search_title_1"        : "Buscar",
};

export const _t = (key) => {
    if(texts[key]) return texts[key];
    return key;
};