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

class GameCreatorComponent extends React.Component {
    state = {
        name         : "",
        scenario     : "",
        date         : null,
        defDate      : null,
        startAt      : null,
        defStartat   : null,
        endsAt       : null,
        defEndsat    : null,
        codigo_juego : null,
        teams        : [],
        teamNames    : {},
        sendInvitation : false,
    };

    constructor(props) {
        super(props);
        this.state.defDate        = new Date();
        this.state.defStartat     = new Date();
        this.state.defEndsat      = new Date();
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

    onChangeScenario(scenario) {
        this.setState({
            scenario,
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

    onSubmitForm() {
        const {
            scenario,
            date:fecha,
            name:nombre,
            codigo_juego,
            startAt,
            endsAt,
            teams,
            sendInvitation,
        } = this.state;
        const jugador = this.props.userCode;
        const escenario = scenario.codigo_escenario;
        const initialDate = `${fecha} ${startAt}`;
        const endDate = `${fecha} ${endsAt}`;        
        this.props.startLoading();
        const data = {
            jugador,
            nombre,
            fecha,
            numero_jugadores : 1,
            acceso           : "publico",
            escenario,
            codigo_juego,
            equipos : teams,
            fecha_desde : initialDate,
            fecha_hasta : endDate,
            invitar_amigos : sendInvitation,
        };
        this.props.doPost(endpoints.juego.nuevo, data).then(response => {
            const {error, error_controlado, codigo_juego} = response;
            if(error || error_controlado) {
                consoleError("Saving the game controlled", response);
                console.log("data", JSON.stringify(data));
                addMessage("Ocurrió un error al guardar el juego");
            } else {
                this.props.onChangeQuery(nombre);
                this.setState({codigo_juego}, () => {
                    this.clearGame();
                    this.props.fetchGames();
                    this.props.navigation.navigate("Search");
                    addMessage("Juego guardado");
                });                
            }
            
            this.props.stopLoading();
        })
        .catch(response => {
            consoleError("Saving game", response);
            addMessage("Ocurrió un error al guardar el juego");
            
        });

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
        } = this.state;
        return (
            <ScrollView>                
                <View style={styles.root}>
                    <Form 
                        onSelectScenario = { this.onChangeScenario.bind(this)}
                        onChangeDate     = { this.onChangeDate.bind(this)    }
                        onChangeTime     = { this.onChangeTime.bind(this)    }
                        onSubmit         = { this.onSubmitForm.bind(this)    }
                        onChange         = { this.onChange.bind(this)        }
                        teams            = { teams      }
                        gameName         = { name       }
                        scenario         = { scenario   }
                        date             = { date       }
                        startHour        = { startAt    }
                        endHour          = { endsAt     }
                        defDate          = { defDate    }
                        defStartAt       = { defStartat }
                        defEndsAt        = { defEndsat  }
                        isValidForm      = { this.isValidForm()            }
                        onAddTeam        = { this.onAddTeam.bind(this)     }
                        onRemoveTeam     = { this.onRemoveTeam.bind(this)  }
                        sendInvitation   = { sendInvitation                }
                        toggleInvitation = { () => this.toggleInvitation() }
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