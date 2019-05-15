import React from 'react';
import PropTypes from 'prop-types';
import { 
    StyleSheet,    
} from 'react-native';
import {
    View,
} from 'native-base';
import Notify from './Notify';
import { withNotifies } from '../../providers';
import { TYPE_NEW_GAME, TYPE_FRIENDSHIP_REQUEST } from '../notifies-list';

class NotificationBar extends React.Component {
    state = {
        notifications : [
            {id : "hello", title : "hello", message : "hello"}
        ],
    };

    onCloseNotify({id}) {
        this.props.removeNotify(id);
    }

    getNotifies() {
        return this.props.notifications.filter(item => !item.removed);
    }

    resolveNotify(notify) {
        const {type="nothing", path_data} = notify;
        const { navigation } = this.props;
        onClose = () => {
            this.props.removeNotify(notify.id, true);
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
        const notifications = this.getNotifies();
        const [notificationToShow] = notifications;
        return (
            <View style = { styles.root }>
                {notificationToShow && (
                    <Notify 
                        message     = { notificationToShow.message  }
                        title       = { notificationToShow.title    }
                        onClose     = { () => this.onCloseNotify(notificationToShow) }
                        onResolve   = { () => this.resolveNotify(notificationToShow) }
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        position : 'absolute',
        top : 0,
        left : 0,
        right : 0,
    },    
});

NotificationBar.propTypes = {
    navigation      : PropTypes.any,
    notifications   : PropTypes.array, 
    notify          : PropTypes.func,
    removeNotify    : PropTypes.func,
    popNotify       : PropTypes.func,
    notifies        : PropTypes.arrayOf(PropTypes.shape({
        id          : PropTypes.any,
        title       : PropTypes.string,
        body        : PropTypes.string,
    })),
};

export default withNotifies(NotificationBar);