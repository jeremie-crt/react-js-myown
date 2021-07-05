import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

//Bootstrap element
import {Button} from "react-bootstrap";

//Custom Components
import Register from "./components/Register";
import Login from "./components/Login";

//Custom Stateless Components
import Error404 from "./components/Error404";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import ContentHtml from "./components/ContentHtml";

import Articles from "./components/Articles";
import Account from "./components/Account";
import About from "./components/About";
import Logout from "./components/Logout";

//Imported Context
import sessionContext from "./MyContext";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //List of all users registered
            users: {},
            session: {
                started: false,
                user: {id: '', username: ''},
                userInfo: {
                    username: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    address: '',
                    zipcode: '',
                    birthdate: '',
                    mobile: '',
                    phone: '',
                    informations: '',
                }
            }
        }

        this.saveNewUser = this.saveNewUser.bind(this)
        this.saveUserInfo = this.saveUserInfo.bind(this)
        this.logInUser = this.logInUser.bind(this)
        this.logOut = this.logOut.bind(this)
    }

    saveNewUser(username, pw) {
        let user = {
            username: username,
            pw: pw,
            date: new Date().toLocaleDateString()
        }

        const users = {...this.state.users}
        let id = `user-${Date.now()}`
        users[id] = user

        this.setState({users})
        localStorage.setItem('listUsers', JSON.stringify(users))
        this.logInUser(id, users)
    }

    saveUserInfo(user) {
        const session = {...this.state.session}
        session.userInfo = user

        this.setState({session})
    }

    logInUser(userId, list) {
        const session = {...this.state.session}

        const user = list[userId]
        session.started = true
        session.user.id = userId
        session.user.username = user.username
        session.userInfo.username = user.username

        this.setState({session})
    }

    logOut() {
        let session = {...this.state.session}
        session.started = false
        session.user = {id: '', username: ''}

        this.setState({session})
    }

    useProvideSession = () => {
        let session = {...this.state.session}
        let state = session.started
        let user = session.user

        return {
            state,
            user
        }
    }

    render() {
        const SessionProvider = ({children}) => {
            let sessionAuth = this.useProvideSession()
            return (
                <sessionContext.Provider value={sessionAuth}>
                    {children}
                </sessionContext.Provider>
            )
        }
        return (

            <BrowserRouter>
                <SessionProvider>

                    <div className='container'>
                        <HeaderNav/>

                        <ContentHtml/>

                        <div className="row">
                            <h1 className='mt-2'>Slider Text</h1>
                            <p>Phosfluorescently extend impactful process improvements rather than open-source quality
                                vectors. Efficiently syndicate stand-alone quality vectors for innovative solutions.
                                Authoritatively morph virtual infrastructures before diverse testing.</p>
                        </div>

                        <Switch>
                            <Route path='/articles' component={Articles}/>
                            <Route path='/about'>
                                <About/>
                            </Route>

                            <Route path='/myaccount'
                                   render={(props) =>
                                       <Account {...props}
                                                saveUserInfo={this.saveUserInfo}
                                                userInfo={this.state.session.userInfo}
                                       />
                                   }
                            />

                            <Route path='/signin'>
                                <Login
                                    listUsers={this.state.users}
                                    saveNewUser={this.saveNewUser}
                                    logInUser={this.logInUser}
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
                                />
                            </Route>
                            <Route path='/'>
                                <section className='mt-5'>
                                    <div className="row">
                                        <h3>HomePage</h3>
                                        <p>Collaboratively recaptiualize just in time total linkage via exceptional
                                            resources.
                                            Continually plagiarize extensible results rather than ethical channels.
                                            Rapidiously
                                            transition interactive infomediaries via leveraged functionalities.
                                            Proactively
                                            impact
                                            multimedia based metrics after covalent functionalities. Seamlessly
                                            transition
                                            front-end
                                            partnerships via resource maximizing ideas.

                                            Monotonectally formulate collaborative leadership with inexpensive models.
                                            Progressively
                                            transform timely convergence whereas standards compliant convergence.
                                            Assertively
                                            build
                                            go forward testing procedures before flexible ideas. Phosfluorescently
                                            synthesize
                                            out-of-the-box applications without multimedia based benefits. Assertively
                                            monetize
                                            prospective results via customized collaboration and idea-sharing.

                                            Efficiently re-engineer interdependent expertise through B2B
                                            functionalities.
                                            Dynamically morph leveraged growth strategies without equity invested
                                            manufactured
                                            products. Progressively mesh cross-unit niches rather than efficient
                                            communities.
                                            Quickly engineer multidisciplinary models after robust convergence.
                                            Objectively
                                            transition parallel partnerships after innovative meta-services.
                                        </p>
                                        <Button className='mb-5'>CLICK ON IT</Button>
                                    </div>
                                </section>
                            </Route>

                            <Route component={Error404}/>
                        </Switch>

                        <Footer/>

                    </div>
                </SessionProvider>

            </BrowserRouter>
        );
    }
}

export default App;
