import React from 'react';
import BaseScreen from '../BaseScreen';
import PropTypes from 'prop-types';
import { NewsComponent } from '../../components';
import { withGames } from '../../providers';

/**
 * This is the main or home screen for the application.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class HomeScreen extends React.PureComponent {
    componentDidMount() {
        this.props.fetchPendingCloseGames();   
    }
    render() {
        const {
            navigation
        } = this.props;        
        return (
            <>
                <BaseScreen
                    allowUserStatus
                     navigation={navigation} enableFriendSuggester>
                    <NewsComponent navigation = { navigation } />
                </BaseScreen>
            </>
        );
    }
}

HomeScreen.propTypes = {
    navigation : PropTypes.object,    
};

export default withGames(HomeScreen);