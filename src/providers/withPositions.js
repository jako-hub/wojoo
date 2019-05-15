import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPositions } from "../store/actions/game.actions";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchPositions,
}, dispatch);

const mapStateToProps = ({games={}}) => ({
    positions : games.positions,
});

export const propTypes = {
    fetchPositions    : PropTypes.func,
    positions         : PropTypes.array,
};

/**
 * This wrapper allows to interact with the games reducer.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param WrappedComponent
 */
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