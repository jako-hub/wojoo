import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '../forms';
import {
    StyleSheet,
} from 'react-native';
import { 
    Text, 
    View,
    List,
    ListItem,
    Left,
    Body,
    Right, 
} from 'native-base';
import { withNotifies, withSearch } from '../../providers';
import { ModalTop } from '../modals';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const TYPE_NEW_GAME              = 'new-game';
export const TYPE_FRIENDSHIP_REQUEST    = 'friend-request';
export const TYPE_PULL_ACTIVITIES       = 'pull-news';
export const TYPE_GAME_INVITATION       = 'game-invitation';

const NotifyItem = ({item, isButton, viewNotify, onPress}) => (
    <ListItem 
        iconLeft 
        noIndent
        button  = { isButton }
        onPress = { () => isButton? onPress() : null }
    >
        <Left style = { styles.iconWrapper }>
            <Icon name = "futbol" size = { 30 } />
        </Left>
        <Body style = { styles.bodyWrapper }>
            <Text>
                {item.title}
            </Text>
            <Text note>
                {item.message}
            </Text>
        </Body>
        <Right style = { styles.buttonWrapper }>
            <IconButton 
                icon    = "times" 
                size    = { 20 } 
                onPress = { () => viewNotify(item) }
            />
        </Right>
    </ListItem>
);

class NotifiesList extends React.Component {
    state = {
        opened : false,
    };

    getNotifications() {
        return this.props.notifications.filter(item => !item.read);
    }

    toggleModal() {
        this.setState({
            opened : !this.state.opened,
        });
    }

    viewNotify(item) {    
        if(this.props.viewNotify) this.props.viewNotify(item);
    }

    onPressNotify(item) {
        this.processAction(item);
    }

    processAction(notify) {
        const {type="nothing", path_data} = notify;
        const { navigation } = this.props;
        onClose = () => {
            this.props.viewNotify(notify);
            this.toggleModal();
        };
        switch(type) {
            case TYPE_NEW_GAME : {
                this.props.selectGame({codigo_juego : path_data});
                navigation.navigate('GameDetail', {});
                onClose();
                break;
            };
            case TYPE_FRIENDSHIP_REQUEST : {
                navigation.navigate('ProfileTab', {});
                break;
            };
            default : {
                console.log("Nothing to do with the notification: ", type, notify);
            };
        }
    }

    render() {
        const notifications = this.getNotifications();
        const total = notifications.length;
        const { opened } = this.state;
        return (
            <>
                <View style = { styles.root }>
                    <IconButton icon="bell" noFa5 onPress = { () => this.toggleModal() } />
                    {total > 0 && (
                        <View style = { styles.badge }>
                            <Text style = { styles.badgeText }>{ total }</Text>
                        </View>
                    )}
                </View>
                <ModalTop
                    title = "Notificaciones"
                    open = { opened }
                    onClose = { () => this.toggleModal() }
                >
                    {notifications.length === 0 && (
                        <View style = { {
                            justifyContent : "center"
                        } }>
                            <Text note style = { {textAlign : "center"} }>
                                No hay notificaciones pendientes.
                            </Text>
                        </View>
                    )}
                    <List>
                        {notifications.map((item, key) => (
                            <NotifyItem 
                                key         = { `item-list-notification-${item.id}-${key}` } 
                                viewNotify  = { this.viewNotify.bind(this) }
                                item        = { item }
                                isButton    = { item.action }
                                onPress     = { () => this.onPressNotify(item)      }
                            />
                        ))}
                    </List>
                </ModalTop>
            </>
        );
    }
}

const styles = StyleSheet.create({
    root : {

    },
    iconWrapper : {
        flex : 1,
    },
    buttonWrapper : {
        flex : 1,
    },
    bodyWrapper : {
        flex : 8,
    },
    badge : {
        position        : "absolute",
        top             : '60%',
        right           : '60%',
        backgroundColor : "red",
        padding         : 2,
        paddingHorizontal : 4,
        borderRadius    : 30,
    },
    badgeText : {
        fontSize : 12,
        color : "#fff",
    },

});

NotifiesList.propTypes = {
    navigation : PropTypes.any,
    notifies : PropTypes.array,
    selectGame          : PropTypes.func,
    onClose : PropTypes.func,
};

export default withNotifies(withSearch(NotifiesList));