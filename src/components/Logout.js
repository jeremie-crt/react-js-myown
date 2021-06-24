import React, {useContext} from "react";
import {Redirect} from "react-router-dom";

import MyContext from "../MyContext";


const Logout = ({logout, session}) => {

    let auth = useContext(MyContext)
    if (auth.state) {
        logout()
    }

    return <Redirect to='/'/>
}

export default Logout