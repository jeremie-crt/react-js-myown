import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

//Custom Components
import Register from "./components/Register";
import Login from "./components/Login";

//Custom Stateless Components
import Error404 from "./components/Error404";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import ContentHtml from "./components/ContentHtml";

import Homepage from "./components/Homepage";
import Articles from "./components/Articles";
import Account from "./components/Account";
import About from "./components/About";

import Logout from "./components/Logout";
//Imported Context
import sessionContext from "./MyContext";

// Import the functions you need from the SDKs you need
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import Rebase from 're-base'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9fu46SG451ANUMpz_ALAdiirPbzviCSc",
    authDomain: "react-myown-3b8c5.firebaseapp.com",
    databaseURL: "https://react-myown-3b8c5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-myown-3b8c5",
    storageBucket: "react-myown-3b8c5.appspot.com",
    messagingSenderId: "424848653557",
    appId: "1:424848653557:web:c7c611540a19319ceed9bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
//const reBase = Rebase.createClass(database)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //List of all users registered
            users: {},
            usersInfos: {},
            session: {
                started: false,
                user: {id: '', username: ''},
                userInfo: {
                    id: '',
                    username: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    address: '',
                    zipcode: '',
                    birthdate: {day: '', month: '', year: ''},
                    mobile: '',
                    phone: {
                        number: '',
                        rawNumber: '',
                        country: '',
                        dialCode: '',
                        iso2: ''
                    },
                    informations: '',
                }
            },
            listArticles: {}
        }

        this.saveNewUser = this.saveNewUser.bind(this)
        this.saveUserInfo = this.saveUserInfo.bind(this)
        this.logInUser = this.logInUser.bind(this)
        this.logOut = this.logOut.bind(this)
        this.addNewArticle = this.addNewArticle.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMountcomponentDidMountcomponentDidMount');
        /*reBase.syncState('users', {
            context: this,
            asArray: true,
            state: 'users',
        })*/
        // let urlInDb = ['users', 'usersInfos', 'list-articles']
        // const usersData = ref(database, 'users');
        // const usersInfosData = ref(database, 'usersInfos');
        // const listArticlesData = ref(database, 'list-articles');
        //
        // onValue(usersData, (snapshot) => {
        //     const users = snapshot.val();
        //     console.log(users);
        //     this.setState( {users})
        // });
        // onValue(usersInfosData, (snapshot) => {
        //     const usersInfos = snapshot.val();
        //     console.log(usersInfos);
        //     this.setState( {usersInfos})
        // });
        // onValue(listArticlesData, (snapshot) => {
        //     const listArticles = snapshot.val();
        //     console.log(listArticles);
        //     this.setState( {listArticles})
        // });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdatecomponentDidUpdatecomponentDidUpdate');

        let users = this.state.users
        let listArticles = this.state.listArticles
        let usersInfos = this.state.usersInfos

        const updates = {};
        updates['/users/'] = users;
        updates['/users-infos/'] = usersInfos;
        updates['/list-articles/'] = listArticles;

        return update(ref(database), updates);
    }

    addNewArticle(data) {
        //add new user to all list users
        const listArticles = { ...this.state.listArticles }
        let id = `article-${data.date}`
        listArticles[id] = data

        this.setState({ listArticles })
    }

    saveNewUser(username, pw) {
        let user = {
            username: username,
            pw: pw,
            date: new Date().toLocaleDateString()
        }
        //add new user to all list users
        const users = {...this.state.users}
        let id = `user-${Date.now()}`
        users[id] = user
        this.setState({users})

        //add new user id to his info
        const session = {...this.state.session}
        session.userInfo.id = id
        this.setState({session})

        this.logInUser(id, users)
    }

    //Save user info into the session
    //and add it to list of usersInfos
    saveUserInfo(user) {
        const session = {...this.state.session}
        session.userInfo = user
        this.setState({session})

        let id = session.user.id
        const usersInfos = {...this.state.usersInfos}
        usersInfos[id] = user

        this.setState({usersInfos})
    }

    logInUser(userId, list) {
        const session = {...this.state.session}
        //Sets in session some infos
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

    //Dispatch session info through context
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

                        <Switch>
                            <Route path='/articles' render={(props) =>
                                <Articles
                                    {...props}
                                    listArticles={this.state.listArticles}
                                />
                            }/>

                            <Route path='/about' component={About}/>

                            <Route path='/myaccount'
                                   render={(props) =>
                                       <Account {...props}
                                                saveUserInfo={this.saveUserInfo}
                                                userInfo={this.state.session.userInfo}
                                                addNewArticle={this.addNewArticle}
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
                            <Route path='/' component={Homepage}/>

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
