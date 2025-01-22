import React from "react";
import { Switch, Route, Redirect } from 'react-router'

import Home from "../components/home/Home";
import UserCrud from "../components/user/UserCrud";
import CustomerCrud from "../components/customer/CustomerCrud";
import SectorCrud from "../components/sector/sectorCrud";
import ProductCrud from "../components/product/productCrud";
import SupplierCrud from "../components/supplier/supplierCrud";



export default props =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/users' component={UserCrud}/>
        <Route path='/customer' component={CustomerCrud}/>
        <Route path='/sector' component={SectorCrud}/>
        <Route path='/product' component={ProductCrud}/>
        <Route path='/supplier' component={SupplierCrud }/>
        <Redirect from='*' to='/' />
    </Switch>