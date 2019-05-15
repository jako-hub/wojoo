import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from 'native-base';
import {
    StyleSheet,
} from 'react-native';

/**
 * This component allows to render a share button.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @deprecated
 */
class ShareGameButton extends React.PureComponent {

    render = () => { 
        return (
            <>
            <Button transparent style={styles.root} onPress = { () => this.props.onPress? this.props.onPress(this.props.gameCode) : null }>
                <Icon
                    style= { styles.icon }
                    name = "share-alt" 
                    size = { 20 }
                />
            </Button>
            </>
        );
    };
}

const styles = StyleSheet.create({
    root : {
        width               : 40,
        justifyContent      : "center",
        marginHorizontal    : 5,
    },
    icon : {

    },
});

ShareGameButton.propTypes = {
    gameCode : PropTypes.any,
    onPress : PropTypes.func,
};

export default ShareGameButton;