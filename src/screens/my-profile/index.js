import React from 'react';
import BaseScreen from '../BaseScreen';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { MyProfileComponent } from '../../components';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class MyProfileScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <BaseScreen 
                navigation={navigation} title={_t('my_profile_title_1')} 
                allowUserStatus
            >
                <MyProfileComponent navigation = { navigation } />
            </BaseScreen>
        );
    }
}

MyProfileScreen.propTypes = {
    navigation : PropTypes.object,
};

export default MyProfileScreen;