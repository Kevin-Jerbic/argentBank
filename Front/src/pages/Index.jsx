import { Helmet, HelmetProvider } from 'react-helmet-async';
import Banner from '../components/Banner';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Index() {
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>ArgentBank - Accueil</title>
                </Helmet>
            </HelmetProvider>
            <Header />
            <Banner />
            <Features />
            <Footer />
        </div>
    );
}

export default Index;
