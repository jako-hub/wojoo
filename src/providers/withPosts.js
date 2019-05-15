import React from 'react';
import { connect } from 'react-redux';
import { fetchNews, } from '../store/actions/global.actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchNews
}, dispatch);

const mapStateToProps = ({global:{news=[]}}) => ({
    news,
});

export const propTypes = {
    news        : PropTypes.array,
    fetchNews   : PropTypes.func,
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