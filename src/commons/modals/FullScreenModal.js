import React from 'react';
import {
    Modal,    
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    Text,
    View,
} from 'native-base';
import PropTypes from 'prop-types';
import { IconButton } from '../forms';

class FullScreenModal extends React.PureComponent {

    render() {
        const {open, onClose, disableScroll, animation="fade", children, title} = this.props;
        return (
            <Modal
                visible         = {open}
                onRequestClose  = {onClose}
                animationType   = {animation}
            >                
                <View style = { styles.root }>
                    <View style = { styles.headerWrapper }>
                        <View style = { styles.iconWrapper }>
                            <IconButton  icon = "arrow-left" onPress = {onClose} />
                        </View>
                        <Text>
                            {title}
                        </Text>
                    </View>
                    {!disableScroll && (
                        <ScrollView>
                            {children}
                        </ScrollView>
                    )}
                    {disableScroll && (children)}
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
    headerWrapper : {
        flexDirection : "row",
        alignItems : "center",
    },
    iconWrapper : {
        marginRight : 10,
    }
});

FullScreenModal.propTypes = {
    open    : PropTypes.bool,
    onClose : PropTypes.func,
    animation : PropTypes.string,
    disableScroll : PropTypes.bool,
};

export default FullScreenModal;