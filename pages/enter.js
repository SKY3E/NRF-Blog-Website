import { googleAuthProvider, auth } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

export default function EnterPage({ }) {
  const user = null;
  const username = null;
  
  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
      <main>
          {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
      </main>
  );
}

// Sign in with google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
    .then((re) => {
      console.log(re);
    });
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src='/google.png' /> Sign in with Google
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
}

function UsernameForm() {

}