import React from 'react';
import BaseScreen from '../BaseScreen';
import { withGames, withUserData } from '../../providers';
import { InterestsPicker, ViewFriendList } from '../../components';
import {Text, View} from 'native-base';
import { ScrollView } from 'react-native';
import PseudonymHelper from '../../components/user-info-verifier/PseudonymHelper';
//import FriendsList from '../../components/view-friend-list/FriendList';
import FriendsList from '../../components/user-profile-card/FriendsList';

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
                <ScrollView>
                    <FriendsList 
                        navigation  = { navigation } 
                        friends     = { friends } 
                        onViewAll   = { this.toggleViewAll.bind(this) }
                        hideMax
                    />
                
                </ScrollView>
                {open && <ViewFriendList 
                    open = { open } onClose = { () => this.toggleViewAll() } 
                    navigation = { navigation }
                />}
            </BaseScreen>
        );
    }
}

export default withUserData(TestAreaScreen);