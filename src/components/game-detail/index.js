import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';
import {
    Toast,
} from 'native-base';
import ItemCard from './item-card';
import CommentsList from './CommentsList';
import { withApi, withGames } from '../../providers';
import endpoints from '../../configs/endpoints';
import { consoleError } from '../../utils/functions';
import Actions from './Actions';
import stylesPalette from '../../utils/stylesPalette';
import CommentGameComponent from '../comment-game';
import TeamsList from './TeamsList';
import TerminateGame from '../terminate-game';
import ShareGameModal from '../../commons/buttons/share-game-button/ShareGameModal';
import TabButtons from '../../commons/buttons/TabButtons';

/**
 * This component handles the game detail display.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 *
 * @class GameDetailComponent
 * @extends {React.Component}
 */
class GameDetailComponent extends React.Component {
    state = {        
        codigo_juego    : null,
        nombre          : null,
        jugadores       : 0,
        jugadores_confirmados : 0,
        fecha       : "",
        acceso      : "",
        escenario_nombre    : "",
        negocio_nombre      : "",
        jugador_seudonimo   : "",
        comentarios : [],
        detalles    : [],
        loadingComments : false,
        openComment     : true,
        allowJoin       : true,
        currentTab      : 0,
        openShare    : false,
        loading : false,
    };    

    constructor(props) {
        super(props);
        if(this.props.navigation.state.params.disallowJoin) {
            this.state.allowJoin = false;
        }
    }

    componentDidMount() {
        this.fetchGameInfo();
    }

    setCommentRef(node) {
        this.commentRef = node;
    }

    getTabOptions() {
        const { comentarios=[] } = this.state;
        const total = comentarios.length;
        return [
            {label : "Jugadores", icon : "users"},
            {label : `Comentarios ${total > 0? `(${total})` : ""}`, icon : "comments"},
        ];
    }

    /**
     * This funcion fetch the game information
     *
     * @memberof GameDetailComponent
     */
    async fetchGameInfo() {
        const {codigo_juego} = this.props.selectedGame;        
        this.setState({loadingComments : true, loading : true});
        try {
            const response = await this.props.doPost(endpoints.juego.detalle, {
                juego : codigo_juego,
            });
            const {error_controlado, error} = response;
            if(error_controlado || error) {
                Toast.show({text : "Ocurrió un error al obtener la información del juego (Detalle)"});
                this.setState({
                    loadingComments : false,
                    loading : false,
                });
            } else {
                const {detalles = [], equipos=[]} = response;
                const teamsBase = {};
                equipos.forEach(team => {
                    teamsBase[team.nombre] = [];
                });
                /*
                 * We preproccess the response to build a grouped details by team.
                 */
                const newDetails = detalles.reduce((buildingGroup, currentDetail) => {                    
                    const team = equipos.find(item => item.codigo_juego_equipo === currentDetail.codigo_equipo);
                    const key = team.nombre;
                    buildingGroup[key] = buildingGroup[key] || [];
                    buildingGroup[key].push(currentDetail);
                    return buildingGroup;
                }, teamsBase);
                response.detalles = newDetails;
                this.setState({
                    ...response,
                    detalles        : newDetails,
                    loadingComments : false,
                    loading : false,
                });
            }
        } catch(response) {
            consoleError("List of comments", response);
            Toast.show({text : "Error al obtener comentarios"});
            this.setState({
                loadingComments : false,
                loading : false,
            });
        }
    }

    /**
     * This function toggles the comment visualization.
     *
     * @memberof GameDetailComponent
     */
    toggleComment() {
        const focusOnInput = () => {
            setTimeout(() => {
                this.commentRef._root.focus();            
            }, 1200);
        };
        if(this.currentTab === 1) {
            this.setState({
                openComment : !openComment,
            }, () => {
                if(this.state.openComment) focusOnInput();
            });
        } else {
            this.setState(({openComment, currentTab}) => ({
                openComment : true,
                currentTab  : !openComment? 1 : currentTab,
            }), () => {
                if(this.state.openComment) focusOnInput();
            });
        }
    }

    /**
     * This function is triggered when a comment is saved.
     *
     * @param {*} comment
     * @memberof GameDetailComponent
     */
    onSaveComment(comment) {
        this.setState(({comentarios}) => ({
            comentarios        : [ comment, ...comentarios ],
            openComment     : false,
        }));
    }

    /**
     * This function sends to the Join game screen.
     *
     * @param {*} selectedGame
     * @memberof GameDetailComponent
     */
    onJoinToGame(selectedGame) {
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("JoinToGame", {prevRoute : currentRoute, selectedGame});
    }

