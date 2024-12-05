import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk asynchrone pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (token, { rejectWithValue }) => {
        try {
            // Envoie une requête GET à l'API pour récupérer le profil utilisateur
            const response = await axios.get(
                'http://localhost:3001/api/v1/user/profile',
                {
                    headers: {
                        // Ajoute le token d'authentification dans les en-têtes de la requête
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Retourne les données du profil utilisateur
            console.log(response.data.body);
            return response.data.body;
        } catch (error) {
            // En cas d'erreur, retourne un message d'erreur approprié
            return rejectWithValue(error.response?.data || 'Erreur !');
        }
    }
);

// Thunk asynchrone pour mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async ({ token, userName }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                'http://localhost:3001/api/v1/user/profile',
                // Envoie le nouveau nom d'utilisateur
                { userName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Retourne les données mises à jour
            console.log(response.data);
            return response.data;
        } catch (error) {
            // Gère les erreurs
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null, // État initial du profil
        loading: false, // Indicateur de chargement
        error: null, // Message d'erreur
        status: 'idle', // Statut de la mise à jour : Repos, aucune action en cours
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserProfile.pending, state => {
                // Début du chargement
                state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                // Profil récupéré avec succès
                state.profile = action.payload;
                // Fin du chargement
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                // Erreur lors du chargement
                state.error =
                    action.payload || 'erreur dans le chargement du profil';
                // Fin du chargement
                state.loading = false;
            })
            .addCase(updateUserProfile.pending, state => {
                // Début de la mise à jour
                state.status = 'pending';
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                // Profil mis à jour avec succès
                state.profile = action.payload;
                // Mise à jour réussie
                state.status = 'succeeded';
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                // Erreur lors de la mise à jour
                state.error = action.payload;
                // Mise à jour échouée
                state.status = 'failed';
            });
    },
});

export default profileSlice.reducer;

// Un Thunk est un concept de programmation dans lequel une fonction est utilisée pour retarder l'évaluation / le calcul d'une opération.

// Un Thunk asynchrone est une fonction qui retourne une promesse, qui peut être résolue ou rejetée.
// Ce thunk async prend 2 paramètres : une type d'action et une fonction asynchrone.

// slice : Tranche de l'état globale qui concernent un seul aspect de l'application, ex : l'utilisateur, le profil, les tâches, etc.
// Un slice contient 3 éléments : le nom du slice, l'état initial et les reducers.
// ExtraReducers : Permet de gérer les actions asynchrones créées avec createAsyncThunk.
