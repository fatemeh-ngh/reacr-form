import React,{useState, useEffect} from 'react';
import { validate } from './validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from './toast';
import styles from './SignUp.module.css'
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false
        
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data, "SignUp"))
    }, [data, touched]);

    const changHandler = event => {
        if(event.target.name === 'isAccepted'){
            setData({...data, [event.target.name]: event.target.checked})
        }else{
            setData({...data, [event.target.name]: event.target.value})
        }
    };

    const focusHandler = event => {
        setTouched({ 
            ...touched,
            [event.target.name] : true
        })
    };

    const submitHandler = event => {
        event.preventDefault();
        notify();
        if (!Object.keys(errors).length) {
            console.log(data)
            notify("you signed up successfuly", "success")
              
        } else {
            notify("invalid data!", "error")
            setTouched({
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true
            })
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={submitHandler}>
                <h2 className={styles.header}>Sign Up</h2>
                <div className={styles.formfield}>
                    <label>Name</label>
                    <input 
                        className={(errors.name && touched.name) ? styles.uncompleted : styles.forminput} 
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={changHandler} 
                        onFocus={focusHandler}/>
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div className={styles.formfield}>
                    <label>Email</label>
                    <input 
                        className={(errors.email && touched.email) ? styles.uncompleted : styles.forminput} 
                        type="text" 
                        name="email" 
                        value={data.email} 
                        onChange={changHandler} 
                        onFocus={focusHandler}/>
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formfield}>
                    <label>Password</label>
                    <input 
                        className={(errors.password && touched.password) ? styles.uncompleted : styles.forminput} 
                        type="password" 
                        name="password" 
                        value={data.password} 
                        onChange={changHandler} 
                        onFocus={focusHandler}/>
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formfield}>
                    <label>Confirm Password</label>
                    <input 
                        className={(errors.confirmPassword && touched.confirmPassword) ? styles.uncompleted : styles.forminput} 
                        type="password" 
                        name="confirmPassword" 
                        value={data.confirmPassword} 
                        onChange={changHandler} 
                        onFocus={focusHandler}/>
                    {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>
                <div className={styles.formfield}>
                    <div className={styles.checkboxcontainer}>
                    <label>I accept terms of privacy policy</label>
                    <input 
                        type="checkbox"
                         name="isAccepted"
                        value={data.isAccepted} 
                        onChange={changHandler} 
                        onFocus={focusHandler}
                        />
                    </div>
                    {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                </div>
                <div className={styles.formbuttons}>
                    <Link to="/login">Login</Link>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;