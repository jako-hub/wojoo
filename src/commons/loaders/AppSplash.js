import React from 'react';
import { 
    StyleSheet,
    View,
 } from 'react-native';
import { LoadingSpinner } from '.';

 const AppSplash = () => (
     <View style = { styles.root }>
        <LoadingSpinner />
     </View>
 );

 const styles = StyleSheet.create({
    root : {
        flex            : 1,
        justifyContent  : "center",
        alignItems      : "center",
    },
 });

 export default AppSplash;