import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Animated,    
} from 'react-native';
import { 
    View,
    Text,
 } from 'native-base';
import { PrettyButton } from '../forms';

/**
 * This component renders a button that appears from the bottom.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class AnimatedButtonBottom extends React.PureComponent {
    animVal = 0;
    
    constructor(props) {
        super(props);
        this.animVal = new Animated.Value(-80);
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        Animated.timing(this.animVal, {
            toValue     : 0,
            duration    : 800,
        }).start();
    }

    render() {
        const {label, onPress, message, removeOpacity} = this.props;
        const containerStyles = [
            styles.root,
            { bottom : this.animVal },
            (removeOpacity? styles.removeOpacity : null),
        ];
        return (
            <Animated.View style = { containerStyles }>
                <View style = { styles.textWrapper }>
                    {message && (<Text style = { styles.text }>{message}</Text>)}
                </View>
                <View style = { styles.action }>                    
                    <PrettyButton primary onPress = { onPress } >
                        {label}
                    </PrettyButton>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        position        : "absolute",
        justifyContent : "center",
        width           : "100%",
        height          : 80,
        bottom          : 0,
        backgroundColor : "rgba(255,255,255,0.5)",
        borderTopColor : "#e0e0e0",
        borderTopWidth : 1,        
    },
    action : {
        flexDirection : "row",
        justifyContent : "center",
    },
    textWrapper : {
        flexDirection : "row",
        justifyContent : "center",
        marginBottom : 10,
    },
    text : {
        textAlign : "center",
    },
    removeOpacity : {
        backgroundColor : "rgba(255,255,255,1)",
    },
});

AnimatedButtonBottom.propTypes = {
    onPress         : PropTypes.func,
    label           : PropTypes.string,
    message         : PropTypes.string,
    removeOpacity   : PropTypes.bool,
};

export default AnimatedButtonBottom;