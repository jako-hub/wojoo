import React from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
} from 'native-base';
const ClanContent = ({children}) => (
    <View style = {styles.root} >
        {children}
    </View>
);
const styles = StyleSheet.create({
    root : {

    },
});

ClanContent.propTypes = {

};

export default ClanContent;