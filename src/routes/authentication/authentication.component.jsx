import SignUpForm from '../../Components/sign-up-form/sign-up-form';
import SignInForm from '../../Components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const Authentication = () =>{
    //we are making a call to the database
    return(
        <div className='authentication-container'>
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>
        </div>
    );
}

export default Authentication;