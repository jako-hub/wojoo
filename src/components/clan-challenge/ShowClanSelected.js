import React from 'react';
import {View, Text} from 'native-base';
import { PhotoDisplay, SimpleHeader } from '../../commons/containers';
import RatingStarDisplay from '../../commons/rating-start-display';
import { PrettyButton } from '../../commons/forms';
import {StyleSheet} from 'react-native';
import defaultClanImage from '../../assets/images/default-clan-image.png';


const ShowClanSelected = ({onPress, clans=[], name_button='', vs=false}) => {
    return (
        <>
            {clans.length === 0 ? 
                <View style = { styles.emptyList }>
                    <Text note style = { styles.emptyText }>No hay clanes que mostrar</Text>
                </View> : 
                clans.map((item, key) => (
                    <React.Fragment key={key}>
                        <View style = { styles.listItem }>
                            {item.nombre && 
                                <>
                                    <View style = { styles.imageWrapper }>
                                        <PhotoDisplay 
                                            avatar
                                            imageSource = { defaultClanImage }
                                        />
                                    </View>
                                    <View style = { styles.contentWrapper }>
                                        <Text>{item.nombre}</Text>
                                        <RatingStarDisplay value={item.rating} id={key}/>
                                    </View>
                                </>
                            }
                            <View style = { styles.actionsWrapper }>
                                <PrettyButton small primary onPress={() => onPress(item)}>
                                    {item.name_button ? item.name_button : name_button}
                                </PrettyButton>
                            </View>
                        </View>
                        {key === 0 && vs && <SimpleHeader title='VS'/>}
                    </React.Fragment>
                ))
            }
        </>
    );
};

const styles = StyleSheet.create({
    listItem : {
        marginVertical  : 10,
        flexDirection   : "row",
        alignItems      : "center",
        justifyContent  : "center",
        paddingHorizontal : 5,
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
        flexDirection   : "row",
        flex            : 7,
        alignItems : "center",
        justifyContent : "center",
    },
    emptyText : {
        textAlign : "center",
    },
});

export default ShowClanSelected;