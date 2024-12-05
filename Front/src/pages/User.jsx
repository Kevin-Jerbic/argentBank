import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Transactions from '../components/Transactions';

function User() {
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>ArgentBank - User</title>
                </Helmet>
            </HelmetProvider>
            <Header />
            <Transactions />
            <Footer />
        </div>
    );
}

export default User;
