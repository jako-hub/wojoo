import React from 'react';
import PropTypes from 'prop-types';
import { SimpleModal } from '../../commons/modals';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
} from 'native-base';
import FriendList from './FriendList';


/**
 * This component allows to render the full friend list
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class ViewFriendList extends React.PureComponent {

    onViewProfile({codigo_jugador_amigo, seudonimo}) {
        const navigation = this.props.navigation;
        navigation.navigate("PlayerProfile", {
            playerCode  : codigo_jugador_amigo, 
            playerAlias : seudonimo,
        });
        this.props.onClose();
    }

    renderList() {    
        return (
            <View style = { styles.root }>
                <FriendList onViewProfile = { this.onViewProfile.bind(this) } />
            </View>
        );
    }

    render() {
        const {
            open,
            onClose
        } = this.props;

        return (
            <SimpleModal
                open    = { open    }
                onClose = { onClose }
            >
                {this.renderList()}
            </SimpleModal>
        );
    }
}

const styles = StyleSheet.create({
    root : {
    },
});

ViewFriendList.propTypes = {
    navigation : PropTypes.any.isRequired,
    open : PropTypes.bool,
    onClose : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
};

export default ViewFriendList;