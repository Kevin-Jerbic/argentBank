import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Store/userSlice';
import '../styles/Form.css';

function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setMsgError] = useState('');

    // Récupération de l'état de chargement depuis le store Redux
    const { loading } = useSelector(state => state.user);

    // Permet d'envoyer des actions vers le store Redux et met à jour l'état en fonction de l'action envoyée.
    // Dispatch = je parle à Redux
    const dispatch = useDispatch();

    // useNavigate est un hook de React Router qui permet de naviguer de manière programmatique.
    const navigate = useNavigate();

    const HandleLoginEvent = async e => {
        e.preventDefault();

        // Création d'un objet contenant les infos de connexion de user.
        let userCredentials = {
            email,
            password,
        };

        try {
            // Envoi des informations de connexion à l'API
            // createAsyncThunk() encapsule les valeurs et erreurs dans des objets spécifiques
            // Tandis que unwrap() permet de les extraire directement.
            const result = await dispatch(loginUser(userCredentials)).unwrap();

            if (result) {
                // Reset des champs de formulaire et redirection
                setEmail('');
                setPassword('');
                navigate('/user');
            }
        } catch (error) {
            // Affichage d'un message d'erreur en cas d'échec de la connexion
            setMsgError('Identifiant ou mot de passe incorrect !', error);
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={HandleLoginEvent}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                    {msgError && <div role="alert">{msgError}</div>}
                </form>
            </section>
        </main>
    );
}

export default Form;
