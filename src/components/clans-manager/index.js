import React from 'react';
import PropTypes from 'prop-types';
import { withUserData } from '../../providers';
import Content from './Content';
import ClansCase from './ClansCase';
import AddButton from './AddButton';

class ClansManager extends React.Component {
    state = {
        loading     : true,
    };
    
    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        this.setState({loading : true});
        const {fetchPlayerAdminClanes, fetchPlayerClanes} = this.props;
        await fetchPlayerAdminClanes();
        await fetchPlayerClanes();
        this.setState({loading : false});
    }

    onRefresh() {
        this.fetchData();
    }

    onSelectClan(clan) {
        alert("Selected clan");
    }

    onAddClan() {
        alert("on add clan");
    }

    render() {
        const {
            adminClans=[],
            clans=[],
        } = this.props;
        return (
            <Content>
                <ClansCase 
                    title   = "Mis clanes" 
                    clans   = { adminClans } 
                    onPress = { this.onSelectClan.bind(this) }
                />
                <ClansCase 
                    title   = "Clanes a los que pertenezco" 
                    clans   = { clans } 
                    onPress = { this.onSelectClan.bind(this) }
                />
                <AddButton 
                    label   = "Crea tu clan"
                    onPress = { this.onAddClan.bind(this) }
                />
            </Content>
        );
    }
}

ClansManager.propTypes = {
    navigation                  : PropTypes.any,
    clans                       : PropTypes.array,
    adminClans                  : PropTypes.array,
    fetchPlayerAdminClanes      : PropTypes.func,
    fetchPlayerClanes           : PropTypes.func,
};

export default withUserData(ClansManager);