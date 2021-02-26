import { map } from 'lodash';
import React, { useState, useEffect } from 'react'
import { Button, Text, Title } from 'react-native-paper';
import { Image, ScrollView, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { getPopularMoviesApi } from '../api/movie';
import { BASE_PATH_IMG } from '../utils/constants';
import defaultImg from '../assets/png/default-image.png';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';
import { Rating } from 'react-native-ratings';

export default function Popular(props) {

    const { navigation } = props;
    const [moviePopular, setMoviePopular] = useState(null);
    const [showBtnMore, setShowBtnMore] = useState(true);
    const [page, setPage] = useState(1);
    const { theme } = usePreferences();

    // Funcion para cargar las peliculas mas populares por paginacion
    useEffect(() => {
        getPopularMoviesApi(page).then(response => {
            
            // Obtenemos el total de paginas 
            const totalPages = response.total_pages;

            // Si la pagina es menor al total, añadimos las nuevas peliculas, si no, el boton de cargar mas desaparece
            if( page < totalPages ) {
                
                if( !moviePopular ) {

                    setMoviePopular(response.results);

                }else {
                    
                    // Añadimos las nuevas peliculas junto a las que ya estaban antes
                    setMoviePopular([...moviePopular, ...response.results]);

                }

            }else {

                setShowBtnMore(false);

            }

        })
    }, [page]);

    if( !moviePopular ) return <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 20 }}>Cargando...</Text>

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            
            { map(moviePopular, (movie, index) => (

                <Movie key={index} movie={movie} theme={theme} navigation={navigation} />

            )) }

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

function Movie(props) {

    const { movie, theme, navigation } = props;
    const { id, poster_path, title, release_date, vote_average, vote_count } = movie;

    const goToMovie = () => {

        navigation.navigate('movie', { id })

    }

    return(
        <TouchableWithoutFeedback onPress={goToMovie}>

            <View style={styles.movie}>

                <View style={styles.left}>

                    <Image style={styles.image} source={
                        poster_path  
                        ? { uri: `${BASE_PATH_IMG}/w500${poster_path}` }
                        : defaultImg
                    } />

                </View>

                <View style={styles.rigth}>
                    
                    {/* Titulo */}
                    <Title>{title}</Title>

                    {/* Fecha de lanzamiento  */}
                    <Text>{release_date}</Text>

                    {/* Puntuacion  */}
                    <MovieRating theme={theme} voteAverage={vote_average} voteCount={vote_count} />

                </View>

            </View>

        </TouchableWithoutFeedback>
        
    )

}

// Puntuacion
function MovieRating(props) {

    const { voteAverage, voteCount, theme } = props;
    const media = voteAverage / 2;

    return (
        <View style={styles.viewRatings}>
            
            <Rating
                type='custom'
                ratingImage={ theme === 'dark' ? starDark : starLight }
                ratingColor='#ffc205'
                ratingBackgroundColor={ theme === 'dark' ? '#192734' : '#f0f0f0' }
                startingValue={media}
                imageSize={20}
                style={{ marginRight: 15 }}
            />
            <Text style={{ fontSize: 13, color: '#8697a5', marginTop: 5 }}>{voteCount} votos</Text>

        </View>
    );

}

const styles = StyleSheet.create({
    movie: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    left: {
        marginRight: 20
    },
    image: {
        width: 100,
        height: 150
    },
    viewRatings: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    loadMoreContainer: {
        
        paddingTop: 10,
        paddingBottom: 20
    },
    loadMore: {
        backgroundColor: 'transparent'
    }
})