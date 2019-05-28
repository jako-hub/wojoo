import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'native-base';
import {
    ScrollView,
    RefreshControl,
} from 'react-native';
import { SimpleLoader } from '../../commons/loaders';

const ClanDetailWrapper = ({children, onRefresh, loading}) => (
    <ScrollView refreshControl = { 
        <RefreshControl 
            onRefresh   = { onRefresh }
            refreshing  = { loading }
        />
     }>
        <View>
            {loading && (
                <SimpleLoader />
            )}
            {!loading && (children)}
        </View>
    </ScrollView>
);

ClanDetailWrapper.propTypes = {
    loading : PropTypes.bool,
};

export default ClanDetailWrapper;