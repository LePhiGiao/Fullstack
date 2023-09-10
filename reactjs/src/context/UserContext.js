
import React, { useCallback, useEffect, useState } from 'react';
import { getUserAccount } from '../services/userService'

const UserContext = React.createContext(null)

function UserProvider({ children }) {
    const userDefault = {
        isLoading: true,
        isAuthenticated: 'false',
        token: '',
        account: {}
    }
    const [user, setUser] = useState(userDefault)

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    }

    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false
        }))
    }

    const fetchUser = useCallback(async () => {
        let response = await getUserAccount()

        if (response && response.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles
            let email = response.DT.email
            let username = response.DT.username
            let token = response.DT.access_token

            let data = {
                isAuthenticated: true,
                token: token,
                account: { groupWithRoles, email, username },
                isLoading: false
            }
            setUser(data)
        }
        else {
            setUser({ ...userDefault, isLoading: false })
        }
    }, [])

    useEffect(() => {
        if (window.location.pathname !== '/' || window.location.pathname !== '/login') {
            fetchUser()
        }
    }, [fetchUser])


    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };