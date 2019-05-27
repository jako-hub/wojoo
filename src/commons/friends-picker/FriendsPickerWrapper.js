import React from 'react';
import {
    View,    
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import { FullScreenModal } from '../modals';
const FriendsPickerWrapper = ({children, open, onClose}) => (
    <FullScreenModal
        open = { open }
        onClose = { onClose }
        disableScroll
    >
        <View style = { styles.root }>
            {children}
        </View>
    </FullScreenModal>
);

const styles = StyleSheet.create({
    root : {
        flex : 1,
    }
});

export default FriendsPickerWrapper;