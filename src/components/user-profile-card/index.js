import React        from 'react';
import PropTypes    from 'prop-types'
import endpoints    from '../../configs/endpoints';
import Header       from './Header';
import GameResume   from './GamesResume';
import FriendsList  from './FriendsList';
import { withApi, withUserData        } from '../../providers';
import { LoadingSpinner } from '../../commons/loaders';
import { consoleError   } from '../../utils/functions';
import { 
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { CommonTabs } from '../../commons/others';
import { IMAGES_SERVER, DEFAULT_USER_IMG } from 'react-native-dotenv';
import FriendshipRequestButtons from '../friendship-requests-buttons';
import FriendshipRequestsReceived from '../my-profile/friendship-requests-received';
import ViewUserPhoto from './ViewUserPhoto';


const ErrorMessage = ({message}) => (
    <View style = { styles.error }>
        <Text style = { {textAlign : "center"} }>{message}</Text>
    </View>
);

/**
 * This component displays any user personal information.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 *
 * @class UserProfileCard
 * @extends {React.Component}
 */
class UserProfileCard extends React.Component {
    tabOptions = [

    ];

    state = {
        loading         : true,
        loadingFriends  : true,
        error   : null,
        userInfo: {
            codigo_jugador  : null,
            nombre_corto    : null,
            seudonimo       : null,
            correo          : null,
            juegos          : null,
            asistencia      : null,
            inasistencia    : null,
        },
        friends : [],
        userPhotoUrl : null,
        userPhotoThumbUrl : null,
    };

    constructor(props) {
        super(props);
        tabOptions = [
            {label : "Información", component : this.renderUserInfo() },
            {label : "Amigos",      component : null },
        ];
    }

    componentDidMount() {
        this.fetchUserInfo();
        if(this.props.isPlayer) {
            this.fetchMyFriends();
        }
    }

    async fetchUserInfo() {
        try {
            const response = await this.props.doPost(endpoints.jugador.detalle, {
                jugador : this.props.playerCode,
            })
            const { error:errorApi, error_controlado } = response;
            let userInfo = {};
            let error = null;
            
            if(errorApi || error_controlado) {
                error = "Ocurrió un error al obtener la información del usuario";
            } else {
                userInfo = response[0];
            }
            this.setState({
                userInfo,
                loading : false,
                error,
            });
        } catch(response) {
            consoleError("Getting user info: ", response);
            this.setState({
                loading : false,
                error   : "Ocurrió un error al obtener la información del usuario",
            });
        };
    }

    async fetchMyFriends() {
        this.setState({loadingFriends : true});
        const {playerCode, isPlayer} = this.props;
        const response = await this.props.fetchMyFriends(playerCode, isPlayer);
        const {error, error_controlado} = response;
        if(response !== false && !(error || error_controlado) ) {
            this.setState({loadingFriends : false, friends : response});
        } else {
            this.setState({loadingFriends : false});
        }            
    }

    onViewProfile({codigo_jugador_amigo:playerCode, seudonimo:playerAlias}) {
        this.props.navigation.navigate("PlayerProfile", {playerCode, playerAlias});
    }

    renderUserInfo() {
        const {optionsComponent} = this.props;
        return (
            <>                
                { optionsComponent }
            </>
        );
    }

    onRefresh() {
        this.fetchUserInfo();
        this.fetchMyFriends();
        this.props.fetchFriendshipRequest();
    }

    isFriend() {
        const { 
            friends,
            playerCode,
        } = this.props;
        const friend = friends.find(friend => friend.codigo_jugador_amigo === playerCode);
        return Boolean(friend);
    }

    requestSended() {
        const {me, playerCode, friendshipRequestsSended=[]} = this.props;
        if(me) return false;
        const player = friendshipRequestsSended.find(item => item.codigo_jugador === playerCode);
        return Boolean(player);
    }

    requestReceived() {
        const {me, playerCode, friendshipRequests=[]} = this.props;
        if(me) return false;
        const player = friendshipRequests.find(item => item.codigo_jugador === playerCode);
        return Boolean(player);
    }

    onViewPhoto() {
        const {me} = this.props;
        if(me) {
            this.setState({
                userPhotoThumbUrl : this.props.photo,
                userPhotoUrl : this.props.photoOriginal,
            });
        } else {
            const {foto, foto_original} = this.state.userInfo;
            this.setState({
                userPhotoThumbUrl : `${IMAGES_SERVER}${foto}`,
                userPhotoUrl : `${IMAGES_SERVER}${foto_original}`,
            });
        }
    }

    onClosePhoto() {
        this.setState({
            userPhotoUrl : null,
        });
    }

    renderCard() {
         const {
             userInfo : { 
                nombre_corto,
                seudonimo,
                foto,
                asistencia,
                inasistencia,
             },
             loadingFriends,
             friends=[],
             userPhotoUrl,   
             userPhotoThumbUrl,       
         } = this.state;
        const { 
            disableUpload, 
            openImagePicker,
            userPhoto,
            me,
            playerCode,
            navigation,
            isPlayer,
        } = this.props;        
        const userInfo = this.renderUserInfo();
        const requestSended = this.requestSended();
        const requestReceived = this.requestReceived();
        return (
            <>
                <Header 
                    onViewPhoto     = { this.onViewPhoto.bind(this) }
                    photo           = { me? userPhoto :  (foto? `${IMAGES_SERVER}${foto}` :  DEFAULT_USER_IMG) }
                    fullName        = { nombre_corto    }
                    alias           = { seudonimo       }
                    disableUpload   = { disableUpload   }
                    onSelectImage   = { openImagePicker }
                    isPlayer
                    isFriend        = { this.isFriend() }
                    playerCode      = { playerCode      }
                    me              = {me               }
                    onViewProfile   = { this.onViewProfile.bind(this) }
                    requestSended   = { requestSended   }
                    requestReceived = { requestReceived }
                    onEdit          = { () => this.toggleEdit() }
                />
                <GameResume 
                    assists     = { asistencia   }
                    absences    = { inasistencia }
                />
                {!isPlayer && (
                    <>
                    <FriendsList 
                        navigation      = { navigation }
                        fetchFriends    = { () => { this.fetchMyFriends() } } 
                        friends         = { friends }
                        loading         = { loadingFriends }
                        onViewProfile   = { this.onViewProfile.bind(this)   }
                    />
                    <FriendshipRequestsReceived onlyIfResults navigation = { navigation } />
                    {userInfo}
                    </>
                )}
                {userPhotoUrl && (
                    <ViewUserPhoto 
                        open = { true }
                        onClose = { this.onClosePhoto.bind(this) }
                        imageUrl = { userPhotoUrl }
                        thumb = { userPhotoThumbUrl }
                    />
                )}
            </>
        );
    }

    render() {
        const {
            loading,
            error,
        } = this.state;
        return (
            <ScrollView
                refreshControl  = {(
                    <RefreshControl 
                        refreshing = { loading   }
                        onRefresh  = { () => this.onRefresh() }
                    />
                )}
            >        
                <View style = { styles.root }>
                    {error && (<ErrorMessage message={error} />)}
                    {!loading && !error && (this.renderCard())}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        width : "100%",
        flex : 1,
    },
    error : {
        flex            : 1,
        justifyContent  : "center",
        paddingVertical : 15,
    },
});

UserProfileCard.propTypes = {
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    playerCode      : PropTypes.any,
    navigation      : PropTypes.any.isRequired,
    disableUpload   : PropTypes.bool,
    optionsComponent: PropTypes.any,
    fetchMyFriends  : PropTypes.func,
    friends         : PropTypes.array,
    fromOtherUser   : PropTypes.bool,
    openImagePicker : PropTypes.func,
    userPhoto       : PropTypes.string,
    me              : PropTypes.bool,
    isPlayer        : PropTypes.bool,
    friendshipRequests  : PropTypes.array,
    friendshipRequestsSended : PropTypes.array,
    fetchFriendshipRequest : PropTypes.func,
};

export default withApi(withUserData(UserProfileCard));