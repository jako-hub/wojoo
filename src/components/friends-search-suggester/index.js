import React from 'react';
import PropTypes from 'prop-types';
import { View, Text,       } from 'native-base';
import { StyleSheet, Animated,} from 'react-native';
import { withUserData } from '../../providers';
import { PrettyButton } from '../../commons/forms';
import InviteContacts from '../invite-contacts';

class FriendSearchSuggester extends React.Component {
    state = {
        openInvite : false,
    };

    animVal = 0;
    
    constructor(props) {
        super(props);
        this.animVal = new Animated.Value(-120);
    }

    toggleInvite() {
        this.setState({
            openInvite : !this.state.openInvite,
        });
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        Animated.timing(this.animVal, {
            toValue     : 0,
            duration    : 300,
        }).start();
    }

    goToSearch() {
        const {navigation} = this.props;
        navigation.navigate("Search", {goToFriends : true});
    }

    render() {
        const { friends=[] } = this.props;
        const { openInvite } = this.state;

        if(friends.length > 0) return null;
        const containerStyles = [
            styles.root,
            { bottom : this.animVal }
        ];
        
        return (
            <>
                <Animated.View style = { containerStyles }>
                    <Text style = { styles.text }>
                        Empieza búscando amigos en JAKO
                    </Text>
                    <View style = { styles.action }>
                        <PrettyButton primary onPress = {() => this.goToSearch()}>
                            Buscar en JAKO
                        </PrettyButton>
                        <PrettyButton onPress = { () => this.toggleInvite() }>
                            Invita contactos
                        </PrettyButton>
                    </View>
                </Animated.View>
                <InviteContacts 
                    open = { openInvite }
                    onClose = { () => this.toggleInvite() }
                /> 
            </>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        position        : "absolute",
        justifyContent : "center",
        width           : "100%",
        height          : 120,
        bottom          : 0,
        backgroundColor : "#FFF",
        borderTopColor : "#e0e0e0",
        borderTopWidth : 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        padding         : 5,
        shadowOpacity   : 0.44,
        shadowRadius    : 10.32,        
        elevation: 16,
    },
    text : {
        textAlign : "center"
    },
    action : {
        marginTop : 10,
        flexDirection : "row",
        justifyContent : "center",
    },
});

FriendSearchSuggester.propTypes = {
    fetchMyFriends      : PropTypes.func,
    userCode            : PropTypes.any,
    setUserData         : PropTypes.func,
    friends             : PropTypes.array,
    photo               : PropTypes.string,
    verified            : PropTypes.bool,
    setVerified         : PropTypes.func,
    friendshipRequests  : PropTypes.array,
    fetchFriendshipRequest : PropTypes.func,
    removeFriendshipRequest: PropTypes.func,
    navigation : PropTypes.any,
};

export default withUserData(FriendSearchSuggester);