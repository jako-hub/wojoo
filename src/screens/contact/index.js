import React from 'react';
import BaseScreen from '../BaseScreen';
import PropTypes from 'prop-types';
import {
    StyleSheet,    
} from 'react-native';
import {
    View,
    Text
} from 'native-base';
import { Button } from '../../commons/forms';
import { EmptyObject } from '../../commons/others';

const EmptySet = () => (
    <View style={styles.EmptySet}>
        <View>
            <EmptyObject
                message = "Si tienes alguna inquietud no dudes en contactarnos"
                icon = "question-circle"
            />
            <View style={{flex : 1, alignItems : "center", marginTop: 15}}>
                <Button info>
                    +57 3205015059
                </Button>
            </View>
        </View>
    </View>
);

/**
 * This is the main or home screen for the application.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class ContactScreen extends React.PureComponent {
    render() {
        const {
            navigation
        } = this.props;
        return (
            <>
                <BaseScreen
                     navigation={navigation} title="Contacto" enableFriendSuggester
                     allowUserStatus
                >
                    <EmptySet />
                </BaseScreen>
            </>
        );
    }
}

const styles = StyleSheet.create({
    EmptySet : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "center",
        paddingVertical : 30,
    },
});

ContactScreen.propTypes = {
    navigation : PropTypes.object,
};

export default ContactScreen;