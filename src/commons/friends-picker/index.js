import React from 'react';
import PropTypes from 'prop-types';
import FriendsPickerWrapper from './FriendsPickerWrapper';
import { withUserData } from '../../providers';
import FriendsList from './FriendsList';
import { AnimatedButtonBottom } from '../buttons';

/**
 * This component allows to select friends from your friend list.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class FriendsPicker extends React.Component {
    state = {
        selectedFriends : [],
    };
    componentDidMount() {
        if(this.props.friends.length === 0) {
            this.fetchFriends();
        }
    }

    async fetchFriends() {        
        const {fetchMyFriends, userCode} = this.props;
        await fetchMyFriends(userCode);
    }

    onSelectFriend({codigo_jugador_amigo:code}) {
        this.setState(({selectedFriends}) => {
            const selected = selectedFriends.find(item => item === code);
            return ({
                selectedFriends : selected
                                  ? selectedFriends.filter(item => item !== code)
                                  : [...selectedFriends, code],
            });
        });
    }

    isSelected({codigo_jugador_amigo:code}) {
        const selected = this.state.selectedFriends.find(item => item === code);
        return Boolean(selected);
    }

    onSelectPlayers() {
        if(this.props.onSelectFriends) {
            this.props.onSelectFriends(this.state.selectedFriends);
        }
        if(this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const {friends=[], navigation, open, onClose} = this.props;        
        const {selectedFriends=[]} = this.state;
        const total = selectedFriends.length;
        if(!open) return null;
        return (
            <FriendsPickerWrapper
                onClose = { onClose }
                open    = { open    }
            >
                <FriendsList 
                    navigation = { navigation }
                    friends = { friends }
                    onSelectFriend = { this.onSelectFriend.bind(this) }
                    isSelected = { this.isSelected.bind(this) }
                />
                {total > 0 && (
                    <AnimatedButtonBottom 
                        label = { `Seleccionar (${total})` }
                        onPress = { this.onSelectPlayers.bind(this) }
                    />
                )}
            </FriendsPickerWrapper>
        );
    }
}

FriendsPicker.propTypes = {
    navigation      : PropTypes.any,
    fetchMyFriends  : PropTypes.func,
    userCode        : PropTypes.any,
    friends         : PropTypes.array,
    open            : PropTypes.bool,
    onClose         : PropTypes.func,
    onSelectFriends : PropTypes.func,
};

export default withUserData(FriendsPicker);