import React, { Component } from 'react';
import {
    ScrollView,
} from 'react-native';
import {
    DrawerItems,
} from 'react-navigation';

/**
 * This component draws the main drawer options.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class MainDrawer extends Component {
    render() {
        const {items, ...restProps} = this.props;
        return (
            <ScrollView>
                <DrawerItems items={items} {...restProps}/>
            </ScrollView>
        );
    }
}

export default MainDrawer;