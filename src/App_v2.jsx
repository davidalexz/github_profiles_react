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
    console.log(userData);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
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
        setUserData(null);
        setError(null);
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

                        <div className="search">
                            <h4>GitHub</h4>
                            <input
                                type="text"
                                id="search-input"
                                value={username}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                placeholder="Search for user"
                            />
                            {error && <div className="error-message">{error}</div>}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h2>Github Profiles</h2>
                    <div className="profile">
                        {/* {userData && userData.length > 0 && userData[0].owner && (
                        <img src={userData[0].owner.avatar_url} alt="" />
                    )} */}
                        <div className="info">
                            <img className="profile_logo" src={userData.avatar_url} alt="" />
                            <div className="username">
                                <a href={userData.url}>{userData.login}</a>
                            </div>
                            <small className="followers">
                                {userData.followers} followers • {userData.following} following
                            </small>
                            <div className="real_name">{userData.name}</div>
                            {userData.email && <div className="user_email">{userData.email}</div>}
                            {userData.location && (
                                <div className="user_location">{userData.location}</div>
                            )}
                        </div>
                    </div>
                    <div className="search">
                        <h4>GitHub</h4>
                        <input
                            type="text"
                            id="search-input"
                            value={username}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Search for user"
                        />
                        {error && <div className="error-message">{error}</div>}
                    </div>
                </>
            )}
        </>
    );
}
