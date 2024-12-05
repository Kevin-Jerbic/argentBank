import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Composant de route protégée
const ProtectedRoute = ({ children }) => {
    // Récupère l'utilisateur depuis le store Redux
    const { user } = useSelector(state => state.user);

    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
    if (user === null) {
        return <Navigate to="/signin" />;
    } else {
        // Sinon, affiche les enfants (composants protégés)
        return children;
    }
};
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

// La route est protégée pour s'assurer que seuls les users authentifiés peuvent accéder au reste de l'application.

// Le useSelector permet d'accéder à l'état de user dans le store et donc de vérifier si un user est connecté.
