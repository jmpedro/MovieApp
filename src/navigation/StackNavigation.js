import React from 'react'
import { IconButton } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default function StackNavigation(props) {

    // Cogemos el objeto navigation para poder usar sus propiedades
    const { navigation } = props;

    // Creamos la configuracion de botones e iconos para mostrar el menu o una flecha hacia atrás
    const buttonOpenDrawer = (screen) => {

        switch (screen) {
            case 'search':
            case 'movie':
                return ( <IconButton icon="arrow-left" onPress={ () => navigation.goBack() } /> )
            default:
                return (<IconButton icon="menu" onPress={ () => navigation.openDrawer() } />)
        }
        
    }

    // Creamos un boton para el buscador
    const buttonOpenSearch = () => {

        return <IconButton icon="magnify" onPress={ () => navigation.navigate('search') } />

    }

    return (
        <Stack.Navigator>

            <Stack.Screen 
                name="home" 
                component={Home} 
                options={{ title: 'Cinema App', 
                headerLeft: () => buttonOpenDrawer('home'), 
                headerRight: () => buttonOpenSearch()  }} />

            <Stack.Screen 
                name="movie" 
                component={Movie} 
                options={{ title: '', 
                headerTransparent: true,
                headerLeft: () => buttonOpenDrawer('movie'), 
                headerRight: () => buttonOpenSearch()  }} />

            <Stack.Screen 
                name="news" 
                component={News} 
                options={{ title: 'Nuevas películas', 
                headerLeft: () => buttonOpenDrawer('news'), 
                headerRight: () => buttonOpenSearch()  }} />

            <Stack.Screen 
                name="popular" 
                component={Popular} 
                options={{ title: 'Películas populares', 
                headerLeft: () => buttonOpenDrawer('popular'), 
                headerRight: () => buttonOpenSearch()  }} />

            <Stack.Screen 
                name="search" 
                component={Search} 
                options={{ title: '', headerTransparent: true, headerLeft: () => buttonOpenDrawer('search')  }} />

        </Stack.Navigator>
    )

}