import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import stylesPalette from '../../utils/stylesPalette';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SimpleTouch } from '../../commons/touchables';

const FilterButton = ({label,  icon, active, onPress}) => (
    <SimpleTouch onPress = { onPress }>
        <View style = { [styles.filterButtonWrapper, (active? styles.activeButton : null)] }>
            <View style = { styles.filterButtonContent }>
                <Icon name = {icon} size = {15} style = { [styles.filterButtonIcon, (active? styles.activeIcon : null)] } />
                <Text style = { [styles.filterButtonText, (active? styles.activeText : null)] }>{label}</Text>
            </View>
        </View>
    </SimpleTouch>
);

const PostsFilters = ({filters=[], onChange}) => {
    if(!filters || filters.length === 0) return null;
    return(
        <View style = { styles.root }>
            <View style = { styles.wrapper }>
                <View style = { styles.filterIcon }>
                    <Icon name = "filter" size = { 18 } />
                </View>
                <ScrollView horizontal>
                    {filters.map((item, key) => (
                        <FilterButton 
                            key = { `post-item-filter-${key}` }
                            active = { item.active } 
                            label = { item.label } 
                            icon = {item.icon}
                            onPress = { () => onChange? onChange(item) : null }
                        />
                    ))}
                </ScrollView>                
            </View>
        </View>
    );
}

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {        
        alignItems : "flex-start",
    },
    filterIcon : {
        width : 30,
        alignItems : "center",
        justifyContent : "center",
    },
    wrapper : {
        borderLeftColor : palette.accent.divider,
        borderLeftWidth : 1,
        marginLeft      : 20,
        paddingLeft     : 15,
        paddingBottom : 5,
        flexDirection : "row",
    },
    filterButtonWrapper : {
        borderColor : palette.primary.color,
        borderWidth : 1,
        alignSelf : "center",
        paddingHorizontal : 10,
        paddingVertical : 5,
        borderRadius : 20,
        marginRight : 5,
    },
    activeButton : {
        backgroundColor : palette.primary.color,
    },
    filterButtonIcon : {
        marginRight : 5,
    },
    activeIcon : {
        color : "#FFF",
    },
    filterButtonText : {
        fontSize : 12,
    },
    activeText : {
        color : "#FFF",
    },
    filterButtonContent : {
        flexDirection : "row",
    },
});

PostsFilters.propTypes = {
    filters : PropTypes.arrayOf(PropTypes.shape({
        label : PropTypes.string, 
        icon : PropTypes.string, 
        target: PropTypes.string
    })),
    onChange : PropTypes.func,
};

export default PostsFilters;