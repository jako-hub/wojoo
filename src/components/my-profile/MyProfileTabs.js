import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    Tabs,
    Tab,
} from 'native-base';
import UserOptions from './UserOptions';

const MyProfileTabs = ({onLogout}) => (
    <Tabs>
        <Tab heading = "Información">
            <UserOptions 
                onLogout = { onLogout }
            />
        </Tab>
        <Tab heading = "Amigos">

        </Tab>
    </Tabs>
);

MyProfileTabs.propTypes = {
    onLogout : PropTypes.func,
};

export default MyProfileTabs;