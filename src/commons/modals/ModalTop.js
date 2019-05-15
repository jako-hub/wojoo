import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * This component renders a modal attached to top.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const ModalTop = ({open, icon, onClose, animation="fade", children, title}) => (
    <Modal
        visible         = {open}
        onRequestClose  = {onClose}
        animationType   = {animation}
        transparent
    >
        <View style={styles.backDrop}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style = { styles.titleHolder }>
                        {icon? (<Icon style = { styles.icon } name = {icon} size = {23} />) : null}
                        <Text style={styles.headerText}>
                            {title}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={onClose}>
                            <View style={styles.button}>
                                <Icon name="times" size={20}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    {children}
                </ScrollView>                                    
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    backDrop : {
        backgroundColor     : "rgba(0,0,0,0.3)",
        flex                : 1,
        alignItems          : "center",
        justifyContent      : "flex-start",
    },
    icon : {
        marginRight : 10,
    },
    content : {
        backgroundColor : "#FFF",        
        marginHorizontal : 5,
        width : "100%",
        maxHeight : "90%",
        paddingBottom : 10,
    },
    header : {
        padding : 20,
        flexDirection : "row",
        justifyContent : "space-between",
    },
    headerText : {
        textAlign : "center",        
    },      
    button : {
        width : 30,
        height : 30,
        justifyContent : "center",
        alignItems : "center",
    },
    buttonWrapper : {
        flex : 1,
        padding : 10,
        marginBottom : 30,
        flexDirection : "row",
        justifyContent : "center", 
        alignItems : "center",
        backgroundColor : "#FFF",
    },
    titleHolder : {
        flexDirection : "row",
        alignItems : "center",
    },
});

ModalTop.propTypes = {
    open    : PropTypes.bool,
    onClose : PropTypes.func,
    animation : PropTypes.string,
};

export default ModalTop;