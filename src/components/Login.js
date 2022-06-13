import React,{useState, useEffect} from 'react';
import { validate } from './validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from './toast';
import styles from './SignUp.module.css'
import { Link } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data, "Login"))
    }, [data, touched]);

    const changHandler = event => {
        setData({...data, [event.target.name]: event.target.value})
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
            notify("you Loged in  successfuly", "success")
              
        } else {
            notify("invalid data!", "error")
            setTouched({
                email: true,
                password: true,
            })
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={submitHandler}>
                <h2 className={styles.header}>LogIn</h2>
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
                <div className={styles.formbuttons}>
                    <Link to="/signup">Sign Up</Link>
                    <button type="submit">Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;