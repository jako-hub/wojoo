import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View, Text, } from 'native-base';
import { CustomChip } from '../../commons/others';

/**
 * This component displays only the user game resume
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const GamesResume = ({ assists=0, absences=0 }) => (
    <View style = {styles.root}>
        <View>
            <View style = {styles.chipWrapper}>
                <CustomChip icon={"thumbs-up"} label = { assists }    />
                <CustomChip icon={"thumbs-down"} label = { absences }  type="danger" />
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    root : {
        justifyContent      : "center",
        flexDirection       : "row",
        marginBottom        : 10,
    },
    chipWrapper : {
        justifyContent      : "center",
        flexDirection       : "row",
    },
});

GamesResume.propTypes = {
    assists     : PropTypes.any,
    absences    : PropTypes.any,
};

export default GamesResume;