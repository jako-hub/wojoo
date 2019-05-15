import React from 'react';
import PropTypes from 'prop-types';
import MainAppBar from "../commons/MainAppBar";
import { UserInfoVerifier } from '../components';
import { withNavigationFocus } from 'react-navigation';
import { Linking } from 'react-native';
import { NotificationBar } from '../commons/notifies';
import FriendsSearchSuggester from '../components/friends-search-suggester';
/**
 * This component allows to use the same structure or layout for every that uses.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param navigation
 * @param children
 * @param title
 * @param header
 * @param allowBack
 * @returns {*}
 * @constructor
 */

 const mainRoutes = [
     'Home', 'MyGames', 'Search', 'Profile',
 ];

 class BaseScreen extends React.PureComponent {

     isMainScreen() {
        const currentRoute = this.props.navigation.state.routeName;
        if(mainRoutes.includes(currentRoute)){
            return false;
        }
        return true;
     }

     componentWillUnmount() {
        if(this.backHandler) {
            this.backHandler.remove();
        }        
     }

     goBack() {
         const {navigation} = this.props;
         const {goToHome} = navigation.state.params||{};

         if(goToHome) {
             Linking.openURL("jakoapp://home");
         } else {
             navigation.goBack(null);
         }
     }
     render() {
        const {
            navigation, 
            disableNotify, 
            allowBack, 
            children, 
            title, 
            header=true, 
            TitleComponent, 
            isFocused,
            enableFriendSuggester,
            allowUserStatus,
        } = this.props;
        
        return (
            <>
                {header && (
                    <MainAppBar
                        allowBack       = {allowBack}
                        allowUserStatus = {allowUserStatus}
                        goBack          = {this.goBack.bind(this)}
                        navigation      = {navigation}
                        title           = {title}
                        TitleComponent  = {TitleComponent}
                        disableNotify   = { disableNotify }
                    />
                )}
                {children}
                {isFocused && (<UserInfoVerifier enableFriendSuggester={enableFriendSuggester} navigation = {navigation}/>)}
                {/*enableFriendSuggester && <FriendsSearchSuggester navigation = {navigation} />*/}
                {/*<NotificationBar navigation = { navigation } />*/}
            </>
        )
     }
 }

BaseScreen.propTypes = {
    navigation  : PropTypes.object.isRequired,
    title       : PropTypes.any,
    header      : PropTypes.bool,
    allowBack   : PropTypes.bool,
    TitleComponent : PropTypes.any,
    isFocused     : PropTypes.bool,
    disableNotify : PropTypes.bool,
    enableFriendSuggester : PropTypes.bool,
    allowUserStatus : PropTypes.bool,
};
export default withNavigationFocus(BaseScreen);