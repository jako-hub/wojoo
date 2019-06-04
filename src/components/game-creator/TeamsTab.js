import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import TabButtons from '../../commons/buttons/TabButtons';
import TeamManager from './TeamManager';
import { ClanChallenge } from '..';

const TAB_TEAMS = 0;
const TAB_CHALLENGE = 1;

const TeamsTab = ({teams=[], onAddTeam, onRemoveTeam, setIsChallenge, onSelectClan}) => {
    const [currentTab, changeTab] = useState(0);
    const buttons = [
        {label : "Equipos", icon : "user-friends"},
        {label : "Desafio", icon : "khanda"}
    ];
    
    const onChangeTab = tab => {
        changeTab(tab);
        if(setIsChallenge) setIsChallenge(tab === TAB_CHALLENGE);
    };
    return (
        <>
        <View style = { styles.header }>
            <Text style = { styles.headerText }>Añade equipos o arma un desafio</Text>
        </View>
        <TabButtons 
            currentTab  = { currentTab } 
            buttons     = { buttons } 
            onChange    = { onChangeTab } 
        />
        {currentTab === TAB_TEAMS && (
            <TeamManager 
                teams       = { teams        }
                onAddTeam   = { onAddTeam    }
                onRemoveTeam= { onRemoveTeam }
            />
        )}
        {currentTab === TAB_CHALLENGE && (
            <ClanChallenge onSelectClan = { onSelectClan } />
        )}
        </>
    );
};

const styles = StyleSheet.create({
    root : {

    },
    header : {

    },
    headerText : {
        textAlign : "center",
    },
});

TeamsTab.propTypes = {
    teams           : PropTypes.array, 
    onAddTeam       : PropTypes.func, 
    onRemoveTeam    : PropTypes.func,
    onSelectClan    : PropTypes.func,
    setIsChallenge  : PropTypes.func,
};


export default TeamsTab;