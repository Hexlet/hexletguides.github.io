import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/theme.scss';
import '../styles/prism.css';
import '../styles/custom.css';
import { appWithTranslation, AppProps } from 'next-i18next';

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default appWithTranslation(App);