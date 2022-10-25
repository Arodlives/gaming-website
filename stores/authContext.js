import { createContext, useEffect,useState } from "react";
import  netlifyIdentity from 'netlify-identity-widget';
import toast, { Toaster } from 'react-hot-toast';

//*Context blue print😀
const AuthContext  = createContext({
    user:null,
    login:()=>{},
    logout:()=>{},
    authReady:false
})
// Provides  global  state context to  be  the  user
// Weather  they're  logged in or not
// This is a canvas of  what  the  context looks  like or like in c# the tables context 
//*Auth ready state keeps  track  of when we've established a 
//*Connection to netlify identity  turned to  true when verifying  identity
//*When using a context need  a provider
//* provides the  context to other  components
//? A react component below
//? Destructuring children from props  whatever  the component wraps
export  const  AuthContextProvider  =({children})=>{
    const [user,setUser]=useState(null)
    const [authReady,setAuthReady]=useState(false)

    useEffect(()=>{
        //* Listens for when a  user is logging in
        netlifyIdentity.on('login',(user)=>{
        setUser(user)
        //* Closes the modal
        netlifyIdentity.close()
        console.log('login event')
        toast.success("Successfully Logged In")
        })
        netlifyIdentity.on('logout',()=>{
        setUser(null)
        console.log('logout event')
        toast.success("Successfully Logged Out")
        })
        netlifyIdentity.on('init',(user)=>{
        setUser(user)
        setAuthReady(true)
        console.log('init event')
        })


        //* Fire a  component when a  function first mounts
        //* With  an empty dependency array when it  first mounts  
        //? Init netlify  identity connection 
        netlifyIdentity.init()
        
        return ()=>{
            //*Best Practice Unregister Event Listeners if ever unmounted
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    },[])



    //*😮‍💨Call this funct when a user clicks a button
    const  login=()=>{
        //* opens a  modal  styled
        netlifyIdentity.open()
    }

    const logout =()=>{
        //* By default  popups with a modal to  logout
        netlifyIdentity.logout();
    }


    //const context = {user:user,login:login}
    //or
    const context ={user,login,logout,authReady}

    return (
        //? Wraps AuthContextProvider to be able to add more logic above
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext


