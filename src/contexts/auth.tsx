import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    async function getStorage() {
      const [
        [, userStoraged],
        [, tokenStoraged],
      ] = await AsyncStorage.multiGet([
        '@ContextAuth::user',
        '@ContextAuth::token',
      ]);
      console.log('userStoraged = ', userStoraged);
      console.log('tokenStoraged = ', tokenStoraged);

      if (userStoraged && tokenStoraged) {
        setUser(JSON.parse(userStoraged));
      }
    }
    getStorage();
  }, []);

  async function signIn() {
    const response = await auth.signIn();

    AsyncStorage.setItem('@ContextAuth::user', JSON.stringify(response.user));
    AsyncStorage.setItem('@ContextAuth::token', response.token);

    setUser(response.user);
  }

  function signOut() {
    AsyncStorage.clear().then((_) => setUser(null));
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
