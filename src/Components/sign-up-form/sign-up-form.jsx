import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utilities/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    username:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () => {
    const [formfields, setFormFields] = useState(defaultFormFields);
    const {userName, email, password, confirmPassword} = formfields;


    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('passwords do not match');
            return;
        }

        try{
            const {user}  = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {userName});
            resetFormFields();
        }catch(error)
        {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already registered');
            }else{
                console.log('user creation encountered an error', error);
            }   
        }
    };

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formfields, [name]:value });
    }; 

    return(
        <div className="sign-up-container ">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password today!</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Username' type="text" required onChange={handleChange} name="username" value={userName}></FormInput>
                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}></FormInput>
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}></FormInput>
                <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}></FormInput>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;