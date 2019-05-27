import React from 'react';
import { withUserData } from '../providers';

class DataLoaderHelper extends React.PureComponent {

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const {
            fetchMyFriends, 
            fetchUserSendedRequests, 
            fetchClanInvitations,
            fetchPlayerClanes,
            fetchPlayerAdminClanes,
        } = this.props;
        await fetchMyFriends(this.props.userCode);
        await fetchUserSendedRequests();
        await fetchClanInvitations();
        await fetchPlayerClanes();
        await fetchPlayerAdminClanes();
    }

    render() {
        return null;
    }
}

export default withUserData(DataLoaderHelper);