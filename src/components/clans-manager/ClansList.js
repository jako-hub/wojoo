import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import {
    View,
} from 'native-base';
import ClanItem from './ClanItem';
import { SimpleLoader } from '../../commons/loaders';

/**
 * This component renders the presentation for a clan list.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} props 
 */
const ClansList = (props) => {
    const {
        clans = [],
        onPress,
        loading,
    } = props;
    let content = null;
    if(loading) {
        content = (<SimpleLoader />);
    } else {
        content = clans.map((item, key) => (
            <ClanItem 
                key     = { `clan-item-list-${key}` }
                name    = { item.clan_nombre        }
                rating  = { item.clan_rating        }
                code    = { item.codigo_clan        }
                onPress = { () => onPress? onPress(item) : null }
            />
        ));
    }    
    return (
        <View style = { styles.root }>
            <ScrollView horizontal>
                {content}
            </ScrollView>            
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        flexDirection       : "row",
        paddingHorizontal   : 10,
        marginVertical      : 10,
    },
});

ClansList.propTypes = {
    clans           : PropTypes.array,
    onSelectClan    : PropTypes.func,
    loading         : PropTypes.bool,
};

export default ClansList;