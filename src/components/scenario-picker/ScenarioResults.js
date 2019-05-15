import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,        
} from 'react-native';
import {
    List,
    ListItem,
    Left,
    Body,
    Text,
    Right,
    Input,
    Item,
} from 'native-base';
import { LoadingSpinner } from '../../commons/loaders';
import { SimpleModal } from '../../commons/modals';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { upcfirst } from '../../utils/functions';

const Loader = () => (
    <View style={styles.loading}>
        <View>
            <LoadingSpinner />
        </View>
    </View>
);


const NoScenarios = () => (
    <View style={styles.rootNoComments}>
        <Text>No hay escenarios</Text>
    </View>
);

const ScenarioItem = ({onPress, nombre, negocio_nombre}) => (        
    <ListItem icon button onPress={onPress}>
        <Left>
            <View style={styles.icon}>
                <Icon name="futbol" size={30} />
            </View>
        </Left>
        <Body>
            <Text style={styles.primaryText}>{upcfirst(nombre)}</Text>
            <Text note style={styles.secondaryText}>{negocio_nombre}</Text>
        </Body>
        <Right>
            <Icon name="check" size={20} />
        </Right>
    </ListItem>
);


const ScnearioResults = (props) => {
    const {
        loading,
        results=[],
        onSelect,
        open,
        onClose,
        filter,
        onChangeFilter,
    } = props;
    let content = null; 
    if(loading) content = (<Loader />);
    else if(!loading && results.length === 0 ) content = (<NoScenarios />);
    else {
        content = (
            <View style={styles.list}>                            
                <List>
                {results.map((item, key) => (
                    <ScenarioItem 
                        key={`list-item-${item.codigo_escenario}-${key}`} 
                        {...item}
                        onPress={() => onSelect(item)}
                    />
                ))}
                </List>            
            </View>
    );
    }
    return (
        <SimpleModal 
            title   = {"Selecciona un escenario"}
            onClose = {onClose}
            open    = {open}
        >        
            <View style={styles.filterBox}>
                <Item>
                    <Input 
                        placeholder = "Buscar"
                        value       = {filter}
                        onChangeText= { text => onChangeFilter(text)}
                    />
                </Item>
            </View>
            {content}
        </SimpleModal>        
    );
};

ScnearioResults.propTypes = {
    loading     : PropTypes.bool,
    results     : PropTypes.array,
    onSelect    : PropTypes.func,
    open        : PropTypes.bool,
    onClose     : PropTypes.func,
    onChangeFilter  : PropTypes.func,
    filter          : PropTypes.string,
};

const styles = StyleSheet.create({
    loading : {
        flex        : 1,
        alignItems  : "center",
        marginTop   : 10,
    },
    list : {

    },
    icon : {
        backgroundColor : "#e0e0e0",
        borderRadius : 30,
        padding : 5,
    },
    filterBox : {
        marginBottom : 10,
    },
    primaryText : {
        fontSize : 15,
    },
    secondaryText : {
        fontSize : 10,
    },
});

export default ScnearioResults;