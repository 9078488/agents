import GoTrue from 'gotrue-js';

const auth = new GoTrue({
    APIUrl: import.meta.env.VITE_APIUrl,
    audience: '',
    setCookie: true,
})

export default auth;