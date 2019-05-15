import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import store from './src/store/store';
import AppNavigator from './src/configs/navigators';
import { Provider as ReduxProvider } from 'react-redux';
import { Root } from 'native-base';
import { connect } from 'react-redux';
import { initializeSession } from './src/store/actions/session.actions';
//import { FirebaseManager } from './src/services';
import { AppSplash, ModalLoader } from './src/commons/loaders';
import { MainTheme } from './src/commons/themes';

const AppContainer = createAppContainer(AppNavigator);

const mapStateToProps = ({global, session}) => ({
    loading : global.loadingState,
    reading : session.reading,
    logged  : session.logged,
});

class AppComponent extends React.PureComponent {
    componentDidMount() {
        store.dispatch(initializeSession());
    }    
    render() {
        const {loading, reading, logged} = this.props;
        if(reading) return (<AppSplash />);
        return (
            <>
                <AppContainer/>
                {/* (!reading && logged) && (<FirebaseManager />) */}
                {loading && (<ModalLoader />)}
            </>
        );
    }
}

const AppWrapper = connect(mapStateToProps, null)(AppComponent);

/**
 * This is the main application component, here we can put every component we need to
 * keep alive.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
export default class App extends Component {
    render() {
        return (
            <ReduxProvider store={store}>
                <MainTheme>
                    <Root>                                    
                        <AppWrapper/>
                    </Root>
                </MainTheme>
            </ReduxProvider>
        );
    }
}