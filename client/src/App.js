import React, { createContext, useState } from 'react';
import { Router } from 'react-router';
import Data from './Component/Data/Data';
import Dates from './Component/Date/Date';
import Login from './Component/Login/Login';

export const context = createContext();

const App = () => {
    const [user,setUser] = useState('');
    return (
        <context.Provider value={[user,setUser]}>
            <Login></Login>
            {
                user != '' && <><Dates></Dates><Data></Data></>
            }
        </context.Provider>
    );
};

export default App;