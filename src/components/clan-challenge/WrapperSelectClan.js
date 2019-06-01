import React from 'react';
import { FullScreenModal } from '../../commons/modals';
import {Text, View, Item, Label, Input} from 'native-base';
import SelectClan from './SelectClan';
import {StyleSheet} from 'react-native';

const WrapperSelectClan = ({openModal, toggleModal, clans, loading, onPress}) => {
    return(
        <FullScreenModal
            title = 'Selecciona el clan'
            open = { openModal }
            onClose = { toggleModal }
            disableScroll
        >   
            <View style = { styles.searchWrapper }>
                <Item floatingLabel icon>
                    <Label><Text>Buscar</Text></Label>
                    <Input
                    />                                        
                </Item>                
            </View>
            <SelectClan clans={clans} loading={loading} onPress={onPress}/>
        </FullScreenModal>
    );
}

const styles = StyleSheet.create({
    searchWrapper : {
        paddingVertical : 10,
        paddingHorizontal : 15,
        marginBottom : 10,
    },
});

export default WrapperSelectClan;