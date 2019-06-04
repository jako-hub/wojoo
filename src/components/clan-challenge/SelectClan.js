import React, {useState} from 'react';
import {View, Text, Item, Label, Input} from 'native-base';
import { PhotoDisplay, SimpleHeader } from '../../commons/containers';
import RatingStarDisplay from '../../commons/rating-start-display';
import { PrettyButton } from '../../commons/forms';
import {StyleSheet} from 'react-native';
import defaultClanImage from '../../assets/images/default-clan-image.png';
import { SimpleTouch } from '../../commons/touchables';
import PropTypes from 'prop-types';
import {IMAGES_SERVER} from 'react-native-dotenv';

/**
 * Componente para el listado de clanes
 * @author Jhoan López <jhoanlt19@gmail.com>
 * @param {*} param0 
 */
const SelectClan = ({onPress, clans=[], name_button='', vs=false, onPressItem, seeker=false}) => {
    const total = clans.length;
    const [queryString, setQueryString] = useState("");
    let filteredClans = [...clans];

    if(queryString) {
        const regExp = new RegExp(`.*(${queryString.toLowerCase()}).*`, "g");        
        filteredClans = filteredClans.filter(item => {
            return `${item.nombre.toLowerCase()}`.match(regExp);
        });
    }
    return (
        <>
            {seeker &&
                <View style = { styles.searchWrapper }>
                    <Item floatingLabel icon>
                        <Label><Text>Buscar</Text></Label>
                    <Input
                        value = {queryString}
                        onChangeText = { text => setQueryString(text) }
                    />                                        
                    </Item>                
                </View>
            }
            {total === 0 ? 
                <View style = { styles.emptyList }>
                    <Text note style = { styles.emptyText }>No hay clanes que mostrar</Text>
                </View> : 
                <View>
                    {filteredClans.map((item, key) => (
                    <View key={key}>
                        {item.nombre ? 
                            <SimpleTouch wrapType="stretch" onPress={() => onPressItem ?  onPressItem(item) : null}>
                                <View style = { styles.listItem }>
                                    <View style = { styles.imageWrapper }>
                                        <PhotoDisplay 
                                            avatar
                                            imageSource = { item.clan_foto? {uri : `${IMAGES_SERVER}${item.clan_foto}` } : defaultClanImage }
                                        />
                                    </View>
                                    <View style = { styles.contentWrapper }>
                                        <Text>{item.nombre}</Text>
                                        <RatingStarDisplay value={item.rating} id={key}/>
                                    </View>
                                    <View style = { styles.actionsWrapper }>
                                        <PrettyButton small primary onPress={() => onPress ? onPress(item) : null}>
                                            {item.name_button ? item.name_button : name_button}
                                        </PrettyButton>
                                    </View>
                                </View>
                            </SimpleTouch>
                            :
                            <View style={styles.actions}>
                                <PrettyButton small primary onPress={() => onPress ? onPress(item) : null}>
                                    {item.name_button ? item.name_button : name_button}
                                </PrettyButton>
                            </View>
                        }
                        {key === 0 && vs && <SimpleHeader title='VS'/>}
                    </View>
                ))}
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    listItem : {
        marginVertical    : 4,
        flexDirection     : "row",
        alignItems        : "center",
        justifyContent    : "center",
        paddingHorizontal : 5,
        marginTop         : 8,
    },
    imageWrapper : {
        flex            : 3,
        justifyContent  : "center",
        alignItems      : "center",
    },
    contentWrapper : {
        flex        : 12,
        paddingLeft : 10,
    },
    actionsWrapper : {
        flexDirection  : "row",
        flex           : 7,
        alignItems     : "center",
        justifyContent : "center",
    },
    emptyText : {
        textAlign : "center",
    },
    emptyList : {
        flexDirection  : "row",
        justifyContent : "center",
        paddingTop     : 20,
        marginTop      : 10,        
    },
    searchWrapper : {
        paddingVertical   : 10,
        paddingHorizontal : 15,
        marginBottom      : 10,
    },
    actions : {
        marginVertical    : 4,
        flexDirection     : "row",
        alignItems        : "center",
        justifyContent    : "center",
        paddingHorizontal : 5,
        marginTop         : 8,
    },
});

SelectClan.propTypes = {
    onPress     : PropTypes.func,
    clans       : PropTypes.array,
    name_button : PropTypes.string,
    vs          : PropTypes.bool,
    onPressItem : PropTypes.func,
};

export default SelectClan;