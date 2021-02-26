import { map } from 'lodash';
import React, { useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import { IconButton, Title, Text } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { getDataMovieApi } from '../api/movie';
import ModalVideo from '../components/ModalVideo';
import { BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = Math.round( height * 0.75 );

export default function Movie(props) {

    const { route } = props;
    const { id } = route.params;
    const [movie, setMovie] = useState(null);
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        
        getDataMovieApi(id).then(response => setMovie(response));

    }, [])

    if( !movie ) return null;

    return (
        <>
            <ScrollView>
                
                {/* Imagen de la pelicula */}
                <MovieImage posterPath={ movie && movie.poster_path } />
                
                {/* Reproductor de video  */}
                <PlayVideo setShow={setShow} />

                {/* Titulo de la pelicula y generos */}
                <MovieTitle movie={movie} />
                
                {/* Puntuacion */}
                <MovieRating voteAverage={movie.vote_average} voteCount={movie.vote_count} />

                {/* Descripcion */}
                <Text style={styles.overview}>{movie.overview}</Text>

                {/* Fecha de lanzamiento */}
                <Text style={[styles.overview, { marginBottom: 40 } ]}>Fecha de lanzamiento: {movie.release_date}</Text>

            </ScrollView>

            <ModalVideo show={show} setShow={setShow} idMovie={id} />

        </>
    )
}

// Imagen de la pelicula
function MovieImage(props) {

    const { posterPath } = props;

    return (
        <View style={styles.viewPoster}>

            <Image style={styles.imagePoster} source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}` }} /> 

        </View>
    );

}

// Reproductor de video 
function PlayVideo(props) {

    const { setShow } = props;

    return (
        <View style={styles.playView}>

            <IconButton icon='play' size={36} color='#000' onPress={() => setShow(true)} style={styles.playIcon}/>

        </View>
    );

}

// Titulo y generos
function MovieTitle(props) {

    const { movie } = props;

    if( !movie ) return null;

    return (
        <View style={styles.viewInfo}>

            <Title>{movie.title}</Title>
            
            <ScrollView horizontal style={styles.viewGenres} showsHorizontalScrollIndicator={false}>
                
                {map(movie.genres, (genre) => (
                    
                    <Text key={genre.id} style={styles.genres}>{genre.name}</Text>

                ))}
            
            </ScrollView>

        </View>
    );

}

// Rating
function MovieRating(props) {

    const { voteAverage, voteCount } = props;
    const { theme } = usePreferences();
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
            <Text style={{ marginRight: 10, fontSize: 16 }}>{media}</Text>
            <Text style={{ fontSize: 13, color: '#8697a5' }}>{voteCount} votos</Text>

        </View>
    );

}

const styles = StyleSheet.create({
    viewPoster: {
        shadowColor: '#000',
        height: ITEM_HEIGHT,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        textShadowRadius: 10
    },
    imagePoster: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    playView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    playIcon: {
        marginRight: 30,
        width: 60,
        height: 60,
        marginTop: -35,
        backgroundColor: '#fff',
        borderRadius: 100
    },
    viewInfo: {
        marginHorizontal: 20
    },
    viewGenres: {
        flexDirection: 'row'
    },
    genres: {
        fontSize: 15,
        marginRight: 20,
        color: '#8697a5'
    },
    viewRatings: {
        marginHorizontal: 20,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    overview: {
        marginHorizontal: 20,
        marginTop: 20,
        textAlign: 'justify',
        color: '#8697a5',
    }
})