import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,
    RefreshControl,    
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { EmptyText } from '../../commons/others';
import { AnimatedButtonBottom } from '../../commons/buttons';

const ScenarioReservationWrapper = ({
    children,
    loading,
    onRefresh,
    selectionDone,
    selectedMessage,
    onAccept,
}) => (
    <>
    <ScrollView
        refreshControl = { 
            <RefreshControl 
                onRefresh   = { onRefresh }
                refreshing  = { loading }
            />
         }
    >
        {loading && (<EmptyText text = "Cargando reservas" />)}
        {children}        
    </ScrollView>
    {selectionDone && (
        <AnimatedButtonBottom
            label   = "Aceptar"
            message = { selectedMessage }
            onPress = { onAccept        }
            removeOpacity
        />
    )}
    </>
);

ScenarioReservationWrapper.propTypes = {
    loading         : PropTypes.bool,
    onRefresh       : PropTypes.func,
    selectionDone   : PropTypes.bool,
    selectedMessage : PropTypes.string,
    onAccept        : PropTypes.func,
};

export default ScenarioReservationWrapper;