import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import TeamForm from './TeamForm';
import TeamList from './TeamList';

const TeamManager = ({onAddTeam, onRemoveTeam, teams=[]}) => {
    return (
        <View style={styles.root}>
            <TeamForm 
                onSubmit = { onAddTeam }
            />
            <TeamList 
                teams       = { teams }
                onRemove    = { onRemoveTeam }
            />
        </View>
    );
};

TeamManager.propTypes = {
    onAddTeam   : PropTypes.func,
    teams       : PropTypes.array,
    onRemoveTeam: PropTypes.func,
};

const styles = StyleSheet.create({
    root : {

    },
});

export default TeamManager;