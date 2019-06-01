import React from 'react';
import {View} from 'native-base';
import ShowClanSelected from './ShowClanSelected';
import { SimpleLoader } from '../../commons/loaders';

const SelectClan = ({loading, clans=[], onPress}) => {
    return(
        <View>
            {loading ? 
                <SimpleLoader/> :  
                <ShowClanSelected 
                    clans       = {clans}
                    name_button ='Añadir'
                    onPress     = {onPress}
                />
            }
        </View>
    );
}

export default SelectClan;