    onViewProfile(playerCode, playerAlias) {    
        this.props.navigation.navigate("PlayerProfile", {playerCode, playerAlias});
    }

    onViewHostProfile() {
        const {codigo_jugador, jugador_seudonimo} = this.state;
        this.props.navigation.navigate("PlayerProfile", {playerCode : codigo_jugador, playerAlias : jugador_seudonimo});
    }

    isInGame() {
        return this.props.userCode === this.state.codigo_jugador;
    }

    onClose() {
        this.setState({
            openShare : false,
        });
    }


    onShareGame() {
        this.setState({
            openShare : true,
        });
    }

    onChangeTab(currentTab) {
        this.setState({
            currentTab,
        });
    }

    onRefreshData() {
        this.fetchGameInfo();  
    }

    render() {
        const {selectedGame, userCode} = this.props;
        const {
            codigo_juego,
            comentarios,
            loadingComments,
            detalles,
            allowJoin,
            currentTab,
            jugador_seudonimo,
            openShare,
            loading,
        } = this.state;
        const isInGame = this.isInGame();
        return (
            <>
            <View style={styles.root}>
                <ScrollView
                    refreshControl = {
                        <RefreshControl 
                            onRefresh = { this.onRefreshData.bind(this) }
                            refreshing = { loading }
                        />
                    }
                >
                    {this.state.nombre && (
                        <ItemCard 
                            game = {this.state}
                        />
                    )}
                    <Actions 
                        onComment = {() => this.toggleComment()}
                        onAdd     = {() => this.onJoinToGame(selectedGame)}
                        canJoin   = { allowJoin }
                        user      = { jugador_seudonimo }
                        onViewProfile = {() => this.onViewHostProfile()}
                        gameCode    = { codigo_juego }
                        isInGame    = { isInGame }
                        onShareGame = { () => this.onShareGame() }
                    />                    
                    <View styles = { {flex : 1,} }>
                        {isInGame && (
                            <TerminateGame 
                                gameCode = { codigo_juego }
                                teams    = { detalles     }
                            />
                        )}

                    </View>
                    <TabButtons 
                        currentTab  = { currentTab              }
                        buttons     = { this.getTabOptions()    }
                        onChange    = { this.onChangeTab.bind(this) }
                    />
                    {currentTab === 0 && (
                        <TeamsList 
                            onViewProfile   = { this.onViewProfile.bind(this) }
                            teams           = { detalles }
                            playerCode      = { userCode }
                        />
                    )}
                    {currentTab === 1 && (
                        <>
                            <CommentGameComponent 
                                setCommentRef = { this.setCommentRef.bind(this) }
                                onClose       = { () => this.toggleComment()    }
                                gameCode      = { selectedGame.codigo_juego     }
                                onSaveComment = { this.onSaveComment.bind(this) }
                            />
                            <CommentsList 
                                comments = { comentarios }
                                loading  = { loadingComments }
                            />
                        </>
                    )}
                </ScrollView>
            </View>
            {openShare && (
                <ShareGameModal 
                    open    = { openShare   } 
                    game    = { selectedGame            }
                    onClose = {() => this.onClose()     } 
                />
            )}
            </>
        );
    }
}

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flex : 1,
        paddingVertical     : 10,
        justifyContent          : "center",
    },
    tabDefault : {
        backgroundColor : "#FFF",
        shadowColor : "#eee121"
    },
    tabActive : {
        backgroundColor : "#e0e0e0",
    },
    tabActiveText : {
        color : "#000",
    },
    tabText : {
        color : "#bdbdbd"
    },
    tabUnderLine : {
        backgroundColor : palette.primary.color,
    },
});

GameDetailComponent.propTypes = {
    navigation : PropTypes.any,
    selectedGame : PropTypes.shape({
        "codigo_juego"          : PropTypes.any,
        "nombre"                : PropTypes.string,
        "jugadores"             : PropTypes.number,
        "jugadores_confirmados" : PropTypes.number,
        "fecha"                 : PropTypes.string,
        "acceso"                : PropTypes.string,
        "escenario_nombre"      : PropTypes.string,
        "negocio_nombre"        : PropTypes.string,
        "jugador_seudonimo"     : PropTypes.string,
    }),
    doPost          : PropTypes.func,
    canJoin         : PropTypes.bool,
    onRefresh       : PropTypes.func,
    userCode        : PropTypes.any,
    myGames         : PropTypes.array,
};

export default withApi(withGames(GameDetailComponent));