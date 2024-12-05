import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from '../components/Footer';
import Form from '../components/Form';
import Header from '../components/Header';
import '../styles/index.css';

function SignIn() {
    return (
        <div className="body">
            <HelmetProvider>
                <Helmet>
                    <title>ArgentBank - SignIn</title>
                </Helmet>
            </HelmetProvider>
            <Header />
            <Form />
            <Footer />
        </div>
    );
}

export default SignIn;
