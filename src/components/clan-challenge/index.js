import React from 'react';
import ShowClanSelected from './ShowClanSelected';
import WrapperSelectClan from './WrapperSelectClan';
import { withUserData } from '../../providers';

class ClanChallenge extends React.PureComponent {

    state = {
        openModal  : false,
        loading    : false,
        identifier : null, 
        clans     : [
            { identifier : 1 , name_button : 'Mi clan'},
            { identifier : 2,  name_button : 'Desafiar'},
        ]
    }

    toogleModal = (item) => {
        this.setState(({openModal}) => ({
            openModal  :!openModal,
            identifier : item.identifier
        }), () => this.fetchData(item));
    }

    async fetchData(item) {
        const {clansGamePlayer=[], fetchClansGamePlayer, otherClans=[], fetchOtherClans} = this.props;        
        this.setState({loading : true});
        if(item.identifier === 1){
            // if(clansGamePlayer.length === 0) 
            await fetchClansGamePlayer();
        } else {
            // if(otherClans.length === 0) 
            await fetchOtherClans();
        }

        this.setState({loading : false});
    }

    addClanToGame = (item) => {
        this.setState(({clans}) => ({
            clans : clans.map((clan) => {
                if(clan.identifier === this.state.identifier){
                    clan.codigo_clan = item.codigo_clan,
                    clan.nombre      = item.nombre,
                    clan.rating      = item.rating
                }
                return clan;
            }),
            openModal : false,
        }));
    }

    render(){
        const {clansGamePlayer, otherClans} = this.props;
        const {openModal, loading, identifier} = this.state;
        return(
            <>
                <ShowClanSelected onPress={this.toogleModal} clans={this.state.clans} vs/>
                <WrapperSelectClan 
                    openModal   = {openModal}
                    toggleModal = {this.toogleModal}
                    clans       = {identifier === 1 ? clansGamePlayer : otherClans}
                    loading     = {loading}
                    onPress     = {this.addClanToGame}
                />
            </>
            
        );
    }
};

export default withUserData(ClanChallenge);