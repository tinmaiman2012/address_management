import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../components/Home';
import CreateAddress from '../components/address/CreateAddress';
import EditAddress from '../components/address/EditAddress';
import NoMatch from '../components/NoMatch'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const routes = (
    <div>
        <NavBar />
        <div class="container" >
            <div class="row">
                <div class="col-lg-12">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/create-address" component={CreateAddress} />
                        <Route exact path="/edit-address/:id" component={EditAddress} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
);

export default routes


