import React from 'react';
import {
    Header,
} from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import stylesPalette from "../../utils/stylesPalette";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const RenderButton = ({icon, active, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={active? styles.actionButtonActive : styles.actionButton}>
            <Icon style={styles.icon} name={icon} size={25}/>
        </View>
    </TouchableOpacity>
);

class MainTabs extends React.Component {
    state = {
        selectedTab : 0,
    };

    tabs = [
        {id : "home",       icon : "home",          path: "BottomHome"},
        {id : "my-games",   icon : "futbol",        path: "MyGames"},
        {id : "search",     icon : "search",        path: "BottomHome"},
        {id : "create-game",icon : "plus-circle",   path: "MyGames"},
        {id : "profile",    icon : "user",          path: "BottomHome"},
    ];

    onSelectTab(selectedTab) {
        const {navigation} = this.props;
        this.setState({
            selectedTab
        }, () => {
            const {path} = this.tabs[selectedTab];
                navigation.navigate(path);
        });
    }

    render() {

        const {selectedTab} = this.state;
        return (
            <Header style={styles.root}>
                {this.tabs.map((item, key) => (
                    <RenderButton
                        onPress = { () => this.onSelectTab(key) }
                        key     = { `main-tab-item-${key}` }
                        active  = { key === selectedTab }
                        {...item}
                    />
                ))}
            </Header>
        );
    }
}

const palette = stylesPalette();
const styles = StyleSheet.create({
    root : {
        backgroundColor : palette.primary.color,
        justifyContent: "space-between",
        alignItems: "center",
    },
    body : {
        alignItems : "center",
    },
    icon : {
        color : "#FFF",
    },
    actionButton : {
        flexGrow : 1,
        flexBasis : 0,
        height : "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    actionButtonActive : {
        flexGrow : 1,
        flexBasis : 0,
        height : "100%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor : palette.secondary.color,
        borderBottomWidth : 3,
    },
});

export default MainTabs;