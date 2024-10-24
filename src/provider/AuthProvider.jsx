import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";



export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }


  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }


  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }


  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  }


  const updateUserProfile = (auth, photo, name) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    })
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('user in the use state changed');
      setUser(currentUser);
      if (currentUser) {
        // get token and store
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo)
        .then(res =>{
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
            setLoading(false);
          }
        })
      }
      else {
        // TODO: remove token (if token stored in the client side: local storage, caching, in memory)
        localStorage.removeItem('access-token');
      }
      setLoading(false);
    })
    return () => {
      return unSubscribe();
    }

  }, [axiosPublic])



  const userInfo = { user, loading, createUser, signInUser: signIn, googleSignIn, logOut, updateUserProfile }
  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;