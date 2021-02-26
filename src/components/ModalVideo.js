import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform } from 'react-native';
import { Modal, IconButton, Title } from 'react-native-paper';
import WebView from 'react-native-webview';
import YouTube from 'react-native-youtube';
import { getVideoMovieApi } from '../api/movie';
import { URL_YOUTUBE_EMBED } from '../utils/constants';

export default function ModalVideo(props) {

    const { show, setShow, idMovie } = props;
    const [video, setVideo] = useState(null);

    // Funcion para obtener el id del video
    useEffect(() => {
        
        getVideoMovieApi(idMovie).then(response => {

            let videoID = "";
            response.results.forEach(video => {

                if( video.site === 'YouTube' && !videoID ){

                    videoID = video.key;

                }

            });
            
            setVideo(videoID);

        })

    }, [])

    return (
        <Modal visible={show} contentContainerStyle={styles.modal}>

            {/* Si es IOS mostramos el componente youtube, si no, WebView */}
            { Platform.OS === 'ios' ? (
                
                <YouTube videoId={video} styles={styles.video} />

            ) : (
                <WebView
                    style={{ width: 500}}
                    source= {{
                        uri: `${URL_YOUTUBE_EMBED}/${video}?controls=true&showInfo=true`
                    }}
                />
            ) }
            
            <Title>Hola video</Title>
            <IconButton icon='close' onPress={() => setShow(false)} style={styles.close} />

        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#000',
        height: '120%',
        alignItems: 'center'
    },
    close: {
        backgroundColor: '#1ea1f2',
        width: 50,
        height: 50,
        borderRadius: 100,
        position: 'absolute',
        bottom: 100
    },
    video: {
        alignSelf: 'stretch',
        height: 300
    }
})
