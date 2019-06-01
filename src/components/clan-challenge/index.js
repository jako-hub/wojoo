import React from 'react';
import ShowClanSelected from './SelectClan';
import WrappedSelectClan from './WrappedSelectClan';
import { withUserData, withApi } from '../../providers';
import WrappedListPlayers from './WrappedListPlayers';
import endpoints from '../../configs/endpoints';

/**
 * Componente para el desafio de clanes
 * @author Jhoan López <jhoanlt19@gmail.com>
 */
class ClanChallenge extends React.PureComponent {

    state = {
        openModal      : false,
        loading        : false,
        loadingPlayers : false,
        identifier     : null, 
        openModalItem  : false,
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

    toogleModalItem = (item) => {
        this.setState(({openModalItem}) => ({
            openModalItem : !openModalItem
        }), () => this.fetchPlayers(item))
    }

    fetchPlayers(item){
        const endpoint = endpoints.clan.jugadores;
        this.setState({loadingPlayers  : true});
        this.props.doPost(endpoint, {
            clan : 1
        })
        .then((response) => {
            console.log(response);
            this.setState({loadingPlayers  : false});
        })
        .catch((response) => {
            console.log(response);
        });
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
        const {openModal, loading, identifier, openModalItem} = this.state;
        return(
            <>
                <ShowClanSelected 
                    onPress     = {this.toogleModal} 
                    clans       = {this.state.clans} 
                    vs 
                    onPressItem = {this.toogleModalItem}
                />
                <WrappedSelectClan
                    openModal   = {openModal}
                    toggleModal = {this.toogleModal}
                    clans       = {identifier === 1 ? clansGamePlayer : otherClans}
                    loading     = {loading}
                    onPress     = {this.addClanToGame}
                    onPressItem = {this.toogleModalItem}
                />
                <WrappedListPlayers 
                    openModalItem   = {openModalItem} 
                    toggleModalItem = {this.toogleModalItem}
                />
            </>
            
        );
    }
};

export default withApi(withUserData(ClanChallenge));