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

    getFilteredResults() {
        const {searchQuery, resultsClans=[]} = this.props;
        let filteredResults = [...resultsClans];
        if(searchQuery) {
            const regExp = new RegExp(`.*(${searchQuery.toLowerCase()}).*`, "g");        
            filteredResults = filteredResults.filter(item => {
                return `${item.clan_nombre.toLowerCase()}`.match(regExp);
            });
        }
        return filteredResults;
    }

    isInClan({codigo_clan}) {
        const { playerClans=[]} = this.props;
        const selected = playerClans.find(item => item.codigo_clan === codigo_clan);
        return Boolean(selected);
    }

    render() {
        const {
            loading,
        } = this.state;
        const resultsClans = this.getFilteredResults();
        return (
            <SearchClanWrapper loading = { loading } onRefresh = { () => this.onRefresh() }>
                <ResultsList
                    results = { resultsClans                }
                    onView  = { this.onView.bind(this)      }
                    isInClan= { this.isInClan.bind(this)    }
                 />
            </SearchClanWrapper>
        );
    }
}

SearchClans.propTypes = {
    fetchClanResults    : PropTypes.func,
    resultsClans        : PropTypes.array,
    searchQuery         : PropTypes.string,
    playerClans         : PropTypes.array,
    userCode            : PropTypes.any,
};

export default withSearch(SearchClans);