import React from 'react';
import PropTypes from 'prop-types';
import stylesPalette from '../../utils/stylesPalette';
import {
    View,
    Text,
} from 'native-base';
import {
    StyleSheet, 
} from 'react-native';

const NewsPost = ({item, date}) => (
    <View style = {styles.rootGame}>
        <View style = {styles.wrapper}>
            <View style = {styles.textWrapper}>
                <Text style = { styles.postText }>{item.texto}</Text>
                <Text note style = {{fontSize : 12, marginTop : 10}}>
                    {date}
                </Text>
            </View>
        </View>        
    </View>
);

const styles = StyleSheet.create({
    iconWrapper : {
        borderRadius : 50,        
    },
    rootGame : {
        flex : 1,
        paddingLeft : 15,
    },
    wrapper : {
        flex : 1,
        flexDirection : "row",
        padding : 15,
        paddingLeft : 15,
    },
    iconSafeArea : {

    },
    iconWrapper : {
        flex : 2,
        justifyContent : "center",
    },
    textWrapper : {
        flex : 10,
        justifyContent : "flex-start",
        paddingLeft : 20,
    },
    postText : {
        fontSize : 12,
    },
});

export default NewsPost;