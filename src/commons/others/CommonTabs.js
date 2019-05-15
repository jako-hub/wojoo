import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    Tabs,
    Tab,
    Text,
} from 'native-base';
import stylesPalette from '../../utils/stylesPalette';

/**
 * This component allows to render a simple tab
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const CommonTabs = ({id, tabs=[], onChangeTab, tab}) => {
    return (
        <Tabs
            tabContainerStyle       = { {elevation:0} }
            tabBarUnderlineStyle    = { styles.tabUnderLine }
            onChangeTab             = { onChangeTab }
            page                    = { tab         }
        >
            {tabs.map((tab, key) => (
                <Tab 
                    heading             = { tab.label } 
                    key                 = {`Custom-tab-${id}-${key}`}
                    tabStyle            = { styles.tabDefault } 
                    textStyle           = { styles.tabText    }
                    activeTabStyle      = { styles.tabActive  }                                
                    activeTextStyle     = { styles.tabActiveText }
                >
                    { tab.component }
                </Tab>
            ))}
        </Tabs>
    )
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    tabDefault : {
        backgroundColor : "#FFF",
        shadowColor : "#eee121"
    },
    tabActive : {
        backgroundColor : "#e0e0e0",
    },
    tabActiveText : {
        color : "#000",
    },
    tabText : {
        color : "#bdbdbd"
    },
    tabUnderLine : {
        backgroundColor : palette.primary.color,
    },
});

CommonTabs.propTypes = {
    id      : PropTypes.string.isRequired,
    tabs    : PropTypes.arrayOf(PropTypes.shape({
        label       : PropTypes.string,
        component   : PropTypes.component,
    })),
    onChangeTab : PropTypes.func,
    tab : PropTypes.number,
};

export default CommonTabs;