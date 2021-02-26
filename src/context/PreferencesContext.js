import { createContext } from 'react';

const PreferencesContext = createContext({
    thme: '',
    toggleTheme: () => {}
});

export default PreferencesContext;