import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';
import InterestsList from './InterestsList';
import { LoadingSpinner } from '../../commons/loaders';

/**
 * 
 */
class InterestsPicker extends React.Component {

    state = {
        interests   : [],
        loading     : true,
        selectedInterests : [],
    };

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        this.setState({loading : true});
        let interests = [];
        try {
            const response = await this.props.doPost(endpoints.interes.lista, {});
            const {error} = response;
            if(error) {
                addMessage("Ocurrió un error al listar intereses");
            } else {
                interests = response;
            }
        } catch (response) {
            addMessage("Ocurrió un error al listar intereses");
            consoleError("list interests", response);
        } finally {
            this.setState({
                loading : false,
                interests,
            });
        }
    }

    renderLoader() {
        return (
            <View style = { styles.rootLoader }>                
                <LoadingSpinner />
            </View>
        );
    }

    selectItem(selectedItem) {
        this.setState(({interests, selectedInterests}) => ({
            interests : interests.filter(item => item.codigo_interes !== selectedItem.codigo_interes ),
            selectedInterests : [...selectedInterests, selectedItem],
        }), () => {
            if(this.props.onSelect) this.props.onSelect(this.state.selectedInterests);
        });
    }

    removeItem(selectedItem) {
        this.setState(({interests, selectedInterests}) => ({
            selectedInterests : selectedInterests.filter(item => item.codigo_interes !== selectedItem.codigo_interes ),
            interests : [...interests, selectedItem],
        }), () => {
            if(this.props.onSelect) this.props.onSelect(this.state.selectedInterests);
        });
    }

    render () { 
        const {loading, interests=[], selectedInterests=[]} = this.state;
        let content = null;

        if(loading) {
            content = this.renderLoader();
        } else {
            content = (
                <>
                    <Text>¿Cúales son tus intereses?</Text>
                    <InterestsList 
                        interests = { interests } 
                        id = "available-list"
                        onSelect = { this.selectItem.bind(this) }
                    />
                    {selectedInterests.length > 0 && (
                        <>
                            <Text>Me interesa: </Text>
                            <InterestsList 
                                interests = { selectedInterests } 
                                onSelect = { this.removeItem.bind(this) }
                                id = "available-list"
                                primary
                                removable
                            />
                        </>
                    )}
                </>
            );
        }
        return (
            <View style = { styles.root }>
                { content }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        
    },
    rootLoader : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
    },
});

InterestsPicker.propTypes = {
    doPost      : PropTypes.func,
    onSelect    : PropTypes.func,
};

export default withApi(InterestsPicker);