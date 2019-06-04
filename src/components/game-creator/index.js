import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import Form from './Form';
import moment from 'moment';
import _ from 'underscore';
import { withApi, withSearch } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError, upcfirst } from '../../utils/functions';


/**
 * This component allows to create a new game.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 *
 * @class GameCreatorComponent
 * @extends {React.Component}
 */
class GameCreatorComponent extends React.Component {
    state = {
        name         : "",
        scenario     : null,
        date         : null,
        defDate      : null,
        startAt      : null,
        defStartat   : null,
        endsAt       : null,
        defEndsat    : null,
        codigo_juego : null,
        gameType     : 1,
        teams        : [],
        teamNames    : {},
        sendInvitation  : false,
        gameTypes       : [],
        currentStep     : 0,
        reservation     : null,
        isChallenge     : false,
        selectedClans   : {
            myClan      : null,
            opponent    : null,
        },
    };

    constructor(props) {
        super(props);
        this.state.defDate        = new Date();
        this.state.defStartat     = new Date();
        this.state.defEndsat      = new Date();
    }
    
    componentDidMount() {
        this.fetchGameTypes();
    }

    async fetchGameTypes() {
        const { doPost } = this.props;
        let types = [];
        try {
            const response = await doPost(endpoints.juego.listaTipos, {});
            const {error, error_controlado} = response;            
            if(error) {
                addMessage("Ocurrió un error al listar los tipos de juego");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                types = response;
            }
        } catch (response) {
            consoleError("fetch game types");
            addMessage("Ocurrió un error al listar los tipos de juego");
        } finally {
            this.setState({
                gameTypes: types,
            });
        }
    }
    

    toggleInvitation() {
        this.setState({
            sendInvitation : !this.state.sendInvitation,
        });
    }

    onChange(field, name) {
        this.setState({
            [field] : name,
        });
    }

    onChangeScenario({scenario, reservation}) {
        this.setState({
            scenario,
            reservation,
        });
    }

    onChangeDate(newDate) {
        const date =  moment(newDate);
        this.setState({
            date        : date.format("YYYY/MM/DD"),
            defDate     : date.toDate(),
        });
    }

    onChangeTime(key, time) {
        const date = moment(time)
        this.setState({
            [key]                   : date.format("HH:00"),
            [`def${upcfirst(key)}`] : date.toDate(),
        });
    }

    isValidForm() {
        const {
            name,
            scenario,
            date,
            teams,
            startAt,            
            endsAt,
        } = this.state;
        return      (!_.isEmpty(name))      &&
                    (!_.isEmpty(scenario))  &&
                    (!_.isEmpty(date))      &&
                    (!_.isEmpty(startAt))   &&
                    (!_.isEmpty(endsAt))    &&
                    teams.length > 0;

    }

    onAddTeam(team) {
        this.setState(({teams}) => ({
            teams : [...teams, team],
        }));
    }

    onRemoveTeam(key) {
        this.setState(({teams}) => ({
            teams : teams.filter((item, k) => k !== key)
        }));
    }

    onSelectClan(selectedClans) {
        this.setState({
            selectedClans
        });
    }

    async onSubmitForm() {
        const {
            scenario,
            date:fecha,
            name:nombre,
            codigo_juego,
            teams,
            sendInvitation,
            gameType,
            reservation,
            isChallenge,
            selectedClans,
        } = this.state;
        const {
            fromLabel,
            toLabel,
        } = reservation||{};
        const jugador = this.props.userCode;
        const escenario = scenario.codigo_escenario;         
        const data = {
            jugador,
            nombre,
            fecha,
            numero_jugadores : 1,
            acceso           : "publico",
            escenario,
            codigo_juego,
            equipos : teams,
            fecha_desde : fromLabel,
            fecha_hasta : toLabel,
            invitar_amigos : sendInvitation,
            tipo_juego : gameType,
            desafio : isChallenge,
            clanes : [
                {codigo_clan : selectedClans.myClan},
                {codigo_clan : selectedClans.opponent},
            ],
        };

        this.props.startLoading();
        try {
            const response = await this.props.doPost(endpoints.juego.nuevo, data);
            const {error, error_controlado, codigo_juego} = response;
            if(error) {
                consoleError("Saving the game controlled", response);
                addMessage("Ocurrió un error al guardar el juego");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                this.props.onChangeQuery(nombre);
                this.setState({codigo_juego}, () => {
                    this.clearGame();
                    this.props.fetchGames();
                    this.props.navigation.navigate("Search");
                    addMessage("Juego guardado");
                });                
            }
        } catch(response)  {
            consoleError("Saving game", response);
            addMessage("Ocurrió un error al guardar el juego");            
        } finally {
            this.props.stopLoading();
        }

    }

    clearGame() {
        this.setState({
            name         : "",
            scenario     : "",
            date         : null,
            codigo_juego : null,
            teams        : [],
            teamNames    : {},
            defDate      : null,
            defStartAt   : null,
            defEndsAt    : null,
        });
    }

    onChangeStep(step) {
        this.setState({
            currentStep : step - 1,
        });
    }
    
    setIsChallenge(isChallenge) {
        this.setState({
            isChallenge,
        });
    }

    render() {
        const {
            name,
            scenario,
            date,
            startAt,
            endsAt,
            teams,
            defDate,
            defStartat,
            defEndsat,
            sendInvitation,
            gameTypes,
            gameType,
            currentStep,
            reservation,
            selectedClans,
            isChallenge,
        } = this.state;
        return (
            <ScrollView>                
                <View style={styles.root}>
                    <Form 
                        onSelectScenario = { this.onChangeScenario.bind(this)}
                        onChangeDate     = { this.onChangeDate.bind(this)    }
                        onChangeTime     = { this.onChangeTime.bind(this)    }
                        onSubmit         = { this.onSubmitForm.bind(this)    }
                        onChangeStep     = { this.onChangeStep.bind(this)    }
                        onChange         = { this.onChange.bind(this)        }
                        teams            = { teams       }
                        gameType         = { gameType    }
                        isChallenge      = { isChallenge }
                        gameTypes        = { gameTypes   }
                        gameName         = { name        }
                        scenario         = { scenario    }
                        reservation      = { reservation }
                        date             = { date        }
                        startHour        = { startAt     }
                        endHour          = { endsAt      }
                        defDate          = { defDate     }
                        defStartAt       = { defStartat  }
                        defEndsAt        = { defEndsat   }
                        currentStep      = { currentStep }
                        selectedClans    = { selectedClans }
                        isValidForm      = { this.isValidForm()            }
                        onAddTeam        = { this.onAddTeam.bind(this)     }
                        onRemoveTeam     = { this.onRemoveTeam.bind(this)  }
                        sendInvitation   = { sendInvitation                }
                        toggleInvitation = { () => this.toggleInvitation() }
                        onSelectClan     = { this.onSelectClan.bind(this)  }
                        setIsChallenge   = { this.setIsChallenge.bind(this)}
                    />                    
                </View>
            </ScrollView>
        );
    }
}

GameCreatorComponent.propTypes = {
    navigation      : PropTypes.object.isRequired,
    userCode        : PropTypes.any,
    doPost          : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    onChangeQuery   : PropTypes.func,
};

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
});

export default withSearch(withApi(GameCreatorComponent));