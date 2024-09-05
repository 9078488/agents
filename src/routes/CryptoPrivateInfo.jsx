import SignIn from './SignIn';
import auth from "../components/auth"
import BinanceAccountInfo from '../components/AccountInfo'
import BalancesBinance from '../components/BalancesBinance';

function CryptoPrivateInfo() {
    const user = auth.currentUser();
    return (
        <>
            { user ? <BalancesBinance /> : <SignIn />}
        </>
    );   
}

export default CryptoPrivateInfo;