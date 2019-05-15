import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Animated,    
} from 'react-native';
import { 
    Text,
    View,
 } from 'native-base';
import { PrettyButton } from '../../commons/forms';

/**
 * This component renders the selection button.
 */
class SelectButton extends React.PureComponent {
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
        const {selected, onSelect} = this.props;
        return (
            <Animated.View style = { containerStyles }>
                <View style = { styles.action }>
                    <PrettyButton primary onPress = { onSelect } >
                        Seleccionar {selected} {`contacto${selected > 1? 's' : ''}`}
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

SelectButton.propTypes = {
    onSelect    : PropTypes.func,
    selected    : PropTypes.number,
};

export default SelectButton;