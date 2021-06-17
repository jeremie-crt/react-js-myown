import React, { Component, Fragment } from 'react'
import {BrowserRouter, Link, Route, Switch, Redirect} from "react-router-dom";

import sessionContext from "../MyContext";

import Infos from "./Infos";
import UserArticles from "./UserArticles";
import Error404 from "./Error404";

class Account extends Component {

    render() {
        return (
            <sessionContext.Consumer>
                {
                    value => {
                        if(value.state) {
                            return (
                                <Fragment>
                                    <Route exact path={`${this.props.match.url}/infos`} component={Infos}/>

                                    <Route exact path={`${this.props.match.url}/articles`} component={UserArticles}/>

                                    <Route path='*' component={Error404}/>

                                </Fragment>

                            )

                        } else {
                            return <Redirect to='/' />
                        }
                    }
                }
            </sessionContext.Consumer>
        )
    }
}

export default Account