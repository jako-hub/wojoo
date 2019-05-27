import React from 'react';
import BaseScreen from '../BaseScreen';
import { ClanCreator } from '../../components';

class CreateClanScreen extends React.Component {
    state = {
        open : false,
        interests : [],
    };

    render() {
        const navigation = this.props.navigation;
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

export default CreateClanScreen;