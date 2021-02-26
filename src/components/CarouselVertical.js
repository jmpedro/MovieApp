import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, LogBox } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import { map, size } from 'lodash';
import { BASE_PATH_IMG } from '../utils/constants';
import { getGenresMoviesApi } from '../api/movie';

LogBox.ignoreLogs(["Can't perform"]);
// Capturamos el ancho total de la pantalla y fijamos el ancho que va a tener cada item
const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = Math.round( width * 0.7 ); // Le indicamos que cada imagen va a ocupar el 70% de la pantalla 
const ITEM_HEIGHT = Math.round( height * 0.55 );

export default function CarouselVertical(props) {

    const { data, navigation } = props;

    return (
        <Carousel
            layout={'default'}
            data={data}
            renderItem={ (item) => <RenderItem data={item} navigation={navigation} /> }
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
        />
    )
}

function RenderItem(props) {

    const { data, navigation } = props;
    const { id, title, poster_path, genre_ids } = data.item;
    const [genres, setGenres] = useState(null);

    const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

    // Obtenemos los generos de cada pelicula
    
    useEffect(() => {
        
        getGenresMoviesApi(genre_ids).then(response => {
            setGenres(response)
        });

    }, []);

    // Funcion para navegar a movie pasandole el ID  de la pelicula
    const goToMovie = () => {

        navigation.navigate('movie', { id });

    }

    return (
        <TouchableWithoutFeedback onPress={goToMovie}>

            <View style={styles.card}>

                {/* En el source de la image usamos uri porque la imagen se obtiene a traves de http */}
                <Image style={styles.image} source={{ uri: imageUrl }} />
                <Title style={styles.title}>{title}</Title>
                
                {/* Si hay generos disponibles, los renderizamos */}
                <View style={styles.genres}>

                    {genres &&
                        map(genres, (genre, index) => (
                        <Text key={index} style={styles.genre}>
                            {genre}
                            {index !== size(genres) - 1 && ', '}
                        </Text>
                    ))}

                </View>
                
            </View>

        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    image: {
        width: '100%',
        height: ITEM_HEIGHT,
        borderRadius: 20
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10
    },
    genres: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    genre: {
        fontSize: 12,
        color: '#8997a5'
    }

})
