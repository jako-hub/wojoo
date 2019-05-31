import React from 'react';
import InputPicker from './Input';
import ScnearioResults from './ScenarioResults';
import { withApi } from '../../providers';
import PropTypes from 'prop-types';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';

/**
 * This component allows to select a scenario from the registered ones.
 * 
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @class ScenarioPicker
 * @extends {React.Component}
 */
class ScenarioPicker extends React.Component {
    state = {
        openPicker          : false,
        selectedScenario    : null,
        scenarios           : [],
        loading             : true,
        displayAvailability : false,
    };

    toggleOpen() {        
        this.setState({
            openPicker : !this.state.openPicker,
        }, () => {
            if(this.state.openPicker && this.state.scenarios.length === 0) {
                this.fetchSchenarios();
            }
        });
    }

    onSelect(scenario) {
        console.log("The selected scenario: ", scenario);
        this.setState({            
            selectedScenario    : scenario,
            displayAvailability : true,
        }, () => {
            // if(this.props.onSelectScenario) this.props.onSelectScenario(scenario);
        });
    }

    onAcceptReservation (data) {
        const {selectedScenario} = this.state;
        this.setState({
            openPicker : false,
            displayAvailability : false,
        }, () => {
            if(this.props.onSelectScenario) this.props.onSelectScenario({
                scenario    : selectedScenario, 
                reservation : data,
            });
        });            
    };

    fetchSchenarios() {
        this.setState({loading : true});
        this.props.doPost(endpoints.escenarios.lista, {})
            .then(response => {
                let scenarios = [];
                const {error, error_contrlado} = response;
                if(!error && !error_contrlado) {
                    scenarios = response;
                } else {
                    addMessage("Ocurrió un error al listar los escenarios");
                }
                this.setState({loading : false, scenarios});
            })
            .catch(response => {
                this.setState({loading : false});
                consoleError("Listing escenarios: ", response);
                addMessage("Ocurrió un error al listar los escenarios");
            });
    }

    onChangeFilter(filterQuery) {
        this.setState({
            filterQuery,
        });
    }

    filteredData() {
        let data = [...this.state.scenarios];
        const {filterQuery} = this.state;
        if(filterQuery) {
            data = data.filter(item => {
                const regExp = new RegExp(`.*(${filterQuery.toLowerCase()}).*`, "g");
                return `${item.nombre.toLowerCase()}`.match(regExp) || `${item.negocio_nombre.toLowerCase()}`.match(regExp);
            });
        }
        return data;
    }

    render() {
        const {
            selectedScenario,
            openPicker,
            loading,
            filterQuery,
            displayAvailability,
        } = this.state;
        const results = this.filteredData();
        const {
            date,
        } = this.props;
        const {
            codigo_escenario:scenarioCode, 
            negocio_nombre:businessPlaceName,
            nombre:scenarioName,
        } = selectedScenario||{};
        const scenarioInfo = {
            scenarioCode        : scenarioCode,
            date                : date,
            businessPlaceName   : businessPlaceName,
            scenarioName        : scenarioName,
            onAccept            : this.onAcceptReservation.bind(this),
        };
        return (
            <>
                <InputPicker 
                    selected = {selectedScenario}
                    onOpen   = {() => this.toggleOpen()}
                />
                {openPicker && (
                    <ScnearioResults
                        filter          = { filterQuery                     }
                        onChangeFilter  = { this.onChangeFilter.bind(this)  }
                        loading         = { loading                         }
                        results         = { results                         }
                        onSelect        = { this.onSelect.bind(this)        }
                        onClose         = { () => this.toggleOpen()         }
                        open            = { openPicker                      }
                        displayAvailability = { displayAvailability         }
                        scenarioInfo    = { scenarioInfo                    }
                     />
                )}                
            </>
        );
    }
}

ScenarioPicker.propTypes = {
    doPost          : PropTypes.func,
    selectedDate    : PropTypes.any,
    userCode        : PropTypes.any,
    onSelectScenario: PropTypes.func,
    date            : PropTypes.string,
};

export default withApi(ScenarioPicker);