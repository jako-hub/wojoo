import React from 'react';
import PropTypes from 'prop-types';
import { SimpleModal } from '../../commons/modals';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage } from '../../utils/functions';
import { LoadingSpinner } from '../../commons/loaders';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

const NewContainer = ({date, text}) => (
    <View style = { styles.rootContainer }>
        <View style = { styles.iconWrapper }>
            <Icon name = "futbol" size = {35} />
        </View>
        <View style = { styles.textWrapper }>
            <Text>{text}</Text>
        </View>
    </View>
);

class MyPublications extends React.Component {
    state = {
        publications : [],
        loading : false,
    };

    componentDidMount() {
        this.fetchNews();
    }

    async fetchNews() {
        this.setState({loading : true});
        const {doPost, userCode} = this.props;
        const response = await doPost(endpoints.publicacion.jugador, {
            jugador : userCode,
        });
        try {
            const {error, error_controlado} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al listar las publicaciones del jugador");
            } else {
                this.setState({
                    publications : response,
                });
            }
        } catch(err) {
            addMessage("Ocurrió un error al listar las publicaciones del jugador");
        } finally {
            this.setState({loading : false});
        }
    }

    renderList() {
        const {publications=[]} = this.state;
        return (
            <View style = { styles.root }>
                {publications.map((item, key) => (
                    <NewContainer 
                        key = {`item-new-profile-${key}`} 
                        date = {item.fecha}
                        text = {item.texto}
                    />
                ))}
            </View>
        );
    }

    render() {
        const {
            open,
            onClose
        } = this.props;
        const {loading} = this.state;
        if (loading) contetn = (<View style = { styles.rootLoading }><LoadingSpinner /></View>);
        else content = this.renderList();

        return (
            <SimpleModal
                open    = { open    }
                onClose = { onClose }
            >
                {content}
            </SimpleModal>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },
    iconWrapper : {
        flex : 2,
        justifyContent : "center",
        alignItems : "center",
    },
    textWrapper : {
        flex : 10,
    },
    rootContainer : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
    },
});

MyPublications.propTypes = {
    open : PropTypes.bool,
    onClose : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
};

export default withApi(MyPublications);