import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'native-base';
import { SimpleLoader } from '../../commons/loaders';

const ClanDetailWrapper = ({children, loading}) => (
    <View>
        {loading && (
            <SimpleLoader />
        )}
        {!loading && (children)}
    </View>
);

ClanDetailWrapper.propTypes = {
    loading : PropTypes.bool,
};

export default ClanDetailWrapper;