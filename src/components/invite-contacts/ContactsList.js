import React from 'react';
import PropTypes from 'prop-types';
import { 
    View, 
    Text, 
    List,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
    CheckBox,
    Input,
    Item,
} from 'native-base';
import { StyleSheet, ScrollView } from 'react-native';
import Contacts from 'react-native-contacts';
import PermissionsManager, { READ_CONTACTS } from '../../commons/permissions-manager';
import { addMessage } from '../../utils/functions';
import { DEFAULT_USER_IMG } from 'react-native-dotenv';
import SelectButton from './SelectButton';
import Filter from './Filter';
import { withSearch } from '../../providers';
import { PrettyButton } from '../../commons/forms';
import InviteForm from './InviteForm';

const ContactItem = ({contact, onSelectContact, registered}) => {
    const {thumbnailPath, hasThumbnail, givenName, phoneNumbers=[]} = contact;
    let [phoneNumber=false] = phoneNumbers;
    if(!phoneNumber) return null;
    return (
        <ListItem         
            noIndent
            thumbnail
            button
            onPress = { () => !registered? onSelectContact(contact) : null }
        >
            <Left style = { styles.thumbnailWrapper }>
                <Thumbnail 
                    style = { styles.thumbnail }
                    source = { { uri : hasThumbnail? thumbnailPath : DEFAULT_USER_IMG }} 
                />
            </Left> 
            <Body style = { styles.bodyWrapper }>
                <Text>{givenName}</Text>
                <Text note>{phoneNumber.number}</Text>
            </Body>
            <Right style = { styles.buttonWrapper }>
                <View>
                    {registered
                    ? (<Text>Registrado</Text>)
                    : (
                        <CheckBox 
                            onPress = { () => onSelectContact(contact) }
                            checked = { contact.selected } 
                        />
                    )}
    
                </View>
            </Right>
        </ListItem>
    );
};


const ButtonFreeNumber = ({onPress}) => (
    <View style = { styles.freeNumber }>
        <PrettyButton onPress = { onPress }>
            Escribir número
        </PrettyButton>
    </View>
);

/**
 * This component renders a list of contacts.
 */
class ContactsList extends React.Component {
    state = {
        contacts : [],        
        selectedContacts : [],
        friends : [],
        openedForm : false,
    };

    permissions = [
        READ_CONTACTS,
    ];

    componentDidMount() {
        if(this.props.showIfRegistered) {
            this.getUsersInJako();
        }
    }

    async getUsersInJako() {
        await this.props.fetchFriends();
    }

    toggleOpenForm() {
        this.setState({
            openedForm : !this.state.openedForm,
        });
    }

    getContacts() {
        Contacts.getAll((err, contacts) => {
            if(err) {
                addMessage("Error al leer los contactos");
            } else {
                const sortedContacts = contacts.sort((a, b) => {
                    if(a.givenName < b.givenName) return -1;
                    if(a.givenName > b.givenName) return 1;
                    return 0;
                });
                this.setState({
                    contacts : sortedContacts,
                });
            }
        });
    }

    emptyContacts() {
        return (
            <View style = { styles.emptyList }>
                <Text note style = { styles.emptyText }>No hay contactos que mostrar</Text>
            </View>
        );
    }

    onValidatePermissions() {
        this.getContacts();
    }

    onSelectContact({recordID, selected}) {
        this.setState(({contacts}) => ({
            contacts : contacts.map(contact => {
                if(contact.recordID === recordID) contact.selected = !selected;
                return contact;
            }),
            selectedContacts : contacts.filter(item => item.selected),
        }));
    }

    getFilteredContacts() {
        const {contacts=[], filter} = this.state;
        let filteredContacts = [...contacts];
        if(filter) {
            filteredContacts = filteredContacts.filter(item => {
                const regExp = new RegExp(`.*(${filter.toLowerCase()}).*`, "g");
                return `${item.givenName.toLowerCase()}`.match(regExp);
            });
        }
        return filteredContacts;
    }
    filterPhoneNumber(phoneNumber) {
        return phoneNumber.replace(/[\(\) \-\+]/g, '');
    }

