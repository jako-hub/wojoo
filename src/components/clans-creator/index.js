
import React from 'react';
import PropTypes from 'prop-types';
import Content from './ClanContent';
import Form from './ClanForm';
import { withApi, withUserData } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage } from '../../utils/functions';
import PermissionsManager, { 
    CAMERA,
    READ_EXTERNAL_STORAGE,
    WRITE_EXTERNAL_STORAGE,
} from '../../commons/permissions-manager';
import _ from 'lodash';


/**
 * This component allows to create a new clan.
 *
 * @class ClanCreator
 * @extends {React.Component}
 */
class ClanCreator extends React.Component {
    state = {
        form : {
            name     : "",
            gameType : null,
            city     : "",
            photo    : null,
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

    onSelectImage(photo) {
        this.setState(({form}) => ({
            form : {
                ...form,
                photo,
            },
        }));
    }

    onChange(name, value) {
        this.setState(({form}) => ({
            form : {
                ...form,
                [name] : value,
            },
        }));
    }

    async onSubmitForm() {
        const {createAdminClan, navigation} = this.props
        const response = await createAdminClan(this.state.form);
        if(response === true) {
            navigation.navigate("ViewClans");
        }
    }

    isValidForm() {
        const {
            gameType,
            name,            
        } = this.state.form;
        return !_.isEmpty(String(gameType)) && !_.isEmpty(name);
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
                        formValid       = { this.isValidForm()              }   
                        gameTypes       = { gameTypes                       } 
                        onSelectImage   = { this.onSelectImage.bind(this)   }
                        onChange        = { this.onChange.bind(this)        }
                        onSubmit        = { this.onSubmitForm.bind(this)    }
                        {...form}
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
    createAdminClan : PropTypes.func,
};

export default withApi(withUserData(ClanCreator));