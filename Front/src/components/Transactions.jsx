import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../Store/profileSlice';
import '../styles/Transactions.css';
import Account from './Account';

function Transactions() {
    // Permet d'envoyer des actions vers le store Redux et met à jour l'état en fonction de l'action envoyée.
    const dispatch = useDispatch();
    // Récupère le token de l'utilisateur depuis le store Redux.
    const token = useSelector(state => state.user.user?.token);
    // Récupère le profil de l'utilisateur depuis le store Redux.
    const profile = useSelector(state => state.profile.profile);

    // Si un token est présent, il envoie une action pour récupérer le profil utilisateur.
    // dispatch est inclus dans le tableau de dépendance pour s'assurer que la fonction useEffect
    // est réexécutée si dispatch change (ce qui est peu probable mais recommandé par les règles de hooks).
    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile(token));
        }
    }, [dispatch, token]);

    // État pour gérer l'édition du nom d'utilisateur.
    const [editName, setEditName] = useState(false);
    const [updateUsername, setUpdateUsername] = useState(
        profile ? profile.userName : ''
    );
    const [tempUsername, setTempUsername] = useState('');

    // Met à jour le nom d'utilisateur lorsque le profil change.
    useEffect(() => {
        if (profile) {
            setUpdateUsername(profile.userName);
        }
    }, [profile]);

    // Gestion des événements pour afficher et annuler l'édition du nom.
    const handleEditClick = () => {
        setTempUsername(updateUsername);
        setEditName(true);
    };

    const handleCancelClick = () => {
        setUpdateUsername(tempUsername);
        setEditName(false);
    };

    // Gestion de la saisie de l'utilisateur.
    const handleUsernameChange = e => {
        setUpdateUsername(e.target.value);
    };

    const handleSubmit = e => {
        // Empêche le rechargement de la page
        e.preventDefault();
        // Envoyer l'action de mise à jour du profil utilisateur
        dispatch(updateUserProfile({ token, userName: updateUsername }))
            .then(() => {
                // Désactiver le mode édition en cas de succès
                setEditName(false);
                // Récupérer le profil utilisateur mis à jour
                dispatch(fetchUserProfile(token));
            })
            .catch(error => {
                // Afficher un message d'erreur en cas d'échec
                console.error('Erreur dans le changement de nom !', error);
            });
    };

    return (
        <div className="main bg-dark">
            {!editName ? (
                <div className="header">
                    <h1>
                        Welcome back,
                        <br />
                        {profile
                            ? `${profile.firstName} ${profile.lastName}`
                            : 'Guest'}
                        !
                    </h1>
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit Name
                    </button>
                </div>
            ) : (
                <div>
                    <form className="header" onSubmit={handleSubmit}>
                        <h2>Edit user info</h2>
                        <div className="input-content">
                            <label htmlFor="userName">User name: </label>
                            <input
                                className="input"
                                type="text"
                                id="userName"
                                value={updateUsername}
                                onChange={handleUsernameChange}
                            ></input>
                        </div>
                        <div className="input-content">
                            <label htmlFor="firstName">First name: </label>
                            <input
                                className="input"
                                type="text"
                                id="firstName"
                                value={profile ? profile.firstName : ''}
                                disabled
                            ></input>
                        </div>
                        <div className="input-content">
                            <label htmlFor="lastName">Last name: </label>
                            <input
                                className="input"
                                type="text"
                                id="lastName"
                                value={profile ? profile.lastName : ''}
                                disabled
                            ></input>
                        </div>
                        <div className="button-content">
                            <button
                                className="edit-button save-button"
                                type="submit"
                            >
                                Save
                            </button>
                            <button
                                className="edit-button cancel-button"
                                type="button"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <h2 className="sr-only">Accounts</h2>

            <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
                button="View transactions"
            />
            <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
                button="View transactions"
            />
            <Account
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
                button="View transactions"
            />
        </div>
    );
}

export default Transactions;
