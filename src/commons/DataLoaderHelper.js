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
            fetchClanRequestsSended,
            fetchClanRequestsReceived,
        } = this.props;
        fetchMyFriends(this.props.userCode);
        fetchUserSendedRequests();
        fetchClanInvitations();
        fetchPlayerClanes();
        fetchPlayerAdminClanes();
        fetchClanRequestsSended();
        fetchClanRequestsReceived();
    }

    render() {
        return null;
    }
}

export default withUserData(DataLoaderHelper);