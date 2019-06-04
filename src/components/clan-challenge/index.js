import React from 'react';
import WrappedSelectClan from './WrappedSelectClan';
import { withUserData, withApi } from '../../providers';
import WrappedListPlayers from './WrappedListPlayers';
import endpoints from '../../configs/endpoints';
import SelectClan from './SelectClan';
import PropTypes from 'prop-types';

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
        players        : [],
        clans     : [
            { identifier : 1 , name_button : 'Mis clanes'},
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
            await fetchClansGamePlayer();
        } else {
            await fetchOtherClans();
        }

        this.setState({loading : false});
    }

    toogleModalItem = (item) => {
        this.setState(({openModalItem}) => ({
            openModalItem : !openModalItem,
            players       : []
        }), () => this.fetchPlayers(item))
    }

    fetchPlayers(item){
        const endpoint = endpoints.clan.jugadores;
        this.setState({loadingPlayers  : true});
        this.props.doPost(endpoint, {
            clan : item.codigo_clan
        })
        .then((response) => {
            const { error, error_controlado } = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al consultar los jugadores");
                consoleError("Cancel request", response);
                this.setState({loading : false});
            } else {
                this.setState({
                    loadingPlayers  : false,
                    players         : response
                });
            }
        })
        .catch((response) => {
            //Controlar el error
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
        }), () => this.returnSelection());
    }

    returnSelection(){
        let myClan   = this.state.clans.find((item) => item.identifier === 1);
        let opponent = this.state.clans.find((item) => item.identifier === 2);
        let selectedClans = {
            myClan   : myClan.codigo_clan,
            opponent : opponent.codigo_clan,
        }
        this.props.onSelectClan && this.props.onSelectClan(selectedClans);
    }

    render(){
        const {clansGamePlayer, otherClans} = this.props;
        const {openModal, loading, identifier, openModalItem, players} = this.state;
        return(
            <>
                <SelectClan 
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
                    players         = {players}
                />
            </>
            
        );
    }
};

ClanChallenge.propTypes = {
    onSelectClan : PropTypes.func
};

export default withApi(withUserData(ClanChallenge));