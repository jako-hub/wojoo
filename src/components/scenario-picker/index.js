import React from 'react';
import InputPicker from './Input';
import ScnearioResults from './ScenarioResults';
import { withApi } from '../../providers';
import PropTypes from 'prop-types';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';

class ScenarioPicker extends React.Component {
    state = {
        openPicker       : false,
        selectedScneario : null,
        scenarios        : [],
        loading          : true,
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
        this.setState({
            openPicker : false,
            selectedScneario : scenario,
        }, () => {
            if(this.props.onSelectScenario) this.props.onSelectScenario(scenario);
        });
    }

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
            selectedScneario,
            openPicker,
            loading,
            filterQuery,
        } = this.state;
        const results = this.filteredData();
        return (
            <>
                <InputPicker 
                    selected = {selectedScneario}
                    onOpen   = {() => this.toggleOpen()}
                />
                {openPicker && (
                    <ScnearioResults
                        filter          = { filterQuery }
                        onChangeFilter  = { this.onChangeFilter.bind(this) }
                        loading         = { loading }
                        results         = { results }
                        onSelect        = { this.onSelect.bind(this) }
                        onClose         = { () => this.toggleOpen() }
                        open            = { openPicker }
                     />
                )}
            </>
        );
    }
}

ScenarioPicker.propTypes = {
    doPost          : PropTypes.func,
    userCode        : PropTypes.any,
    onSelectScenario: PropTypes.func,
};

export default withApi(ScenarioPicker);