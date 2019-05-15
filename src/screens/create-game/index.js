import React from 'react';
import BaseScreen from '../BaseScreen';
import { GameCreatorComponent } from '../../components';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class CreateGameScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <BaseScreen 
                navigation  = { navigation } 
                title       = { _t('create_game_title_1') } 
                allowBack
                disableNotify
            >
                <GameCreatorComponent 
                    navigation = { navigation }
                />
            </BaseScreen>
        );
    }
}

CreateGameScreen.propTypes = {
    navigation : PropTypes.object,
};

export default CreateGameScreen;