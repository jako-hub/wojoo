
import React from 'react';
import { connect } from 'react-redux';
import { sessionWrite, sessionWriteAll, logout, login } from "../store/actions/session.actions";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => bindActionCreators({
    sessionWrite,
    sessionWriteAll,
    logout,
    login,
}, dispatch);

const mapStateToProps = (states) => {
    return {
        sessionStack : states.session,
    };
};

export const props = {
    sessionWrite        : PropTypes.func,
    sessionWriteAll     : PropTypes.func,
    logout              : PropTypes.func,
    login               : PropTypes.func,
    sessionStack        : PropTypes.object,
};

/**
 * This component allows to connect any component with the main session stack.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @returns {function(*)}
 */
export default WrappedComponent => (
    connect(mapStateToProps, mapDispatchToProps)(class extends React.PureComponent {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    sessionStack    = {this.props.sessionStack}
                    sessionWrite    = {this.props.sessionWrite}
                    sessionWriteAll = {this.props.sessionWriteAll}
                    logout          = {this.props.logout}
                />
            );
        }
    })
);
