import '../styles/globals.css';
import GetServerSideProps from 'next/app';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
