import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/theme.scss';
import '../styles/highlight.css';
import '../styles/custom.css';
import i18n from '../public/i18n.js';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}