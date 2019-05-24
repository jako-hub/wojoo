import React from 'react';
import BaseScreen from '../BaseScreen';
import { withGames, withUserData } from '../../providers';
//import { InterestsPicker, ViewFriendList, InterestsManager } from '../../components';
import {Text, View} from 'native-base';
import { ClansManager, ClanCreator } from '../../components';

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

    componentDidMount() {
        setTimeout(() => {
            this.fetchFriends();
        }, 3000);
    }

    async fetchFriends() {
        this.props.fetchMyFriends(1);
    }

    toggleViewAll() {
        this.setState({
            open : !this.state.open,
        });
    }

    render() {
        const navigation = this.props.navigation;
        const {selectedGame, friends} = this.props;
        const {open, interests=[]} = this.state;
        return (
            <BaseScreen
                navigation = { navigation }
            >
                <ClanCreator 
                    navigation = { navigation } 
                />
            </BaseScreen>
        );
    }
}

export default withUserData(TestAreaScreen);