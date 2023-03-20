import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import { useState } from 'react';
import { query, getDocs, collection, limit, where, orderBy, startAfter } from 'firebase/firestore';

const LIMIT = 5;

export async function getServerSideProps(context) {
  const postsQuery = query(
    collection(firestore, 'posts'),
    limit(LIMIT),
    orderBy('createdAt', 'desc'),
    where('published', "==", true)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props : { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const postsQuery = query(
      collection(firestore, 'posts'),
      limit(LIMIT),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      where('published', "==", true)
    );

    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());
    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load More</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end.'}
    </main>
  )
}
