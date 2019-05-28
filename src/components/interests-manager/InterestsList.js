import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { 
    View,
    Text,
    Input,
    Item,
    Label,
} from 'native-base';
import InterestItem from './InterestItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SimpleTouch } from '../../commons/touchables';

const InterestsList = (props) => {
    const {interests = [], onSelectItem, isSelected} = props;
    const total = interests.length;
    const [queryString, setQueryString] = useState("");
    let filteredInterests = [...interests];

    if(queryString) {
        const regExp = new RegExp(`.*(${queryString.toLowerCase()}).*`, "g");        
        filteredInterests = filteredInterests.filter(item => {
            return `${item.nombre.toLowerCase()}`.match(regExp);
        });
    }

    return (
        <View style = { styles.root }>
            <View style = { styles.searchWrapper }>
                <Item floatingLabel icon>
                    <Label><Text>Buscar</Text></Label>
                    <Input 
                        value = {queryString}
                        onChangeText = { text => setQueryString(text) }
                    />                                        
                </Item>                
            </View>
            {total === 0 && (
                <View style = { styles.emptyList }>
                    <Text note style = { styles.emptyText }>No hay intereses que mostrar</Text>
                </View>
            )}
            <View style = { styles.listWrapper }>
            {filteredInterests.map((item, key) => (
                <InterestItem 
                    key     = { `interest-item-manager-${key}` }
                    name    = { item.nombre  }
                    icon    = { item .icono  }
                    onPress = { () => onSelectItem(item) }
                    active  = { isSelected(item.codigo_interes) }
                />
            ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        paddingBottom   : 150,
    },
    searchWrapper : {
        paddingVertical : 10,
        paddingHorizontal : 15,
        marginBottom : 10,
    },
    iconWrapper : {
        position : "absolute",
        width : 40,
        height : 40,
        alignItems : "center",
        justifyContent : "center",
        right : 0,
        top : "40%",
        zIndex : 1000,
    },
    emptyList : {
        flexDirection   : "row",
        justifyContent  : "center",
        paddingTop      : 20,
        marginTop       : 10,        
    },
    emptyText : {
        textAlign : "center",
    },
    listWrapper : {
        flexDirection   : "row",
        flexWrap        : "wrap",
        justifyContent  : "center",
        padding         : 20,
    },
});

InterestsList.propTypes = {
    interests       : PropTypes.array,
    onSelectItem    : PropTypes.func,
    isSelected      : PropTypes.func,
};

export default InterestsList;