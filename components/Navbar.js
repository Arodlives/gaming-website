import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import AuthContext from '../stores/authContext'
import toast, { Toaster } from 'react-hot-toast';


export default function Navbar() {
  //const val= useContext(AuthContext)
  //console.log(val)
  //* Destructuring
  const {user,login,logout,authReady}= useContext(AuthContext)
  console.log(user)
  const notify = () => toast.success('Your Account Has Successfully Registered.');


  return (
    <div className="container">
      <nav>
        <Image src="/rupee.png" width={50} height={48} />
        <h1>Gaming Vibes</h1>
        {authReady && (
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/guides"><a>Guides</a></Link></li>
          {!user && <li onClick={login-notify}  className='btn'>Login/Signup</li>}
          {user&& <li>{user.email}</li>}
          {user && <li onClick={logout-notify}  className='btn'>Log out</li>}
        </ul>
        )} 
      </nav>
      <div className="banner">
        <Image src="/banner.png" width={966} height={276} />
      </div>
    </div>
  )
}
