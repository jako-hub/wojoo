
import React from 'react';
import PropTypes from 'prop-types';
import Content from './ClanContent';
import Form from './ClanForm';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage } from '../../utils/functions';
import PermissionsManager, { 
    CAMERA,
    READ_EXTERNAL_STORAGE,
    WRITE_EXTERNAL_STORAGE,
} from '../../commons/permissions-manager';

class ClanCreator extends React.Component {
    state = {
        form : {
            name     : "",
            gameType : "",
            city     : "",
            foto     : null,
        },
        gameTypes : [],        
    };

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const {startLoading, stopLoading} = this.props;
        startLoading();
        const gameTypes = await this.getGameTypes();
        this.setState({
            gameTypes : gameTypes.map(item => ({
                code : item.codigo_juego_tipo,
                label : item.nombre,
            })),
        });
        stopLoading();
    };

    async getGameTypes() {
        const doPost = this.props.doPost;
        const response = await doPost(endpoints.juegoTipo.lista);
        const {error, error_controlado} = response;
        let gameTypes = false;
        if(error) {
            addMessage("Ocurrió un error inesperado");
        } else if(error_controlado) {
            addMessage(error_controlado);
        } else {
            gameTypes = response;
        }
        return gameTypes;
    };

    onSelectImage(image) {
        alert("here!");
        console.log("the image : ", image);
    }

    onChange() {

    }


    render() {
        const { gameTypes, form } = this.state;
        return (
            <PermissionsManager 
                permissions = { [
                    CAMERA,
                    READ_EXTERNAL_STORAGE,
                    WRITE_EXTERNAL_STORAGE,
                ]}
            >
                <Content>
                    <Form 
                        gameTypes = { gameTypes } 
                        onSelectImage = { this.onSelectImage.bind(this) }
                    />
                </Content>
            </PermissionsManager>
        );
    }
}

ClanCreator.propTypes = {
    navigation : PropTypes.any.isRequired,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    doPost          : PropTypes.func,
};

export default withApi(ClanCreator);