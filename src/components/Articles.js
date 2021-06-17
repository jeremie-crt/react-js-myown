import React, { Component, Fragment } from 'react'
import {BrowserRouter, Link, Route, Switch, Redirect} from "react-router-dom";

import sessionContext from "../MyContext";

import ListArticles from "./ListArticles";
import ViewArticle from "./ViewArticle";
import Error404 from "./Error404";

class Articles extends Component {

    render() {
        return (
            <sessionContext.Consumer>
                {
                    value => {
                        return (
                            <Fragment>
                                <Route exact path={`${this.props.match.url}/list-articles`} component={ListArticles}/>

                                <Route exact path={`${this.props.match.url}/view-article/:id`} component={ViewArticle}/>

                                <Route path='*' component={Error404}/>

                            </Fragment>
                        )
                    }
                }
            </sessionContext.Consumer>
        )
    }
}

export default Articles