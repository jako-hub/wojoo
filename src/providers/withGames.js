import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectGame } from '../store/actions/search.actions';
import {
    fetchMyGames, 
    fetchGameInvitations, 
    rejectGameInvitation,
    removePendingCloseGame,
    fetchPendingCloseGames,
} from "../store/actions/game.actions";

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchMyGames,
    fetchGameInvitations,
    rejectGameInvitation,
    fetchPendingCloseGames,
    removePendingCloseGame,
    selectGame,
}, dispatch);

const mapStateToProps = ({games={}, search:{selectedGame}, session:{userCode}}) => ({
    myGames : games.myGames,
    gameInvitations : games.gameInvitations,
    pendingGamesToClose : games.pendingClose,
    selectedGame,
    userCode,
});

export const propTypes = {
    removePendingCloseGame : PropTypes.func,
    fetchMyGames    : PropTypes.func,
    myGames         : PropTypes.array,
    userCode        : PropTypes.any,
    fetchGameInvitations : PropTypes.func,
    gameInvitations : PropTypes.array,
    rejectGameInvitation : PropTypes.func,
    fetchPendingCloseGames: PropTypes.func,
    pendingGamesToClose : PropTypes.array,
    selectGame : PropTypes.func,
    selectedGame : PropTypes.object,
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