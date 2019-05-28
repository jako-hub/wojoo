import React from 'react';
import PropTypes from 'prop-types';
import { withSearch } from '../../providers';
import SearchClanWrapper from './SearchClanWrapper';
import ResultsList from './ResultsLists';

class SearchClans extends React.Component {
    state = {
        loading : true,
    };
    componentDidMount() {
        this.fetchResults();
    }

    async fetchResults() {
        this.setState({loading : true});
        await this.props.fetchClanResults();
        this.setState({loading : false});
    }

    onRefresh() {
        this.fetchResults();
    }

    onView({codigo_clan}) {
        const {navigation} = this.props;
        navigation.navigate('ClanDetail', {
            clanCode : codigo_clan
        });
    }

    render() {
        const {
            loading,
        } = this.state;
        const {
            resultsClans=[]
        } = this.props;
        return (
            <SearchClanWrapper loading = { loading } onRefresh = { () => this.onRefresh() }>
                <ResultsList
                    results = { resultsClans }
                    onView  = { this.onView.bind(this) }
                 />
            </SearchClanWrapper>
        );
    }
}

SearchClans.propTypes = {
    fetchClanResults    : PropTypes.func,
    resultsClans        : PropTypes.array,
};

export default withSearch(SearchClans);