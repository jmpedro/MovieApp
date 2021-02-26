import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Platform, ScrollView, TouchableWithoutFeedback, Dimensions, View, Image } from 'react-native';
import { Searchbar, Title } from 'react-native-paper';
import { map, size } from 'lodash';
import { searchApi } from '../api/movie'
import { BASE_PATH_IMG } from '../utils/constants';

const { width } = Dimensions.get('window');

export default function Search(props) {

    const {  navigation } = props;
    const [movies, setMovies] = useState(null);
    const [search, setSearch] = useState(' ');

    useEffect(() => {
        
        if( size(search) > 2 ) {
            
            searchApi(search).then(response => {
                setMovies(response.results);
            });

        }

    }, [search]);
    

    return (
        <SafeAreaView>

            <Searchbar 
                placeholder='Busca tu película'
                iconColor={ Platform.OS === 'ios' && 'transparent' }
                icon='arrow-left'
                style={styles.input}
                onChangeText={ (e) => setSearch(e) }
            />
            <ScrollView>

                <View style={styles.container}>

                    { map( movies, (movie, index) => (
                        
                        <Movie key={index} movie={movie} navigation={navigation} />

                    ) ) }

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

// Renderizamos las peliculas
function Movie(props) {

    const { movie, navigation } = props;
    const { title, id, poster_path } = movie;

    // Navegamos a la pelicula al hacer click
    const goToMovie = () => {

        navigation.navigate('movie', { id });

    }

    return (

        <TouchableWithoutFeedback onPress={goToMovie}>
            <View style={styles.movie}>
            
                { poster_path ? <Image style={styles.image} source={{ uri: `${BASE_PATH_IMG}/w500${poster_path}` }} /> : <Title>{title}</Title> }

            </View>
        </TouchableWithoutFeedback>

    );

}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#15212b'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    movie: {
        width: width / 2,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})