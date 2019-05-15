import React from 'react';
import { StyleSheet } from 'react-native';
import {
    List,
    ListItem,
    Text,
    View,
    Left,
    Body,
} from 'native-base';
import PropTypes from 'prop-types';

const CommentsList = ({comments=[]}) => {
    if(comments.length === 0) return ( <View style={styles.noCommentsContainer}><Text note>No hay comentarios</Text></View> );
    return (
        <List>
            {comments.map((comment, key) => (
                <ListItem key={`comment-item-${comment.code}-${key}`}>
                    <Left style={styles.userInfo}>
                        <Text>{comment.usuario.nombre}</Text>
                    </Left>
                    <Body style={styles.comment}>
                        <Text note>{comment.comentario}</Text>
                    </Body>
                </ListItem>
            ))}
        </List>
    )
};

const styles = StyleSheet.create({
    noCommentsContainer : {
        alignItems: "center",
        paddingVertical : 15,
    },
    userInfo : {
        flex : 3
    },
    comment : {
        flex : 9,
    },
});

CommentsList.propTypes = {
    comments : PropTypes.arrayOf(PropTypes.shape({
        codigo : PropTypes.any,
        usuario : PropTypes.shape({
            codigo : PropTypes.any,
            nombre : PropTypes.string,
        }),
        comentario : PropTypes.string,
    })),
};

export default CommentsList;