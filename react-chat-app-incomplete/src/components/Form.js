import styles from './Form.module.css';
import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsFillImageFill } from 'react-icons/bs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth, storage, db } from '../data/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const Form = ({ signUp }) => {
  // get user entered values
  const emailRef = useRef();
  const passwordRef = useRef();

  const displayNameRef = useRef();
  const avatarRef = useRef();

  // navigation
  const navigate = useNavigate();

  // avatar handler
  const avatarHandler = () => {
    console.log(avatarRef.current.value);
  };

  // submit form
  const submitHandler = async (e) => {
    e.preventDefault();

    const userEmail = emailRef.current.value;
    const userPassword = passwordRef.current.value;
    const displayName = displayNameRef.current.value;
    const avatar = avatarRef.current.value;

    // sign up new account
    if (signUp) {
      try {
        // create new user
        const res = await createUserWithEmailAndPassword(
          auth,
          userEmail,
          userPassword
        );

        // upload avatar and display name
        const storageRef = ref(storage, 'images/rivers.jpg');

        const uploadTask = uploadBytesResumable(storageRef, avatar);

        uploadTask.on(
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  photoURL: downloadURL,
                  displayName,
                });
                await setDoc(doc(db, 'users', res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  userEmail,
                  photoURL: downloadURL,
                });
              }
            );
          }
        );

        alert('account created!');

        // navigate to signIn
        navigate('/');
      } catch (error) {
        // alert errors
        alert(error);
      }
    }

    // sign in existing account
    if (!signUp) {
      try {
        await signInWithEmailAndPassword(auth, userEmail, userPassword);

        // navigate to chat
        navigate('/chat');
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h2>Chat App</h2>

      {/* display name */}
      {signUp && (
        <input
          required
          type='text'
          placeholder='display name'
          ref={displayNameRef}
        />
      )}

      {/* email */}
      <input required type='email' placeholder='email' ref={emailRef} />

      {/* password */}
      <input
        required
        type='password'
        placeholder='password'
        ref={passwordRef}
      />

      {/* avatar */}
      {signUp && (
        <label>
          <BsFillImageFill className={styles.imageIcon} />
          Add an avatar
          <input
            required
            type='file'
            ref={avatarRef}
            onChange={avatarHandler}
          />
        </label>
      )}

      {/* signin / signup */}
      <button type='submit'>{signUp ? 'Create Account' : 'Log In'}</button>

      {/* navigate to sign in */}
      {signUp && (
        <p>Already has an account? {<NavLink to={'/'}>Login</NavLink>}</p>
      )}

      {/* navigate to sign up */}
      {!signUp && (
        <p>Don't have an account? {<NavLink to='/signup'>Signup</NavLink>}</p>
      )}
    </form>
  );
};

export default Form;
