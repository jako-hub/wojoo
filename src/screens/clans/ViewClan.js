import React from 'react';
import BaseScreen from '../BaseScreen';
import { ClanDetail } from '../../components';

class ViewClanScreen extends React.PureComponent {    
    render() {
        const navigation = this.props.navigation;        
        return (
            <BaseScreen
                navigation = { navigation }
                allowBack
                disableNotify
            >
                <ClanDetail 
                    clanCode = { 1 }
                    navigation = { navigation }
                />
            </BaseScreen>
        );
    }
}

export default ViewClanScreen;