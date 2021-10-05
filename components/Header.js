import { useContext } from 'react';
import AuthContext from '@/context/AuthContext'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Link from "next/link";
import Search from "@/components/Search";
import styles from "@/styles/Header.module.css";


export default function Header() {

  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {user ?
            // if logged in
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dasboard</a>
                </Link>
              </li>
              <li>
                <button className="btn-secondary btn-icon" onClick={() => logout()}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </> :
            // if loged out
            <>
              <li>
                <Link href="/account/login">
                  <a className='btn-secondary btn-icon'><FaSignInAlt />Login</a>
                </Link>
              </li>
            </>}
        </ul>
      </nav>
    </header>
  );
}
