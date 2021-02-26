import { map } from 'lodash';
import React, { useState, useEffect } from 'react'
import { Button, Text } from 'react-native-paper';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { getNewsMoviesApi } from '../api/movie';
import usePreferences from '../hooks/usePreferences';
import { BASE_PATH_IMG } from '../utils/constants';

const { width } = Dimensions.get('window');

export default function News(props) {

    const { navigation } = props;
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [showBtnMore, setShowBtnMore] = useState(true);
    const { theme } = usePreferences();

    // Funcion para obtener las peliculas mas recientes
    useEffect(() => {
        
        getNewsMoviesApi(page).then(response => {

            // Obtenemos el total de paginas 
            const totalPages = response.total_pages;

            // Si la pagina es menor al total, añadimos las nuevas peliculas, si no, el boton de cargar mas desaparece
            if( page < totalPages ) {
                
                if( !movies ) {

                    setMoviePopular(response.results);

                }else {
                    
                    // Añadimos las nuevas peliculas junto a las que ya estaban antes
                    setMovies([...movies, ...response.results]);

                }

            }else {

                setShowBtnMore(false);

            }

        })

    }, [page]);

    return (
        <ScrollView>
            
            <View style={styles.container}>
                { map(movies, (movie, index) => (

                    <Movie key={index} movie={movie} navigation={navigation} />

                ) ) }
            </View>

            { showBtnMore && 
                <Button
                    contentStyle={styles.loadMoreContainer}
                    style={styles.loadMore}
                    labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
                    onPress={() => setPage(page + 1)} >
                    Cargar mas...
                </Button> 
            }

        </ScrollView>
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
            
                { poster_path ? <Image style={styles.image} source={{ uri: `${BASE_PATH_IMG}/w500${poster_path}` }} /> : <Text>{title}</Text> }

            </View>
        </TouchableWithoutFeedback>

    );

}

const styles = StyleSheet.create({
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
    },
    loadMoreContainer: {
        paddingTop: 10,
        paddingBottom: 20
    },
    loadMore: {
        backgroundColor: 'transparent'
    }
})