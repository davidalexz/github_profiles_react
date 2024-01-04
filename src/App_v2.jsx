import { useState } from 'react';
import { useEffect } from 'react';
import logoImg from './Images/github-mark-white.svg';
import './App.css';

export default function App() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        if (username) {
            try {
                const res = await fetch(`https://api.github.com/users/${username}`);
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                    setError(null);
                    setUsername('');
                } else {
                    setUserData(null);
                    setError('User not found');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred, try later.');
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setUserData(null);
            setError(null);
            fetchData();
        }
    };

    const addKey = () => {
        document.addEventListener('keypress', handleKeyPress);
    };
    const removeKey = () => {
        document.removeEventListener('keypress', handleKeyPress);
    };

    useEffect(() => {
        addKey();
        //clean up effect
        return () => {
            removeKey();
        };
    }, []);

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    return (
        <>
            {!userData ? (
                <>
                    <h2>Github Profiles</h2>
                    <div className="main">
                        <div className="profile_start" id="profile_start">
                            <img src={logoImg} className="github_logo" alt="github" />
                            <small>Start your search below...</small>
                        </div>
                    </div>
                    <div className="search">
                        <input
                            type="text"
                            id="search-input"
                            value={username}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Search for user"
                        />
                        {error && <small className="error-message">{error}</small>}
                    </div>
                </>
            ) : (
                <>
                    <h2>Github Profiles</h2>
                    <div className="main">
                        <div className="info">
                            <img className="profile_logo" src={userData.avatar_url} alt="" />
                            <a className="username" href={userData.html_url} target="_blank">
                                {userData.login}
                            </a>
                            <small className="followers">
                                {userData.followers} followers • {userData.following} following
                            </small>
                            <div className="real_name"> Name: {userData.name}</div>
                            {userData.email && (
                                <div className="user_email">Email: {userData.email}</div>
                            )}
                            {userData.location && (
                                <div className="user_location">Location: {userData.location}</div>
                            )}
                        </div>
                    </div>
                    <div className="search">
                        <input
                            type="text"
                            id="search-input"
                            value={username}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Search for user"
                        />
                        {error && <small className="error-message">{error}</small>}
                    </div>
                </>
            )}
        </>
    );
}
