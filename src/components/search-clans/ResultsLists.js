import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
} from 'native-base';
import { EmptyObject } from '../../commons/others';
import ResultItem from './ResultItem';

const ResultsList = ({results=[], onView}) => (
    <View style = { styles.root }>
        {results.length === 0 && (
            <EmptyObject 
                icon = "users"
                message = "No se encontraron resultados"
            />
        )}
        {results.map((item, key) => (
            <ResultItem 
                key         = { `item-result-key-${key}`    }
                name        = { item.clan_nombre            }
                gameType    = { item.tipo_juego_nombre      }
                icon        = { item.tipo_juego_icono       }
                rating      = { item.clan_rating            }
                id          = { item.codigo_clan            }
                members     = { item.miembros               }
                city        = { item.clan_ciudad            }
                onPress     = { () => onView? onView(item) : null }
            />
        ))}
    </View>
);

const styles = StyleSheet.create({
    root : {
        paddingBottom       : 100,
    },
});

ResultsList.propTypes = {
    results : PropTypes.array,
    onView  : PropTypes.func,
};

export default ResultsList;