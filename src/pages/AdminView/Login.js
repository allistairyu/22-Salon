const submitLogin = async (data) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({username: data.username, password: data.password}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.status === 204) {
            alert('bad credentials')
            return
        }
        const json = await response.json()
        localStorage.setItem('token', json.token)
        localStorage.setItem('username', json.username)
        window.location.reload()

    } catch (e) {
        console.log(e)
    }
}
export default submitLogin;