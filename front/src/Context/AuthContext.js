import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useApi } from './ApiContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // Stocke les informations utilisateur
  const [loading, setLoading] = useState(true);  // Indique si les données de l'utilisateur sont en cours de chargement
  const { apiUrl } = useApi();                   // URL de base pour les appels API

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Si un token est trouvé dans le localStorage, récupère les données utilisateur
    if (token) {
      axios.get(`${apiUrl}/profil/`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setUser(response.data);  // Stocke les données utilisateur
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
          // En cas d'erreur, supprime les tokens et réinitialise `user`
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);  // Termine le chargement
        });
    } else {
      setLoading(false);  // Termine le chargement si aucun token n'est trouvé
    }
  }, [apiUrl]);

  // Fonction de connexion
  const login = async (formData) => {
    try {
      const response = await axios.post(`${apiUrl}/login/`, formData);
      const { token, refresh, user } = response.data;
console.log(response.data);

      // Stocke les tokens dans le localStorage et les données utilisateur dans le state
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refresh);
      setUser(user);  // Mise à jour de l'état utilisateur avec les données récupérées
      
      return user;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;  // Rejette l'erreur pour que le composant Login puisse la gérer
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await axios.post(`${apiUrl}/deconnexion/`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Erreur lors de la déconnexion de l'API", error);
      }
    }
    // Nettoie les tokens et réinitialise `user`
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
