import React from 'react';
import { View, StyleSheet } from 'react-native';
import BaseScreen from '../BaseScreen';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { SearchComponent, SearchFilter, SearchFriends } from '../../components';
import { FabButton } from '../../commons/buttons';
import { withSession } from '../../providers';
import TabButtons from '../../commons/buttons/TabButtons';
export {default as GameDetailScreen} from './GameDetail';


/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class MyProfileScreen extends React.Component {
    state = {
        currentTab : 0,
    };

    tabs = [
        {label : "Juegos", icon : "futbol"},
        {label : "Amigos", icon : "users"},
    ];

    constructor(props) {
        super(props);
        const {state} = props.navigation;
        if(state.params && state.params.goToFriends) {
            this.state.currentTab = 1;
        }
    }

    componentDidMount() {
        
    }

    onChangeTab(tab) {
        this.setState({currentTab:tab});
    }

    render() {
        const navigation = this.props.navigation;
        const {crearJuego} = this.props.sessionStack;
        const {
            currentTab,
        } = this.state;
        return (
            <BaseScreen 
                navigation      = {navigation} 
                title           = {"Search"} 
                allowUserStatus
            >
                <View style = { styles.searchBarContainer }> 
                    <SearchFilter />
                </View>            
                <TabButtons buttons = { this.tabs} onChange = { this.onChangeTab.bind(this) } currentTab = { currentTab } />
                {currentTab === 0 && (
                    <View style={styles.root}><SearchComponent navigation={navigation} /></View>
                )}
                {currentTab === 1 && (
                    <SearchFriends navigation = {navigation} />
                )}
                
                
                <FabButton 
                    icon = "plus"
                    onPress = {() => navigation.navigate("CreateGame", {prevRoute : "Search"})}                    
                />
                
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "flex-start",
        flexDirection : "column",
        paddingHorizontal   : 10,
        paddingVertical     : 10,
    },
    searchBarContainer : {
        height : 40,
    },
});

MyProfileScreen.propTypes = {
    navigation : PropTypes.object,
    sessionStack : PropTypes.object,
};

export default withSession(MyProfileScreen);