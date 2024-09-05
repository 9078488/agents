import auth from "../components/auth";
import SignIn from './SignIn';
import InputForm from "../components/InputForm";


function Input() {
    const user = auth.currentUser();
    return (
        <>
            { user ? <InputForm /> : <SignIn />}
        </>
    );
}

export default Input;