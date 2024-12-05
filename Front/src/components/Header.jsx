import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../assets/argentBankLogo.png';
import { logout } from '../Store/userSlice';
import '../styles/Header.css';

function Header() {
    // Permet d'envoyer des actions vers le store Redux et met à jour l'état en fonction de l'action envoyée.
    const dispatch = useDispatch();
    // Permet d'extraire les données du store.
    const user = useSelector(state => state.user.user);
    // Utilisation de useSelector pour accéder au profil utilisateur dans le store Redux
    const profile = useSelector(state => state.profile.profile);

    // Fonction pour gérer la déconnexion de l'utilisateur
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header>
            <nav className="main-nav">
                {/* Lien vers la page d'accueil avec le logo */}
                <NavLink className="main-nav-logo" to="/">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                </NavLink>
                <div className="main-nav-link">
                    {user ? (
                        <>
                            {/* Lien vers la page utilisateur avec le nom du profil */}
                            <NavLink className="main-nav-item" to="/user">
                                <i className="fa fa-user-circle"></i>
                                {profile ? profile.userName : 'user'}
                            </NavLink>
                            {/* Lien pour se déconnecter */}
                            <NavLink
                                className="main-nav-item"
                                to="/"
                                onClick={handleLogout}
                            >
                                <i className="fa fa-sign-out"></i>
                                Sign Out
                            </NavLink>
                        </>
                    ) : (
                        // Lien vers la page de connexion si l'utilisateur n'est pas connecté
                        <NavLink className="main-nav-item" to="/signin">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;

// useSelector prend une fonction en argument qui reçoit l'état global du store et retourne la partie de l'état dont le composant a besoin.
// Dans ce cas, le composant a besoin de l'utilisateur connecté et du profil utilisateur.
