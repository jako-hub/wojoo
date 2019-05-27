import React from 'react';
import BaseScreen from '../BaseScreen';
import { ClanDetail } from '../../components';

class ViewClanScreen extends React.PureComponent {    
    render() {
        const navigation = this.props.navigation;        
        const {clanCode=0} = navigation.state.params;
        return (
            <BaseScreen
                navigation = { navigation }
                allowBack
                disableNotify
            >
                <ClanDetail 
                    clanCode = { clanCode }
                    navigation = { navigation }
                />
            </BaseScreen>
        );
    }
}

export default ViewClanScreen;