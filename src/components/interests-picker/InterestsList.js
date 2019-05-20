import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,    
} from 'react-native';
import {
    Text,
    View,
} from 'native-base';
import stylesPalette from '../../utils/stylesPalette';
import InterestItem from './Interestitem';

const InterestsList = ({id = "list", interests=[], onSelect, primary, removable}) => (
    interests.length === 0
    ? (
        <View style = { styles.empty }>
            <Text style = {{ textAlign : "center" }} note >No hay intereses que mostrar</Text>
        </View>
        )
    : (
        <ScrollView horizontal>
            <View style = { styles.root }>
                {interests.map((item, key) => (
                    <InterestItem 
                        key         = { `interest-item-${id}-${key}` }
                        primary     = { primary     }
                        removable   = { removable   }
                        name        = { item.nombre }
                        icon        = { item.icono  }
                        onPress     = { () => onSelect? onSelect(item) : null }
                    />
                ))}            
            </View>
        </ScrollView>
        )       
);

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flexDirection   : "row",
        justifyContent : "flex-start",
        marginVertical : 5,
    },
    empty : {
        width : "100%",
        justifyContent : "center",
        alignItems : "center",
        paddingVertical : 2,
    },
});

InterestsList.propTypes = {
    id : PropTypes.string.isRequired,
};

export default InterestsList;