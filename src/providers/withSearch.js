import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    fetchGames, 
    fetchFriends,
    onChangeQueryString, 
    clearSelectedGame,
    selectGame,
    setSelectedGame,
} from '../store/actions/search.actions';
import { startLoading, stopLoading } from '../store/actions/global.actions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    clearSelectedGame,
    selectGame,
    setSelectedGame,
    fetchGames,
    startLoading,
    stopLoading,
    onChangeQuery : onChangeQueryString,
    fetchFriends,
}, dispatch);

const mapStateToProps = ({
    search:{results=[], resultsFriends, searchQuery="", viewGameDetail, selectedGame},
    session:{userCode},
}) => ({
    results,
    resultsFriends,
    searchQuery,
    viewGameDetail,
    selectedGame,
    userCode,
});

export const propTypes = {
    viewGameDetail      : PropTypes.bool,
    selectedGame        : PropTypes.object,
    results             : PropTypes.array,
    searchQuery         : PropTypes.string,
    fetchGames          : PropTypes.func,
    startLoading        : PropTypes.func,
    stopLoading         : PropTypes.func,
    onChangeQuery       : PropTypes.func,
    clearSelectedGame   : PropTypes.func,
    selectGame          : PropTypes.func,
    setSelectedGame     : PropTypes.func,
    fetchFriends        : PropTypes.func,
    resultsFriends      : PropTypes.array,
    userCode            : PropTypes.any,
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