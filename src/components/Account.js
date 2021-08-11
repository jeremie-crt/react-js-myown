import React, {Component} from 'react'
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
                        if (value.state) {
                            return (
                                <Switch>

                                    <Route exact path={`${this.props.match.url}/infos`}>
                                        <Infos
                                            saveUserInfo={this.props.saveUserInfo}
                                            userInfo={this.props.userInfo}
                                        />
                                    </Route>

                                    <Route exact path={`${this.props.match.url}/articles`}>
                                        <UserArticles
                                        addNewArticle={this.props.addNewArticle}
                                        user={value.user}
                                        />
                                        </Route>

                                    <Route component={Error404}/>
                                </Switch>
                            )

                        } else {
                            return <Redirect to='/'/>
                        }
                    }
                }
            </sessionContext.Consumer>
        )
    }
}

export default Account