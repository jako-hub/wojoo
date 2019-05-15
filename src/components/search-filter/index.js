import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Input,
    Form,
    Item,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withSearch } from '../../providers';


const RenderForm = ({onChangeQuery, searchQuery, clearText, focusInput, setInputRef}) => {
    const isEmpty = searchQuery === "";
    return (
        <Form style={styles.form}>
            <Item rounded style={styles.inputContainer}>                
                <Input
                    ref         = {ref => setInputRef(ref)}
                    value       = { searchQuery }
                    onChangeText= { text => onChangeQuery(text) }
                    style       = {styles.input}
                />
                <TouchableOpacity onPress={() => !isEmpty? clearText() : focusInput()}>
                    <View>
                        <Icon 
                            style   = { styles.icon } 
                            size    = { 30 }
                            name    = {isEmpty? "search" : 'times'}
                        />
                    </View>
                </TouchableOpacity>                
            </Item>
        </Form>
    );
};

class SearchFilter extends React.Component {
    inputRef = null;

    clearText() {
        this.props.onChangeQuery("");
    }

    focusInput() {
        this.inputRef._root.focus();
    }

    render () {
        const {onChangeQuery, searchQuery} = this.props;
        return (
            <RenderForm 
                onChangeQuery   = { onChangeQuery } 
                searchQuery     = { searchQuery   } 
                setInputRef     = { ref => this.inputRef = ref }
                clearText       = { () => this.clearText()     }
                focusInput      = { () => this.focusInput()    }
            />
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        flexDirection : "row",
        alignItems : "flex-start",
        justifyContent : "center",        
    },
    form : {
        flex : 1,
        marginHorizontal : 20,
    },
    icon : {
        marginRight : 15,
        color : "#cfd8dc",
    },
    inputContainer : {
        paddingLeft : 30,
        backgroundColor : "#FFF",
        height : 35,      
        borderRadius : 5,  
        backgroundColor : "#f5f5f5",
        borderColor : "#f5f5f5",
    },
    input : {
        
    },
    input : {
        width : "100%",
    },
});

SearchFilter.propTypes = {
    searchQuery     : PropTypes.string,
    onChangeQuery   : PropTypes.func,
};

export default withSearch(SearchFilter);