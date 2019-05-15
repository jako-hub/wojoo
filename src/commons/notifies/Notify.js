import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Text,
    View,
} from 'native-base';
import { 
    StyleSheet,    
    Animated,
    TouchableOpacity,
} from 'react-native';
import { IconButton } from '../forms';

class Notify extends React.PureComponent {
    animValue = 0;
    constructor(props) {
        super(props);
        this.animValue = new Animated.Value(-60);
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        Animated.timing(this.animValue, {
			toValue: 5,
			duration: 500,
		}).start();
    }

    render() {
        const { title, message, onClose, onResolve, } = this.props;
        const notifyStyles = [
            styles.notify,
            {
                transform : [
                    {translateY : this.animValue}
                ],
            }
        ];

        return (
            <Animated.View style = { notifyStyles }>
                <View style = { styles.mainWrapper }>
                    <View style = { styles.iconWrapper }>
                        <Icon name = "futbol" size={25} />
                    </View>
                    <View style = { styles.bodyWrapper }>
                        <Text>
                            {title}
                        </Text>
                        <Text note>
                            {message}
                        </Text>                        
                    </View>
                    <View style = { styles.actionWrapper }>
                        <IconButton 
                            icon = "times"
                            size = { 20 }
                            onPress = { onClose }
                        />
                    </View>                    
                </View>
                <View style = {styles.callToAction}>
                    <TouchableOpacity 
                        style = {styles.callToActionButton}
                        onPress = { onResolve }
                    >
                        <View style = {styles.callToActionButton}>
                            <Text style = { styles.callToActionText }>
                                Ver
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    notify : {
        height : 80,
        backgroundColor : "#FFF",
        elevation:4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginHorizontal : 5,
        borderRadius : 10,
    },
    callToAction : {
        justifyContent : "center",
        alignItems : "center",
        flex : 1,
    },  
    callToActionButton : {
        flex : 1,
        flexDirection : "row",
        width : "100%",
        justifyContent : "center",
    },
    callToActionText : {
        textAlign : "center",
        fontSize : 15,
    },
    iconWrapper : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
    },
    icon : {

    },
    bodyWrapper : {
        flex : 7,
        alignItems : "flex-start",
        justifyContent : "center",
        paddingLeft : 15,
    },    
    actionWrapper : {
        flex : 2,
        alignItems : "flex-end",
        justifyContent : "center",
        opacity : 0.6,
    },
    mainWrapper : {
        flex : 1,
        padding : 10,
        flexDirection: "row",
        justifyContent : "space-between"
    }
});

Notify.propTypes = {
    message : PropTypes.string,
    title   : PropTypes.string,
    onClose : PropTypes.func,
    onResolve : PropTypes.func,
};

export default Notify;