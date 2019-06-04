import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import stylesPalette from '../../utils/stylesPalette';
import { PrettyButton } from '../../commons/forms';

/**
 * This component renders a simple stepper for the game creation.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const StepperItem = ({children, active, passed, passedValue, title, number, disableNext, totalSteps, onNext, onBack, onDone}) => {
    const numberStyles = [
        styles.numberHolder,
        active? styles.numberHolderActive : null,        
    ];
    const childrenWrapperStyles = [
        styles.childrenWrapper,
        number === totalSteps? styles.lastChild : null, // last child styles
    ];
    return (
        <View style = { styles.root }>
            <View style = { styles.titleWrapper }>
                <View style = { numberStyles }>
                    <Text style = {styles.numberText}>{number}</Text>
                </View>
                <View style = { styles.contentTextWrapper }>
                    <Text>{title}</Text>
                </View>
            </View>
            <View style = { styles.contentWrapper}>
                <View style = { childrenWrapperStyles }>
                    {active && (
                        <>
                        {children}
                        <View style = { styles.buttonsWrapper }>
                            {number > 1 && (
                                <PrettyButton small onPress = { () => onBack(number) }>
                                    Atrás
                                </PrettyButton>
                            )}
                            {number < totalSteps && (
                                <PrettyButton disabled = { disableNext } small primary onPress = { () => onNext(number) }>
                                    Siguiente
                                </PrettyButton>
                            )}
                            {number === totalSteps && (
                                <PrettyButton disabled = { disableNext }  small primary onPress = { onDone }>
                                    Terminar
                                </PrettyButton>
                            )}
                        </View>
                        </>
                    )}
                    {passed && !active && (
                        <View style = { styles.passedText }>
                            <Text style = {styles.textPassed}>
                                {passedValue}
                            </Text>
                        </View>
                    )}
                </View>
            </View>            
        </View>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {

    },
    passedText : {

    },
    textPassed : {

    },
    lastChild : {
        borderLeftWidth : 0,
    },
    buttonsWrapper : {
        flexDirection : "row",
        justifyContent : "center",
        paddingVertical : 15,
    },
    numberHolderActive : {
        backgroundColor : palette.primary.color,
    },
    contentWrapper : {
        paddingLeft : 15,
    },
    childrenWrapper : {  
        borderLeftColor : palette.accent.divider,      
        borderLeftWidth : 1,        
        paddingVertical : 10,
        paddingLeft     : 20,
        zIndex : 1000,
    },
    titleWrapper : {
        flexDirection : "row",

    },
    numberHolder : {
        backgroundColor : palette.primary.light,
        padding : 10,
        width : 30,
        height : 30,
        borderRadius : 150,
        justifyContent : "center",
        alignItems : "center",
        marginRight : 10,
    },
    numberText : {
        color : "#fff",
    },
    contentTextWrapper : {
        justifyContent : "center",
    },
});

StepperItem.propTypes = {
    active      : PropTypes.bool,
    title       : PropTypes.string,
    disableNext : PropTypes.bool,
};

export default StepperItem;