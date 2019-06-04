import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { SimpleHeader } from '../../commons/containers';
import ScenarioTimeListItem from './ScenarioTimeListItem';

/**
 * This component allows to render the scenario time blocks. 
 * 
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const ScenarioTimeList = ({timeList=[], onSelect, isSelected}) => {
    return (
        <View style = { styles.root }>
            <SimpleHeader title = "Disponibilidad" />
            {timeList.map((item, key) => (
                <ScenarioTimeListItem 
                    key         = { `scenario-time-list-item-${key}` }
                    timeLabel   = { item.timeLabel }
                    reserved    = { item.reserved }
                    onSelect    = { () => onSelect? onSelect(item, key) : null }
                    isSelected  = { isSelected(key) }
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        paddingBottom : 100,
    },
});

ScenarioTimeList.propTypes = {
    timeList    : PropTypes.array,
    onSelect    : PropTypes.func,
    isSelected  : PropTypes.func
};

export default ScenarioTimeList;