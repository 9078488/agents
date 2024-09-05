import auth from "../components/auth";
import SignIn from './SignIn';
import OutputTable from '../components/OutputTable';

function Output() {
    const user = auth.currentUser();
    return (
        <>
           { user ? <OutputTable /> : <SignIn />}
        </>
    );
}

export default Output;