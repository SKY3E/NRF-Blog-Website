import Head from 'next/head';
import Link from "next/link";
import Loader from "../components/Loader";
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <div>
      <button onClick={() => toast.success('i am going to eat your grandma')}>
        Toast Me
      </button>
    </div>
  )
}
