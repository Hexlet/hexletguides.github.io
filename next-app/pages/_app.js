import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/theme.scss';
import '../styles/prism.css';
import '../styles/custom.css';
import { appWithTranslation } from 'next-i18next';

const App = ({ Component, pageProps }) => <Component { ...pageProps } />;

export default appWithTranslation(App);
