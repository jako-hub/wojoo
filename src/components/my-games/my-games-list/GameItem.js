import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Text,
    View,
    Card,
    CardItem,
    Body,
} from 'native-base';
import PropTypes from 'prop-types';
import ItemHeader from './ItemHeader';
import ItemFooter from './ItemFooter';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CommentsList from './CommentsList';

const RenderRow = ({title, value, icon}) => (
    <View style={styles.row}>
        <View style={styles.info}><Text>{icon && (<Icon size={15} name={icon}/>)}{icon? ` ${title}` : title}</Text></View>
        <View style={styles.value}><Text>{value}</Text></View>
    </View>
);

class GameItem extends React.Component {
    state = {
        viewComments : false,
    };

    toggleComments() {
        this.setState({
            viewComments : !this.state.viewComments,
        });
    }

    renderComments(comentarios) {
        if(!this.state.viewComments) return null;
        return ( <CommentsList comments={comentarios} /> );
    }

    render () {
        const {
            nombre,
            confirmados,
            jugadores,
            fecha,
            escenario,
            anfitrion,
            comentarios,
            tipo,
        } = this.props.item||{};
        return (
            <Card noShadow bordered style={styles.root}>
                <CardItem header style={styles.header}>
                    <ItemHeader
                        title               = {nombre}
                        confirmedPlayers    = {confirmados}
                        totalPlayers        = {jugadores}
                        date                = {fecha}
                    />
                </CardItem>
                <CardItem cardBody>
                    <Body style={styles.body}>
                    <RenderRow title={escenario.ubiacion} value={escenario.negocio}/>
                    <RenderRow icon={"user"} title={anfitrion.usuario} value={tipo}/>
                    </Body>
                </CardItem>
                <CardItem footer>
                    <ItemFooter
                        onToggleComments    = {() => this.toggleComments()}
                        totalComments       = {comentarios.length}
                    />
                </CardItem>
                {this.renderComments(comentarios)}
            </Card>
        )
    };
}

const styles = StyleSheet.create({
    root : {
        marginVertical : 2,
    },
    body : {
        flex                : 1,
        paddingHorizontal   : 15,
        paddingRight        : 30,
    },
    row : {
        flex            : 1,
        justifyContent  : "space-between",
        flexDirection   : 'row',
        marginBottom    : 5,
    },
    info : {
        flex : 1,
    },
    value : {
        flex        : 1,
        alignItems  : "flex-end",
    },
});

GameItem.propTypes = {
    item : PropTypes.shape({
        codigo      : PropTypes.any,
        nombre      : PropTypes.string,
        fecha       : PropTypes.string,
        tipo        : PropTypes.string,
        jugadores   : PropTypes.number,
        confirmados : PropTypes.number,
        escenario : PropTypes.shape({
            codigo      : PropTypes.any,
            negocio     : PropTypes.string,
            ubiacion    : PropTypes.string,
        }),
        anfitrion : PropTypes.shape({
            usuario     : PropTypes.string,
            foto        : PropTypes.string,
            codigo      : PropTypes.any,
        }),
        comentarios : PropTypes.arrayOf(PropTypes.shape({
            usuario : PropTypes.object,
            comment : PropTypes.string,
        })),
    }),
};

export default GameItem;