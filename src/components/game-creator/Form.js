import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Input,
    Form,
    Label,
    Item,    
    Text,
    CheckBox,
    Picker,
} from 'native-base';
import ScenarioPicker from '../../components/scenario-picker';
import { 
    DateTimePicker,
    FieldSetTitle,
} from '../../commons/forms';
import TeamManager from './TeamManager';
import Stepper from './Stepper';
import StepperItem from './StepperItem';
import moment from 'moment';

const isEmpty = (value) => value === null || value === "";
/**
 * This component only renders the Game Form.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const GameForm = (props) => {
    const {
        onChange, 
        onSelectScenario,
        onChangeDate,
        gameName,
        date,
        onSubmit,
        onAddTeam,
        onRemoveTeam,
        teams=[],
        defDate,
        toggleInvitation,
        sendInvitation,
        gameType,
        gameTypes=[],
        currentStep=0,
        onChangeStep,
        scenario,
        reservation,
    } = props;
    const getGameTypeLabel = (gameType) => {
        const selected = gameTypes.find(item => item.codigo_juego_tipo === gameType);
        return selected? selected.juego_tipo_nombre : null;
    };
    const {
        fromLabel,
        toLabel,
    } = reservation||{};
    const fromHour = moment(fromLabel).format("hh:mm a");
    const toHour    = moment(toLabel).format("hh:mm a");
    return (
        <View style={styles.root}>            
            <Form style={styles.form}>
                <Stepper 
                    currentStep     = { currentStep     }
                    onChangeStep    = { onChangeStep    }
                    onDone          = { onSubmit        }
                >
                    <StepperItem 
                        title       = "Información del juego"
                        disableNext = { isEmpty(gameType) || isEmpty(gameName) }
                        passed      = { !isEmpty(gameType) && !isEmpty(gameName) }
                        passedValue = { `${gameName} (${getGameTypeLabel(gameType, gameTypes)})` }
                    >
                        <View style = { {paddingLeft : 15} }>
                            <Text>Tipo de juego</Text>
                        </View>
                        <Item>     
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 120 }}
                                selectedValue={gameType}
                                onValueChange={value => onChange("gameType", value)}
                            >                        
                                {gameTypes.map((item, key) => (
                                    <Picker.Item 
                                        key = { `list-item-types-element-${key}` }
                                        label={item.juego_tipo_nombre} 
                                        value={item.codigo_juego_tipo}
                                    />
                                ))}
                            </Picker>
                        </Item>
                        <Item floatingLabel>
                            <Label>{"Nombre del juego"}</Label>
                            <Input 
                                value        = { gameName                        }
                                onChangeText = { text => onChange("name", text)  }
                            />
                        </Item>
                    </StepperItem>

                    <StepperItem 
                        title       = "Fecha"
                        disableNext = { isEmpty(date)  }
                        passed      = { !isEmpty(date)  }
                        passedValue = { `Día: ${date}`}
                    >
                        <DateTimePicker
                            date        = { defDate      } 
                            value       = { date         }
                            onChange    = { onChangeDate }
                            label       = { "Seleccione el día" }
                            mode        = "date"
                        />
                    </StepperItem>

                    <StepperItem 
                        title       = "Lugar"
                        disableNext = { !scenario }
                        passed      = { Boolean(scenario) }
                        passedValue = { scenario? `${scenario.nombre} (${scenario.negocio_nombre}) de ${fromHour} a ${toHour}` : null }
                    >
                        <ScenarioPicker 
                            onSelectScenario = { onSelectScenario }
                            date = { moment(defDate).format("YYYY-MM-DD") }
                        />
                    </StepperItem>
                    <StepperItem 
                        title = "Jugadores"
                        disableNext = { teams.length === 0          }
                        passed      = { teams.length > 0            }
                        passedValue = { `Equipos : ${teams.length}` }
                    >
                        <FieldSetTitle title={"Equipos del juego"} />
                        <TeamManager 
                            teams       = { teams        }
                            onAddTeam   = { onAddTeam    }
                            onRemoveTeam= { onRemoveTeam }
                        />
                    </StepperItem>                                        
                    <StepperItem title = "Últimos pasos">
                        <View style = { styles.inviteZone }>
                            <Text>Notificar amigos</Text>
                            <CheckBox 
                                checked = { sendInvitation   }
                                onPress = { toggleInvitation }
                            />
                        </View>
                    </StepperItem>                                        
                </Stepper>
            </Form>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {        
        paddingHorizontal : 10,
        paddingVertical : 10,
        paddingBottom : 50,
    },
    inviteZone : { 
        flex : 1,
        alignItems : "center", 
        justifyContent : "center",
        flexDirection : "row",
        paddingVertical : 20,
    }
});

GameForm.propTypes = {    
    gameName : PropTypes.string,
    scenario : PropTypes.any,
    onSelectScenario : PropTypes.func,
    onChange         : PropTypes.func,
    onChangeDate     : PropTypes.func,
    isValidForm      : PropTypes.bool,
    onAddTeam        : PropTypes.func,
    onRemoveTeam     : PropTypes.func,
    onSubmit         : PropTypes.func,
    teams            : PropTypes.array,
    startHour        : PropTypes.string,      
    endHour          : PropTypes.string,
    onChangeTime     : PropTypes.func,
    defDate          : PropTypes.any,
    defStartAt       : PropTypes.any,
    defEndsAt        : PropTypes.any,
    gameType         : PropTypes.any,
    gameTypes        : PropTypes.array,
    onChangeStep     : PropTypes.func,
};

export default GameForm;