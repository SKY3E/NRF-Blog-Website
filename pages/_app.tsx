import '../styles/globals.css';
import GetServerSideProps from 'next/app';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