    isInJako({phoneNumbers=[]}) {
        const [phoneNumber] = phoneNumbers;
        if(!phoneNumber) return false;
        const number = this.filterPhoneNumber(phoneNumber.number);
        const usuario = this.props.resultsFriends.find(user => user.usuario === number);
        return Boolean(usuario);
    }

    renderList() {
        const contacts = this.getFilteredContacts();
        const {showIfRegistered} = this.props;
    
        return (
            <>
            <ScrollView style = { styles.scrollView }>
                <List style = { styles.listItem }>
                    {contacts.map((contact, key) => (
                       <ContactItem 
                            key = { `contact-item-${key}` }  
                            contact = {contact}
                            onSelectContact = {this.onSelectContact.bind(this)}
                            registered = {showIfRegistered && this.isInJako(contact)}
                        /> 
                    ))}
                </List>
            </ScrollView>            
            </>
        );
    }

    onChangeFilter(filter) {
        this.setState({
            filter : filter || "",
        });
    }

    onClear() {
        this.setState({
            filter : "",
        });
    }

    onSelectContacts() {
        const {onSelectContacts} = this.props;
        const {
            selectedContacts
        } = this.state;
        if(onSelectContacts) {
            onSelectContacts(selectedContacts);
        }
    }

    onSendForm(selectedContacts) {
        const {onSelectContacts} = this.props;
        if(onSelectContacts) {
            onSelectContacts(selectedContacts);
        }
    }

    renderForm() {
        return (
            <InviteForm onCancel = {() => this.toggleOpenForm()} onSend = { this.onSendForm.bind(this) } />
        );
    }

    render() {
        const { contacts=[], selectedContacts=[], filter, openedForm, } = this.state;        
        const totalContacts = contacts.length;
        const addedContacts = selectedContacts.length;        
        const rootStyles = [styles.root, (addedContacts > 0? styles.rootPadding : {})];
        const enabledFormAdd = this.props.enabledFormAdd;
        let content = null;
        if(!openedForm) {
            content = (
                <>
                    <View style = { styles.header }>
                        <Text>Tus contactos</Text>
                    </View>
                    <Filter 
                        value = { filter } 
                        onChange = { this.onChangeFilter.bind(this) } 
                        onClear = { () => this.onClear() }
                    />
                    { totalContacts === 0 && (this.emptyContacts())     }
                    { totalContacts > 0 && (this.renderList(contacts))  }
                    {(!addedContacts && enabledFormAdd) && (<ButtonFreeNumber onPress = { () => this.toggleOpenForm() } />)}
                    { addedContacts > 0 && 
                    (<SelectButton 
                        selected = {addedContacts} 
                        onSelect = { () => this.onSelectContacts() }
                        />) 
                    }
                </>
            );
        } else {
            content = (
                <>{this.renderForm()}</>
            );
        }
        return (
            <PermissionsManager  
                permissions = { this.permissions } 
                onValidatePermissions = { () => this.onValidatePermissions() }
            >
                <>
                    <View style = { rootStyles } >
                        {content}
                    </View>                    
                </>
            </PermissionsManager>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,        
    },
    rootPadding : {
        paddingBottom : 100,
    },
    header : {
        flexDirection : "row",
        paddingVertical : 10,
        justifyContent : "center",
    },
    emptyList : {
        flexDirection : "row",
        justifyContent : "center",
        paddingTop : 20,
        marginTop : 10,
    },
    emptyText : {
        textAlign : "center",
    },
    thumbnail : {
        width : 50,
        height : 50,
        backgroundColor : "#e0e0e0",
    },
    listItem : {
        padding : 0,
    },
    thumbnailWrapper : {
        flex : 2,
    },
    bodyWrapper : {
        flex : 10,
    },
    buttonWrapper : {
        flex : 4,
        paddingRight : 30,
        justifyContent : "flex-start"
    },
    scrollView : {
        paddingBottom : 40,
    },
    freeNumber : {
        position : "absolute",
        bottom : 0,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        width : "100%",
        padding : 10,
        backgroundColor : "#FFF"
    },
    formRoot : {

    },
});

ContactsList.propTypes = {
    onSelectContacts : PropTypes.func,    
    showIfRegistered : PropTypes.bool,
    fetchFriends        : PropTypes.func,
    resultsFriends      : PropTypes.array,
    enabledFormAdd      : PropTypes.bool,
};

export default withSearch(ContactsList);