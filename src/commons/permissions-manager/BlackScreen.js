import React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { PrettyButton } from '../forms';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BlackScreen = ({onRequestAgain}) => (
    <View style = { styles.root }>
        <View style = { styles.wrapper } >
            <Text note style = { styles.text }>
                Para esta funcionalidad necesitamos de algunos permisos
            </Text>
            <View style = { styles.buttonWrapper }>
                <PrettyButton onPress = { onRequestAgain } primary icon = { (<Icon name="lock-open" />) }>
                    Brindar permisos
                </PrettyButton>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    root : {
        backgroundColor : "#495057",
        flex            : 1,
        justifyContent  : "center",
        alignItems      : "center",
    },
    button : {
        marginTop : 15,
    },
    text : {        
        textAlign   : "center",
        color       : "#fff",
    },
    wrapper : {
        width : "70%",
        alignItems : "center",
    },
    buttonWrapper : {
        marginTop : 15,
    },
});

export default BlackScreen;