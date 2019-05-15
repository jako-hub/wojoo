import React, {useState} from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { SimpleTouch } from '../../commons/touchables';
import { LoadingSpinner } from '../../commons/loaders';

const width = Dimensions.get('window').width;

/**
 * This component renders a modal attached to top.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const ViewUserPhoto = ({open, icon, imageUrl, thumb, onClose, animation="fade", children, title}) => {
    const [loading, setLoading] = useState(true);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);
    return (
        <Modal
            visible         = {open}
            onRequestClose  = {onClose}
            animationType   = {animation}
            transparent
        >
            <View style={styles.backDrop}>            
                <View style={styles.header}>
                    <View>
                        <SimpleTouch wrapType = "stretch"  onPress={onClose}>
                            <View style={styles.button}>
                                <Icon name="times" size={18}/>
                            </View>
                        </SimpleTouch>
                    </View>
                </View>
                <View style = { styles.content }>
                    {loading && (
                        <View style = { styles.loaderWrapper }>
                            <Image 
                                resizeMode = { 'contain' }
                                style = { styles.image }
                                source = { {uri : thumb} } 
                            />
                            <View style = { styles.spinnerWrapper }>
                                <LoadingSpinner />
                            </View>
                        </View>
                    )}
                    <Image 
                        resizeMode = { 'contain' }
                        style = { styles.image }
                        source = { {uri : imageUrl} }
                        onLoadStart = { () => startLoading() }
                        onLoadEnd = { () => stopLoading() }
                    /> 
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backDrop : {
        backgroundColor     : "rgba(0,0,0,0.8)",
        flex                : 1,
        alignItems          : "center",
        justifyContent      : "flex-start",
    },
    icon : {
        marginRight : 10,
    },
    image : {
        width : width,
        height : width,
    },
    content : {
        flex : 1,
        width : "100%",
        height : "100%",
        justifyContent : "center",
        alignItems : "center",
    },
    loader : {
        
    },
    loaderWrapper : {
        justifyContent : "center",
        alignItems : "center",
    },
    spinnerWrapper : {
        position : "absolute",
    },
    header : {
        width : "100%",
        backgroundColor : "#FFF", 
        padding : 20,
        alignItems : "flex-end",
    },
    headerText : {
        textAlign : "center",        
    },      
    button : {
        width : 20,
        height : 20,
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
});

ViewUserPhoto.propTypes = {
    open    : PropTypes.bool,
    onClose : PropTypes.func,
    animation : PropTypes.string,
};

export default ViewUserPhoto;