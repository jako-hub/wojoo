import React from 'react';
import {
    View,
    Text,
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import { PrettyButton } from '../../commons/forms';
import StepperItem from './StepperItem';


const Stepper = ({children, currentStep, onChangeStep, onDone }) => {
    const filteredChildren = children.filter((item) => item.type === StepperItem);
    const totalSteps = filteredChildren.length;

    const onNext = step => {
        onChangeStep(step + 1);
    };

    const onBack = step => {
        onChangeStep(step - 1);
    };
    
    const newChildren = React.Children.map(filteredChildren, (child, key) => (
        <child.type 
            {...child.props} 
            active      = { key === currentStep }
            number      = { key + 1 }
            totalSteps  = { totalSteps }
            onNext      = { onNext }
            onBack      = { onBack }
            onDone      = { onDone }
        />
    ));
     
    //const newChildren = filteredChildren;
    
    return (
        <View style = { styles.root }>
            {newChildren}
        </View>
    );
};

const styles = StyleSheet.create({
    root : {

    },
});

Stepper.propTypes = {
    
};

export default Stepper;