import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';
import {
    View,
} from 'native-base';
import { withPosts, withSearch } from '../../providers';
import PostItem from './PostItem';
const TYPE_ALL   = 'ALL';
const TYPE_GAMES = 'JUE';
const TYPE_NEWS  = 'NOT';

import EmptyObject from '../../commons/others/EmptyIcon';
import PostsHeader from './PostsHeader';
import PostsFilters from './PostsFilters';

class News extends React.Component {
    originalState = {};
    state = {
        loading : false,
        filters : [
            {label : "Todos", icon : "list", target: TYPE_ALL, active : true},
            {label : "Juegos", icon : "futbol-o", target: TYPE_GAMES},
            {label : "Noticias", icon : "newspaper-o", target: TYPE_NEWS},
        ],
    };

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews() {
        this.setState({loading : true});
        this.props.fetchNews()
        .then(response => {
            this.setState({loading : false});
        })
        .catch(response => {
            this.setState({loading : false});
        });
    }

    onChangeFilters({target}) {
        this.setState(({filters}) => ({
            filters : filters.map(item => {
                if(item.target === target) item.active = true;
                else item.active = false;
                return item;
            }),
        }));
    }

    renderEmpty() {
        return (
            <View style = { styles.emptyRoot }>
                <EmptyObject 
                    message = "No se encontró actividad"
                    icon = "newspaper-o" 
                />
            </View>
        );
    }

    getFilteredNews() {
        const {filters} = this.state;
        const {target} = filters.find(item => item.active === true);
        let fileteredData = [...this.props.news];
        if(target === TYPE_GAMES) {
            return fileteredData = fileteredData.filter(item => item.tipo === TYPE_GAMES);
        } else if(target === TYPE_NEWS) {
            return fileteredData = fileteredData.filter(item => item.tipo === TYPE_NEWS);
        } else {
            return fileteredData;
        }
    }

    onViewPost(post) {        
        const type = post.tipo;
        if(type === 'JUE') {
            this.viewGame(post);
        }
    }

    viewGame({codigoJuegoFk}) {
        const navigation = this.props.navigation;
        this.props.selectGame({codigo_juego : codigoJuegoFk});
        navigation.navigate("GameDetail", {});
    }

    renderNews() {
        const news = this.getFilteredNews()||[];
        
        let content = null;
        if(news.length === 0) {
            content = this.renderEmpty();
        } else {
            content = (news.map((item, key) => (
                <PostItem 
                    key = { `post-item-${key}-${item.codigo_publicacion}` } 
                    item = { item }
                    onViewPost = { () => this.onViewPost(item) }
                />
            )))
        }
        return (
            <View styles = { styles.listView}>
                <PostsHeader />
                <PostsFilters 
                    filters = {this.state.filters} 
                    onChange = { this.onChangeFilters.bind(this) }
                />
                {content}
            </View>
        );
    }

    render() {        
        const { loading } = this.state;
        return (
            <View style = { styles.root }>
                <ScrollView
                    refreshControl  = {(
                        <RefreshControl 
                            refreshing = { loading   }
                            onRefresh  = { () => this.fetchNews() }
                        />
                    )}
                >
                    {this.renderNews()}
                </ScrollView>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
    emptyRoot : {
        flex : 1,
        alignItems : "center",
        paddingVertical : 20,
    },
    listView : {
        flex : 1,
    },
});

News.propTypes = {
    navigation : PropTypes.any,
    news        : PropTypes.array,
    fetchNews   : PropTypes.func,
    selectGame          : PropTypes.func,
};

export default withSearch(withPosts(News));