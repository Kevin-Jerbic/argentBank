import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk asynchrone pour connecter l'utilisateur à l'API
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials, { rejectWithValue }) => {
        try {
            // Envoie les informations de connexion à l'API
            const request = await axios.post(
                'http://localhost:3001/api/v1/user/login',
                userCredentials
            );
            const response = request.data;
            // Stocke les informations de l'utilisateur dans la session
            sessionStorage.setItem('user', JSON.stringify(response.body));
            // Retourne les informations de l'utilisateur
            return response.body;
        } catch (error) {
            // Gère les erreurs
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(sessionStorage.getItem('user')) || null, // État initial de l'utilisateur
        loading: false, // Indicateur de chargement
        error: null, // Message d'erreur
    },
    reducers: {
        logout: state => {
            // Déconnecte l'utilisateur
            state.user = null;
            // Supprime les informations de l'utilisateur de la session
            sessionStorage.removeItem('user');
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                // Début du chargement
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // Connexion réussie
                state.user = action.payload;
                // Fin du chargement
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                // Erreur lors de la connexion
                state.error = action.payload;
                // Fin du chargement
                state.loading = false;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

// Un Thunk est un concept de programmation dans lequel une fonction est utilisée pour retarder l'évaluation / le calcul d'une opération.

// Un Thunk asynchrone est une fonction qui retourne une promesse, qui peut être résolue ou rejetée.
// Ce thunk async prend 2 paramètres : une type d'action et une fonction asynchrone.

// slice : Tranche de l'état globale qui concernent un seul aspect de l'application, ex : l'utilisateur, le profil, les tâches, etc.
// Un slice contient 3 éléments : le nom du slice, l'état initial et les reducers.
// ExtraReducers : Permet de gérer les actions asynchrones créées avec createAsyncThunk.

// Lorsqu'une action asynchrone comme loginUser est dispatchée, Redux Toolkit gère automatiquement les états de l'action :
// - pending : l'action est en cours de traitement
// - fulfilled : l'action a réussi
// - rejected : l'action a échoué
// Ces états sont gérés dans extraReducers pour mettre à jour l'état de l'application en conséquence.
