import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import { PrettyButton } from '../../commons/forms';
import ModalTerminate from './ModalTerminate';
import { withApi, withGames } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';
class TerminateGame extends React.Component {
    state = {
        openModalTerminate : false,
        players : [],
    };

    constructor(props) {
        super(props);
        this.initializeTeams();
    }

    initializeTeams() {
        const teamNames = Object.keys(this.props.teams);
        const teams = this.props.teams;
        const players = [];
        teamNames.forEach((team) => {
            const teamPlayers = teams[team];
            if(teamPlayers.length > 0) {
                teamPlayers.forEach((player) => {
                    player.attended = true;
                    players.push(player);
                });
            }
        });

        this.state.players = players;
    }

    toggleModal() {
        this.setState({
            openModalTerminate : !this.state.openModalTerminate,
        });
    }
    
    onChangePlayer({codigo_jugador}) {
        this.setState(({players}) => ({
            players : players.map(player => {
                if(player.codigo_jugador === codigo_jugador) {
                    player.attended = !player.attended;
                }
                return player;
            })
        }));
    }

    calculateAttendies() {
        let attendance = 0, noAttendance = 0;
        if(this.state.players.length > 0) {
            this.state.players.forEach(player => {
                if(player.attended) attendance ++;
                else noAttendance ++;
            });
        }        
        return {
            attendance,
            noAttendance, 
        };
    }

    async onSubmit() {
        const noAttendance = [];
        const {gameCode:juego} = this.props;
        if(this.state.players.length > 0) {
            this.state.players.forEach(player => {
                if(!player.attended) noAttendance.push(player.codigo_juego_detalle);
            });
        }
        this.props.startLoading();
        try {
            const response = await this.props.doPost(endpoints.juego.cerrar, {
                juego,
                juegos_detalles : noAttendance,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error al cerrar el juego");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {                
                addMessage("Se ha cerrado el juego exítosamente");
                if(this.props.onTerminate) this.props.onTerminate();
                this.props.removePendingCloseGame(juego);
            }
            this.toggleModal();
        } catch(response ) {
            
            consoleError("Closing game: ", response);
            addMessage("Ocurrió un error al cerrar el juego");
        } finally {
            this.props.stopLoading();
        }
    }

    render(){
        const {
            openModalTerminate,
            players,
        } = this.state;
        const {
            teams = [],
        } = this.props;
        const {
            attendance,
            noAttendance,
        } = this.calculateAttendies();
        return (
            <>
            <PrettyButton onPress = { () => this.toggleModal() }>
                Terminar
            </PrettyButton>  
            {openModalTerminate && (
                <ModalTerminate
                    open = { openModalTerminate }
                    onClose = { () => this.toggleModal() }
                    teams = { teams }
                    onValueChange = { this.onChangePlayer.bind(this) }
                    players = {players}
                    onSubmit = {() => this.onSubmit() }
                    attendance = { attendance }
                    noAttendance = { noAttendance }
                />
            )}
            </> 
        );
    }
}

const styles = StyleSheet.create({
    root : {
        paddingHorizontal : 20,
        marginVertical : 14,
    },
});

TerminateGame.propTypes = {
    gameCode : PropTypes.any,
    teams    : PropTypes.object,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    doPost          : PropTypes.func,
    userCode        : PropTypes.any,
    onTerminate     : PropTypes.func,
    removePendingCloseGame : PropTypes.func,
};

export default withApi(withGames(TerminateGame));