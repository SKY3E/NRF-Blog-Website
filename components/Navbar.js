import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

// Top navbar
export default function Navbar() {
    const { user, username } = useContext(UserContext)

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/" legacyBehavior>
                        <button className="btn-logo">FEED</button>
                    </Link>
                </li>
                {/* sign out button */}
                <li>
                    <Link href="/enter" legacyBehavior>
                        <button className="btn-blue">Enter Page</button>
                    </Link>
                </li> 
                {/* user is signed in and has username */}
                {username && (
                    <>
                        <li className="push-left">
                            <Link href="/admin" legacyBehavior>
                                <button className="btn-blue">Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`} legacyBehavior>
                                <img src={user?.photoURL} />
                            </Link>
                        </li>
                    </>
                )}

                {/* user is not signed in or has not created username */}
                {!username && (
                    <li>
                        <Link href="/enter" legacyBehavior>
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>                    
                )}
            </ul>
        </nav>
    );
}