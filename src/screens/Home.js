import React, { useState, useEffect } from 'react'
import { Title, Text } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native'
import { getAllGenresMoviesApi, getMoviesByGenreApi, getNewsMoviesApi } from '../api/movie';
import { map } from 'lodash';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';

export default function Home(props) {

    const { navigation } = props;
    const [newMovie, setNewMovie] = useState(null);
    const [genreList, setGenreList] = useState([]);
    const [genreSelected, setGenreSelected] = useState(28);
    const [moviesByGenre, setMoviesByGenre] = useState();
    
    // UseEffect para obtener las peliculas recientes 
    useEffect(() => {
        
        getNewsMoviesApi().then(response => {
            setNewMovie(response.results);
        })

    }, [])

    // UseEffect para renderizar todos los generos de peliculas
    useEffect(() => {
        
        getAllGenresMoviesApi().then(response => {
            setGenreList(response.genres);
        })

    }, []);

    // UseEffect para renderizar todos las peliculas de un genero
    useEffect(() => {
        
        getMoviesByGenreApi(genreSelected).then(response => setMoviesByGenre(response.results));

    }, [genreSelected])

    // Funcion para marcar de un color el genero activo
    const onClickGenreSelected = (genreId) => {

        setGenreSelected(genreId);

    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            
            {/* Si hay peliculas que mostrar las renderizamos */}
            { newMovie && (

                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas películas</Title>

                    <CarouselVertical data={newMovie} navigation={navigation} />

                </View>

            ) }
            
            {/* Todos los generos de peliculas */}
            <View style={styles.genres}>

                <Title style={styles.genreTitle}>Películas por género</Title>

                {/* Scrollview horizontal de los generos */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
                    {map(genreList, (genre) => (
                        <Text key={genre.id} 
                              style={[styles.genre, { color: genreSelected !== genre.id ? '#8697a5' : '#fff'  }]}
                              onPress={() => onClickGenreSelected(genre.id)} >

                            {genre.name}
                            
                        </Text>
                    ))}
                </ScrollView>

                {/* Si hay peliculas para un genero se muestran */}
                { moviesByGenre && (
                    <CarouselMulti data={moviesByGenre} navigation={navigation} />
                ) }

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 10,
    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22
    },
    genres: {
        marginTop: 20,
        marginBottom: 50
    },
    genreTitle: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22
    },
    genreList: {
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 15,
        padding: 10
    },
    genre: {
        fontSize: 16,
        marginRight: 20
    }
})
