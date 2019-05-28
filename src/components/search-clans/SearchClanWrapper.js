import React from 'react';
import {
    ScrollView,
    RefreshControl,
} from 'react-native';

const SearchClanWrapper = ({children, loading, onRefresh}) => (
    <ScrollView
        refreshControl = { 
            <RefreshControl 
                refreshing = { loading }
                onRefresh = { onRefresh }
            />
        }
    >
        {children}
    </ScrollView>
);

export default SearchClanWrapper;