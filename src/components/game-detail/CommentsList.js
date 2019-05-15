import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Right,
    Body,
} from 'native-base';
import moment from 'moment';
import { LoadingSpinner, } from '../../commons/loaders';
import {DEFAULT_USER_IMG, IMAGES_SERVER} from 'react-native-dotenv';

const Comment = ({jugador_seudonimo, foto, comentario, fecha}) => {
    const formattedDate = moment(fecha).format("YY/MM/DD HH:mm");
    return (
        <ListItem avatar style={styles.comment} noBorder> 
            <Left>
                {/* foto_usuario && (<Thumbnail style={{width : 35, height :35}} source={{uri : foto_usuario}}/>) */}
                {/* !foto_usuario && <View style={styles.iconUser}><Icon name="user" size={20}/></View> */}
                <Thumbnail source={{uri : foto? `${IMAGES_SERVER}${foto}` : DEFAULT_USER_IMG}} />
            </Left>
            <Body>
                <Text style={styles.userName}>{jugador_seudonimo}</Text>
                <Text note>{comentario}</Text>
            </Body>
            <Right>
                <Text style={{fontSize : 10}} note>{formattedDate}</Text>
            </Right>
        </ListItem>
    );
};

const NoComments = () => (
    <View style={styles.rootNoComments}>
        <Text>No hay comentarios</Text>
    </View>
);

const Loader = () => (
    <View style={styles.loading}>
        <View>
            <LoadingSpinner />
            <Text>Consultando comentarios</Text>
        </View>
    </View>
);

const CommentsList = ({comments=[], loading}) => {
    if(loading) return (<Loader />);
    if(comments.length === 0 ) return (<NoComments />);

    return (
        <View style={styles.root}>
            <List>
                {comments.map((comment) => (
                    <Comment {...comment} key={`comment-list-item-${comment.codigo_comentario}`} />
                ))}
            </List>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {

    },
    comment : {
        paddingVertical : 0,
        marginVertical : 0,
    },
    rootNoComments : {
        flex : 1,
        alignItems : "center",
        marginTop : 10,
    },
    loading : {
        flex : 1,
        alignItems : "center",
        marginTop : 10,
    },
    iconUser : {
        backgroundColor : "#e0e0e0",
        padding : 10,
        width : 30,
        height : 30,
        justifyContent : "center",
        alignItems : "center",
        borderRadius : 50,
    },
    userName : {
        fontWeight : "bold",
    }
});

CommentsList.propTypes = {
    comments : PropTypes.array,
    loading : PropTypes.bool,
};

export default CommentsList;