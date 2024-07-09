import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../Firebase/firebase.config'
import useAxiosPublic from '../Hook/useAxiosPublic'
export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }


  const logOut = () =>{
    setLoading(false);
    return signOut(auth);
}

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }


  // onAuthStateChange
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,currentUser=>{
         setUser(currentUser)
         console.log('current user -->',currentUser)
         if(currentUser){
             const userInfo = {email : currentUser.email}
             axiosPublic.post('/jwt',userInfo)
             .then(res=>{
                 if(res.data.token){
                     localStorage.setItem('access-token',res.data.token)
                     setLoading(false)
                 }
             })
             
         }
         else{
             localStorage.removeItem('access-token')   
             setLoading(false)       
         }
     })
     return ()=>{
         return unsubscribe();
     }
 },[axiosPublic,user?.email])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,

    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.array,
}

export default AuthProvider