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
    businessPlaceName,
    scenarioName,
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
        <View style = { styles.titleWrapper }>
            <Text style = { styles.titleText }>{scenarioName} ({businessPlaceName})</Text>
        </View>
        {loading && (<EmptyText text = "Cargando disponibilidad" />)}
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

const styles = StyleSheet.create({
    titleWrapper : {
        paddingVertical : 15,
    },
    titleText : {
        textAlign : "center",
    },
});

ScenarioReservationWrapper.propTypes = {
    loading             : PropTypes.bool,
    scenarioName        : PropTypes.string,
    businessPlaceName   : PropTypes.string,
    onRefresh           : PropTypes.func,
    selectionDone       : PropTypes.bool,
    selectedMessage     : PropTypes.string,
    onAccept            : PropTypes.func,
};

export default ScenarioReservationWrapper;