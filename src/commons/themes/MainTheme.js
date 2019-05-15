import React, {PureComponent} from 'react';
import getTheme from '../../../native-base-theme/components';
import { StyleProvider } from 'native-base';

export default class MainTheme extends PureComponent {
    render() {
        return (
            <StyleProvider  style={getTheme()}>
                {this.props.children}
            </StyleProvider>
        );  
    }
};