import React from 'react';
import { connect } from 'react-redux';
import { startLoading, stopLoading } from '../store/actions/global.actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => bindActionCreators({
    startLoading,
    stopLoading,
}, dispatch);

const mapStateToProps = ({global:{loadingState}}) => ({
    loading : loadingState,
});

export const propTypes = {
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
};

export default WrappedComponent => (connect(mapStateToProps, mapDispatchToProps)(
    class extends React.PureComponent {
        render() {
            return (
                <WrappedComponent 
                    {...this.props}
                />
            )
        }
    }
));