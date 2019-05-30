import React from 'react';
import BaseScreen from '../BaseScreen';
import { withUserData } from '../../providers';
import { ClanDetail, ScenarioReservation } from '../../components';
// Delete from here

class TestAreaScreen extends React.Component {
    state = {
        open : true,
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
                <ScenarioReservation scenarioCode = { 18 } date = { "2019-06-26" }  />
            </BaseScreen>
        );
    }
}

export default withUserData(TestAreaScreen);