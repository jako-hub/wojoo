import React from 'react';
import BaseScreen from '../BaseScreen';
import { withGames } from '../../providers';
import { InterestsPicker } from '../../components';
import {Text} from 'native-base';
import PseudonymHelper from '../../components/user-info-verifier/PseudonymHelper';

class TestAreaScreen extends React.Component {
    state = {
        open : false,
        interests : [],
    };
    toggle() {
        this.setState({
            open : !this.state.open,
        });
    }

    onSelect(interests) {
        this.setState({
            interests,
        });
    }

    render() {
        const navigation = this.props.navigation;
        const {selectedGame} = this.props;
        const {open, interests=[]} = this.state;
        return (
            <BaseScreen
                navigation = { navigation }
            >                
                
            </BaseScreen>
        );
    }
}

export default withGames(TestAreaScreen);