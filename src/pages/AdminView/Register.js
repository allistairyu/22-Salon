const submitRegister = async (data) => {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({username: data.username, password: data.password}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json()
        localStorage.setItem('token', json.token)
    } catch (e) {
        console.log(e)
    }
}

export default submitRegister;