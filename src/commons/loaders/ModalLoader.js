import React from 'react';
import {
    View,
    Modal,
    StyleSheet,    
} from 'react-native';
import { Spinner } from 'native-base';

/**
 * This component allows to render a simple modal window on screen
 */
const ModalLoader = () => {
    return (
        <Modal
            visible         = { true }
            animationType   = "fade"
            onRequestClose  = { () => null }
            transparent
        >
            <View style={styles.backDrop}>
                <Spinner color="FFF" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backDrop : {
        backgroundColor     : "rgba(0,0,0,0.6)",
        flex                : 1,
        alignItems          : "center",
        justifyContent      : "center",
    },
});

export default ModalLoader;