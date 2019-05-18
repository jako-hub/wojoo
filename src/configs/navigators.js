/**
 * In this file we configure all the application navigation routes.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
import {
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation';
import { 
    myGameRoutes,
    searchRoutes,
    profileRoutes,
    contactRoutes,
    gameRoutes,
    AuthRoutes, 
    homeRoutes,
    createTabOptions,
    playerRoutes,
    generalRoutes,
    testRoutes,
 } from "./routes";
import stylesPalette from '../utils/stylesPalette';

const AuthNavigator = createSwitchNavigator(AuthRoutes, {
    initialRouteName : "Register",
});

const HomeNavigator = createStackNavigator(homeRoutes, {
    initialRouteName : 'Posts',
    headerMode       : 'none',
});

const MyGameNavigator = createStackNavigator(myGameRoutes, {
    initialRouteName : 'MyGames',
    headerMode       : 'none',
});

const SearchNavigator = createStackNavigator(searchRoutes, {
    initialRouteName : 'Search',
    headerMode        : 'none',
});

const ProfileNavigator = createStackNavigator(profileRoutes, {
    initialRouteName : 'Profile',
    headerMode       : 'none',
});

const ContactNavigator = createStackNavigator(contactRoutes, {
    initialRouteName : 'Contact',
    headerMode       : 'none',
});

const GamesNavigator = createStackNavigator(gameRoutes, {
    initialRouteName : 'CreateGame',
    headerMode       : 'none',
});

const PlayerNavigator = createStackNavigator(playerRoutes, {
    initialRouteName : 'PlayerProfile',
    headerMode       : 'none',
});


const palette = stylesPalette();

const MainNavigator = createBottomTabNavigator({
    HomeTab     : createTabOptions(HomeNavigator, 'home'),
    MyGamesTab  : createTabOptions(MyGameNavigator, 'futbol-o'),
    SearchTab   : createTabOptions(SearchNavigator, 'search'),
    ContactTab  : createTabOptions(ContactNavigator, 'question-circle'),
}, {
    shifting            : true,
    initialRouteName    : "HomeTab",
    activeColor         : "white",
    labeled             : false,
    barStyle : {
        backgroundColor: palette.primary.dark,
    },
    style: {
        backgroundColor: palette.primary.dark,
    }
}); 

const GeneralNavigator = createStackNavigator({
    ...generalRoutes,
}, {
    initialRouteName : '',
    headerMode : 'none',
});

const AppNavigator = createStackNavigator({
    Main    : MainNavigator,
    Games   : GamesNavigator,
    Player  : PlayerNavigator,
    General : GeneralNavigator,
}, {
    initialRouteName : "Main",
    headerMode       : 'none',
});

const TestNavigator = createStackNavigator(testRoutes, {
    initialRouteName : "TestArea",
    headerMode : "none",
});

const AppNavigatorContainer = createSwitchNavigator({
    Auth : AuthNavigator,
    App  : AppNavigator,
    testing : TestNavigator,    
}, {
    initialRouteName : "Auth",
});

export default AppNavigatorContainer;