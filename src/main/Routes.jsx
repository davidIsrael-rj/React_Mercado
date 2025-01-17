import React from "react";
import { Switch, Route, Redirect } from 'react-router'

import Home from "../components/home/Home";
import UserCrud from "../components/user/UserCrud";
import CustomerCrud from "../components/customer/CustomerCrud";



export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/users' component={UserCrud}/>
        <Route path='/customer' component={CustomerCrud}/>
        <Redirect from='*' to='/' />
    </Switch>