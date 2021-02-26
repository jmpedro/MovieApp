import React, { useMemo, useState } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper } from 'react-native-paper';
import { NavigationContainer,DarkTheme as DarkThemeNavigation, DefaultTheme as DefaultThemeNavigation } from '@react-navigation/native'
import Navigation from './src/navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';

export default function App() {

  // Configuramos el estado de nuestro tema
  const [theme, setTheme] = useState('dark');

  // Asignamos los colores de nuestra app
  // PAPER 
  DefaultThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.accent = '#1ae1f2';

  // NAVIGATION
  DarkThemeNavigation.colors.background = '#192734';
  DarkThemeNavigation.colors.card = '#15212b';

  // Funcion para que cambie el theme de la aplicacion cuando queramos

  const toggleTheme = () => {

    setTheme(theme === 'dark' ? 'light' : 'dark' );

  }

  const preferences = useMemo(
    () => ({
      toggleTheme,
      theme
    }),
    [theme]
  )

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper }>

        <StatusBar barStyle={'light-content'} />
        
        <NavigationContainer theme={theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation }>
          
          <Navigation />

        </NavigationContainer>

      </PaperProvider>
    </PreferencesContext.Provider>
  )
}

const styles = StyleSheet.create({})
