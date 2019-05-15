import React from 'react'
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { withGames, withSearch } from '../../providers';
import {SimpleHeader} from '../../commons/containers';
import { LoadingSpinner } from '../../commons/loaders';
import {DEFAULT_USER_IMG, IMAGES_SERVER} from 'react-native-dotenv';
import { PrettyButton } from '../../commons/forms';
import moment from 'moment';
import { SimpleTouch } from '../../commons/touchables';

const GameItem = ({playerPhoto, onView, onAccept, onReject, date, playerName}) => {
    const realDate = moment(date).format("YYYY-MM-DD h:mm a");
    return (
        <View style = { styles.listItem }>
            <View style = { styles.imageWrapper }>
                <SimpleTouch onPress = { onView } >
                    <Image 
                        style = { styles.image }
                        source = {{uri : playerPhoto? `${IMAGES_SERVER}${playerPhoto}` : DEFAULT_USER_IMG}} 
                    />
                </SimpleTouch>
            </View>
            <View style = { styles.contentWrapper }>
                <SimpleTouch wrapType = "stretch" onPress = { onView }>
                    <Text style = {styles.contentTitle}>{playerName} te invita a un juego</Text>                    
                    <Text note>Dia: {realDate}</Text>
                </SimpleTouch>
            </View>
            <View style = { styles.actionsWrapper }>
                <PrettyButton small primary onPress = { onAccept }>
                    Si
                </PrettyButton>
                <PrettyButton small onPress = { onReject }>
                    No
                </PrettyButton>
            </View>
        </View>
    );
};

/**
 * This component allows to handle the game invitations
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class GameInvitations extends React.PureComponent {
    state = {
        invitations     : [],
        loading         : false,
    };

    componentDidMount() {
        this.fetchGames();
    }

    /**
     * This function fetchs the game invitations.
     */
    async fetchGames() {
        this.setState({loading : true});
        await this.props.fetchGameInvitations();
        this.setState({loading : false});
    }

    renderLoader() {
        return (
            <View style = { styles.loading }>
                <LoadingSpinner />
            </View>
        );
    }

    onAcceptInvitation(selectedGame) {
        const {navigation, onAccept} = this.props;
        if(onAccept) onAccept();
        navigation.navigate("JoinToGame", {selectedGame});
    }

    async onRejectInvitation({codigo_juego_invitacion}) {
        const {startLoading, stopLoading} = this.props;
        startLoading();
        await this.props.rejectGameInvitation(codigo_juego_invitacion);
        stopLoading();
    }

    onViewInvitation({codigo_juego}) {
        const {navigation, onView} = this.props;
        this.props.selectGame({codigo_juego,});
        if(onView) onView();
        navigation.navigate("GameDetail", {});
    }

    renderList() {
        const invitations = this.props.gameInvitations||[];
        return (
            <View style = { styles.list }>
                {invitations.length === 0 && (
                    <View style = {{paddingVertical : 20,}}>
                        <Text note style = { {textAlign :  "center"} }>
                            No tienes invitaciones a juegos
                        </Text>
                    </View>
                )}
                {invitations.map((item, key) => (
                    <GameItem 
                        key         = {`game-invitation-item-${key}`}
                        playerName  = { item.jugador_seudonimo  }
                        playerPhoto = { item.jugador_foto       }
                        date        = { item.juego_fecha        }
                        onAccept    = { () => this.onAcceptInvitation(item) }
                        onReject    = { () => this.onRejectInvitation(item) }
                        onView      = { () => this.onViewInvitation(item)   }
                    />
                ))}
            </View>
        );
    }

    render(){ 
        const loading = this.state.loading;
        let content = null;
        if(loading) content = this.renderLoader();
        else content = this.renderList();
        return (
            <View style = { styles.root }>
                <SimpleHeader title = "Invitaciones a juegos" />
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {

    },
    loading : {

    },
    listItem : {
        marginVertical  : 10,
        flexDirection   : "row",
        alignItems      : "center",
        justifyContent  : "center",
    },
    image : {
        width           : 30,
        height          : 30,
        backgroundColor : "#e0e0e0",
        borderRadius    : 100,
    },
    imageWrapper : {
        flex            : 2,
        justifyContent  : "center",
        alignItems      : "center",
    },
    contentWrapper : {
        flex        : 12,
        paddingLeft : 10,
    },
    actionsWrapper : {
        flexDirection   : "row",
        flex            : 7,
        alignItems : "center",
        justifyContent : "center",
    },
    contentTitle : {
        fontSize : 14,
    },
});

GameInvitations.propTypes = {
    navigation              : PropTypes.any.isRequired,
    fetchGameInvitations    : PropTypes.func,
    gameInvitations         : PropTypes.array,
    selectedGame            : PropTypes.object,
    startLoading            : PropTypes.func,
    stopLoading             : PropTypes.func,
    rejectGameInvitation    : PropTypes.func,
    onView                  : PropTypes.func,
};

export default withGames(withSearch(GameInvitations));