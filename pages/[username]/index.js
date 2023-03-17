import PostFeed from '../../components/PostFeed';
import UserProfile from '../../components/UserProfile';
import { getUserWithUsername, postToJSON } from '../../lib/firebase'; 
import { firestore } from '../../lib/firebase';
import { query, getDocs, collection, limit, where, orderBy } from 'firebase/firestore';

export async function getServerSideProps(context) {
  console.log(context.params.username);
  const username = context.params.username;

  const userDoc = await getUserWithUsername(username);

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = query(
      collection(firestore, 'posts'),
      limit(5),
      orderBy('createdAt', 'desc'),
      where('username', "==", username),
      where('published', "==", true)
    );

    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}