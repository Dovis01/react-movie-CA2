/**
 * API for user authentication
 * */
export const login = async (user) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: user.username, password: user.password })
    });
    return response.json();
};

export const signup = async (user) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: user.username, email:user.email, password: user.password })
    });
    return response.json();
};