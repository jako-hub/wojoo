import React from 'react'
import PropTypes from 'prop-types';
import { withApi, } from '../../providers';
import { SimpleLoader } from '../../commons/loaders';
import InterestsList from './InterestsList';
import { addMessage } from '../../utils/functions';
import endpoints from '../../configs/endpoints';
import { AnimatedButtonBottom } from '../../commons/buttons';
import {StyleSheet, ScrollView} from 'react-native';
import {Text,} from 'native-base';
import _ from 'lodash';

class InterestsManager extends React.Component {
    state = {
        loading         : false,
        interests       : [],
        playerInterests : [],
        initialInterests : [],
    };
    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        this.setState({
            loading : true,
        });
        await this.fetchInterests();
        await this.fetchPlayerInterests();
        this.setState({
            loading : false,
        });
    }

    async fetchInterests() {
        let interests = [];
        try {
            const response = await this.props.doPost(endpoints.interes.lista);
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error al listar los intereses");    
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                interests = response;
            }
        } catch (response) {
            addMessage("Ocurrió un error al listar los intereses");
        } finally {
            this.setState({
                loading : false,
                interests,
            });
        }
    }

    async fetchPlayerInterests() {
        let interests = [];
        const {doPost, userCode} = this.props;
        try {
            const response = await doPost(endpoints.interes.jugador, {
                jugador : userCode,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error al listar los intereses del jugador");    
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                interests = response.map(item => item.codigo_interes);
            }
        } catch (response) {
            addMessage("Ocurrió un error al listar los intereses  del jugador");
        } finally {
            this.setState({
                loading : false,
                playerInterests : interests,
                initialInterests : [...interests],
            });
        }
    }

    onSelectItem({codigo_interes}) {
        this.setState(({ playerInterests=[]}) => {
            const interest = playerInterests.find(item => item === codigo_interes);
            const state = {};
            if(interest) { // if is added to player interests
                state.playerInterests = playerInterests.filter(item => item !== codigo_interes);
            } else {
                state.playerInterests = [...playerInterests, codigo_interes];
            }
            return state;
        });
    }

    isSelected(code) {
        const playerInterests = this.state.playerInterests || [];
        return playerInterests.includes(code);
    }

    hasChanged() {
        const {playerInterests=[], initialInterests=[]} = this.state;
        return !_.isEqual(playerInterests.sort(), initialInterests.sort());
    }

    async onSubmit() {
        const {playerInterests} = this.state;
        const { doPost, userCode, stopLoading, startLoading, onClose} = this.props;
        if(playerInterests.length === 0) {
            addMessage("Debe agregar al menos un interés");
            return false;
        }
        startLoading();
        try {
            const response = await doPost(endpoints.interes.actualizarJugador, {
                jugador : userCode,
                intereses : playerInterests,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error al actualizar los intereses");
            } else if(error_controlado){
                addMessage(error_controlado);
            } else {
                addMessage("Cambios guardados");
                if(onClose) onClose();
            }
        } catch (response) {
            addMessage("Ocurrió un error al actualizar los intereses");
        } finally {
            stopLoading();
        }

    }

    renderContent () {
        const {interests=[], playerInterests} = this.state;
        const changed = this.hasChanged();
        return (
            <>              
                <ScrollView>
                    <InterestsList 
                        interests       = { interests } 
                        onSelectItem    = { this.onSelectItem.bind(this)    } 
                        isSelected      = { this.isSelected.bind(this)      }
                    />
                </ScrollView>  
                {changed > 0 && playerInterests.length > 0 && (
                    <AnimatedButtonBottom label = "Guardar" onPress = { this.onSubmit.bind(this) } />
                )}
            </>
        );
    }

    render() {
        const {loading, playerInterests,} = this.state;
        let content = null;
        if(loading) content = (<SimpleLoader />);
        else content = this.renderContent();
        const total = playerInterests.length;
        return (
            <>
                <Text style = { styles.textTitle } >Seleccionados ({total})</Text>
                {total === 0 && (<Text note style = { styles.textTitle } >Debe seleccionar al menos un interés</Text>)}
                {content}
            </>
        );
    }
}

const styles = StyleSheet.create({
    root : {

    },
    textTitle : {
        textAlign : "center",
    },
});

InterestsManager.propTypes = {
    userCode : PropTypes.any,
    doPost   : PropTypes.func,
    onClose : PropTypes.func,
};

export default withApi(InterestsManager);