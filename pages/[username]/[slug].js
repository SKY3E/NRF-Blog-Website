import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getDocs, getDoc, collection, doc, query, where } from 'firebase/firestore'

export async function getStaticProps(context) {
  const username = context.params.username;
  const slug = context.params.slug;

  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRefQuery = query(collection(firestore, 'posts'), where('slug', '==', slug));
    const querySnapshot = await getDocs(postRefQuery);
    if (!querySnapshot.empty) {
      const postRef = querySnapshot.docs[0].ref;
      post = postToJSON(await getDoc(postRef));
      path = postRef.path;
    } else {
      console.log('Document not found.');
    }
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(firestore, 'posts'));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params : { slug, username },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export default function Post(props) {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>

      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

      </aside>
    </main>
  );
}