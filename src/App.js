import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {Component} from "react";

import {Button} from "react-bootstrap";
import Register from "./components/Register";
import HeaderNav from "./components/HeaderNav";
import ContentHtml from "./components/ContentHtml";
import Login from "./components/Login";
import {BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            session: {
                started: false,
                user: { id: '', username: ''}
            }
        }

        this.saveNewUser = this.saveNewUser.bind(this)
        this.logUser = this.logUser.bind(this)
        this.logOut = this.logOut.bind(this)
    }

    saveNewUser(username, pw) {
        let user = {
            username: username,
            pw: pw,
            date: new Date().toLocaleDateString()
        }

        const users = { ...this.state.users }
        let id = `user-${Date.now()}`
        users[id] = user

        this.setState({ users })
        localStorage.setItem('listUsers', JSON.stringify(users))
        this.logUser(id, users)
    }

    logUser(userId, list) {
        const session = { ...this.state.session }

        const user = list[userId]
        session.started = true
        session.user.id = userId
        session.user.username = user.username

        this.setState({ session })
    }

    logOut() {
        let session = { ...this.state.session }
        session.started = false
        session.user = { id: '', username: ''}

        this.setState({ session })
    }

    render() {

        const Articles = () => <p>Articles</p>
        const About = () => <p>About</p>
        const Account = () => <p>Account</p>

        const Logout = ({ logout, session }) => {
            if(session.started) {
                logout()
            }

            return <Redirect to='/' />
        }

        return (

            <BrowserRouter>

                <div className='container'>
                    <HeaderNav />

                    <ContentHtml />

                    <div className="row">
                        <h1 className='mt-2'>Hello</h1>
                        <p>Phosfluorescently extend impactful process improvements rather than open-source quality vectors. Efficiently syndicate stand-alone quality vectors for innovative solutions. Authoritatively morph virtual infrastructures before diverse testing.</p>
                    </div>

                    <Switch>
                        <Route path='/articles'>
                            <Articles />
                        </Route>
                        <Route path='/about'>
                            <About />
                        </Route>
                        <Route path='/myaccount'>
                            <Account />
                        </Route>
                        <Route path='/signin'>
                            <Login
                                listUsers={this.state.users}
                                saveNewUser={this.saveNewUser}
                                logUser={this.logUser}
                                session={this.state.session}
                            />
                        </Route>
                        <Route path='/signup'>
                            <Register
                                listUsers={this.state.users}
                                saveNewUser={this.saveNewUser}
                                session={this.state.session}
                            />
                        </Route>
                        <Route path='/signout'>
                            <Logout
                                logout={this.logOut}
                                session={this.state.session}
                            />
                        </Route>
                    </Switch>

                    <section className='mt-5'>
                        <div className="row">
                            <p>Collaboratively recaptiualize just in time total linkage via exceptional resources. Continually plagiarize extensible results rather than ethical channels. Rapidiously transition interactive infomediaries via leveraged functionalities. Proactively impact multimedia based metrics after covalent functionalities. Seamlessly transition front-end partnerships via resource maximizing ideas.

                                Monotonectally formulate collaborative leadership with inexpensive models. Progressively transform timely convergence whereas standards compliant convergence. Assertively build go forward testing procedures before flexible ideas. Phosfluorescently synthesize out-of-the-box applications without multimedia based benefits. Assertively monetize prospective results via customized collaboration and idea-sharing.

                                Efficiently re-engineer interdependent expertise through B2B functionalities. Dynamically morph leveraged growth strategies without equity invested manufactured products. Progressively mesh cross-unit niches rather than efficient communities. Quickly engineer multidisciplinary models after robust convergence. Objectively transition parallel partnerships after innovative meta-services.
</p>
                            <Button className='mb-5'>CLICK ON IT</Button>
                        </div>
                    </section>
                </div>

            </BrowserRouter>
        );
    }
}

export default App;
