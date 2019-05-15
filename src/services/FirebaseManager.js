import React from 'react';
import PropTypes from 'prop-types';
import { withSession, withApi, withNotifies } from '../providers';
import firebase from 'react-native-firebase';
import { addMessage, consoleError } from '../utils/functions';
import endpoints from '../configs/endpoints';

class FirebaseManager extends React.PureComponent {

    componentDidMount() {
        this.checkpermission();
        this.createNotificationListeners();
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(token => this.refreshToken(token));
    }


    //Remove listeners allocated in createNotificationListeners()
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
        this.onTokenRefreshListener();
    }

    refreshToken(fcmToken) {
        const {firebaseData} = this.props.sessionStack;
        this.props.sessionWrite("firebaseData", {...firebaseData, fcmToken});
        this.saveToken(fcmToken);
    }

    async createNotificationListeners() {
        /**
         * This function triggers a simple notification in the application in foreground.
         */
        this.notificationListener = firebase.notifications().onNotification(notification => {
            const {title, body, data} = notification;
            this.props.notify({
                title,
                message : body,
                action  : data.action === "yes",
                type    : data.type,
                path    : data.path,
                path_data : data.path_data,
                property_name : data.property_name,
            });
        });

        /**
         * If your application is in background you can listen for when a notification is tapped.
         */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
            const data  = notificationOpen.notification.data;
            const { title, body} = data;
            setTimeout(() => {
                this.props.notify({
                    title,
                    message : body,
                    action  : data.action === "yes",
                    type    : data.type,
                    path    : data.path,
                    path_data : data.path_data,
                    property_name : data.property_name,
                });
            }, 1000);
        });

        /**
         * if the application is closed, you can check if it was opened by a notification.
         */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const data = notificationOpen.notification.data
            const { title, body } = data;
            setTimeout(() => {
                this.props.notify({
                    title,
                    message : body,
                    action  : data.action === "yes",
                    path    : data.path,
                    type    : data.type,
                    path_data : data.path_data,
                    property_name : data.property_name,
                });
                firebase.notifications().removeAllDeliveredNotifications();
            }, 1000);
        }

       /*
        * Triggered for data only payload in foreground
        * */
        this.messagelistener = firebase.messaging().onMessage((message) => {
            console.log("Backgroun message: ", message);
        });
    }


    showAlert(title, body) {
        addMessage(`${title} ${body}`);
    }
    
    /**
     * This function allows to ask for permission to firebase.
     *
     * @memberof FirebaseManager
     */
    async checkpermission() {
        const enabled = await firebase.messaging().hasPermission();
        if(enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    printMessage(message) {
        console.group("Firebase manager: ");
        console.log(message);
        console.groupEnd();
    }

    /**
     * This function validates and stores the firebase messaging cloud.
     *
     * @memberof FirebaseManager
     */
    async getToken() {    
        try {
            const {firebaseData={}} = this.props.sessionStack;
            let fcmToken = firebaseData.fcmToken;
            if(!fcmToken) {
                fcmToken = await firebase.messaging().getToken();
                if(fcmToken) {                
                    this.saveToken(fcmToken);
                    this.props.sessionWrite("firebaseData", {...firebaseData, fcmToken});                
                    this.printMessage("Token stored!");
                } else {
                    this.printMessage("Cannot get the token");
                }
            } else {
                this.printMessage("Token available");
            }
        } catch (error) {
            addMessage("Ocurrió un error al almacenar el token");
            consoleError(error);
        }
    }

    saveToken(token) {
        const {userCode:usuario} = this.props;
        this.props.doPost(endpoints.usuarios.guardarTokenFCM, {
            usuario,
            token,
        })
        .then(response => {
            const {error, error_controlado} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error inesperado");
                console.log(response);
            } else {
                console.log("Se almacenó correctamente el token de fb");
            }
        })
        .catch(err => {
            addMessage("Ocurrió un error inesperado");
            console.log("error: ", error);
        });
    }

    /**
     * This function request permissions to the firebase messaging cloud.
     *
     * @memberof FirebaseManager
     */
    async requestPermission() {
        try {
            await firebase.messaging.requestPermission();
            this.getToken();
        } catch(err) { 
            console.log("Error: ", err);
        }
    }

    render () {
        return null;
    }
}

FirebaseManager.propTypes = {
    Navigator           : PropTypes.any,
    sessionWrite        : PropTypes.func,
    sessionWriteAll     : PropTypes.func,
    sessionStack        : PropTypes.object,
    userCode        : PropTypes.any,
    doPost          : PropTypes.func,
    notify          : PropTypes.func,
    removeNotify    : PropTypes.func,
    popNotify       : PropTypes.func,
    notifies        : PropTypes.arrayOf(PropTypes.shape({
        id          : PropTypes.any,
        title       : PropTypes.string,
        body        : PropTypes.string,
    })),
};

export default withSession(withApi(withNotifies(FirebaseManager)));