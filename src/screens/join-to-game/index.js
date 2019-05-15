import React from 'react';
import BaseScreen from '../BaseScreen';
import PropTypes from 'prop-types';
import {
    UserInfoVerifier,
    JoinToGamecomponent,
} from '../../components';


/**
 * This is the main or home screen for the application.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class JoinToGameScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        const {selectedGame} = this.props.navigation.state.params;
        return (
            <>
            <BaseScreen navigation={navigation} allowBack disableNotify>
                <JoinToGamecomponent 
                    navigation      = { navigation   }
                    selectedGame    = { selectedGame }
                />
            </BaseScreen>
            <UserInfoVerifier />
            </>
        );
    }
}

JoinToGameScreen.propTypes = {
    navigation : PropTypes.object,
};

export default JoinToGameScreen;