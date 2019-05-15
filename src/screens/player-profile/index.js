import React from 'react';
import BaseScreen from '../BaseScreen';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { PlayerProfile } from '../../components';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class PlayerProfileScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        const {
            playerCode      = 0,
            playerAlias     = "",
        } = navigation.state.params;
        return (
            <BaseScreen 
                navigation={navigation} title={`Ver pefil de ${playerAlias}`} 
                allowBack
                disableNotify
            >
                <PlayerProfile navigation = { navigation } playerCode = {playerCode} />
            </BaseScreen>
        );
    }
}

PlayerProfileScreen.propTypes = {
    navigation : PropTypes.object,
};

export default PlayerProfileScreen;