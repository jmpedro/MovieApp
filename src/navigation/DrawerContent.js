import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent(props) {
    
    const { navigation } = props;
    const [active, setActive] = useState(false);
    const { theme, toggleTheme } = usePreferences();

    // Funcion para navegar hacia la screen y marcarla como activa
    const onChangeScreen = (screen) => {

        setActive(screen);
        navigation.navigate(screen);

    }
    
    return (
        <DrawerContentScrollView>
            
            <Drawer.Section>

                <Drawer.Item 
                    label="Inicio" 
                    active={ active === 'home' }
                    onPress={() => onChangeScreen('home') } />

                <Drawer.Item 
                    label="Nuevas películas" 
                    active={ active === 'news' }
                    onPress={() => onChangeScreen('news') } />

                <Drawer.Item 
                    label="Peliculas populares" 
                    active={ active === 'popular' }
                    onPress={() => onChangeScreen('popular') } />          

            </Drawer.Section>

            <Drawer.Section title="Opciones">

                <TouchableRipple>
                    
                    <View style={styles.preferences}>

                        <Text>Tema oscuro</Text>
                        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />

                    </View>

                </TouchableRipple>

            </Drawer.Section>

        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preferences: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12
    }
})
