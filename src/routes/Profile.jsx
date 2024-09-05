import SignIn from './SignIn';
import auth from "../components/auth"

function Profile() {
    const user = auth.currentUser();
    return (
        <>
             { user ? <div>Profile</div> : <SignIn />}
        </>
    );
}

export default Profile;