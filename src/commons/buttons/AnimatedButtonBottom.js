import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Animated,    
} from 'react-native';
import { 
    View,
 } from 'native-base';
import { PrettyButton } from '../forms';

/**
 * This component renders a button that appears from the bottom.
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
        const containerStyles = [
            styles.root,
            { bottom : this.animVal }
        ];
        const {label, onSelect} = this.props;
        return (
            <Animated.View style = { containerStyles }>
                <View style = { styles.action }>
                    <PrettyButton primary onPress = { onSelect } >
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
});

AnimatedButtonBottom.propTypes = {
    onSelect    : PropTypes.func,
    title       : PropTypes.string,
};

export default AnimatedButtonBottom;