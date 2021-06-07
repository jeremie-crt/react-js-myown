import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Component} from "react";

import {Button} from "react-bootstrap";
import Connexion from "./components/Connexion";
import HeaderNav from "./components/HeaderNav";
import ContentHtml from "./components/ContentHtml";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
        }

        this.saveNewUser = this.saveNewUser.bind(this)
    }

    saveNewUser(username, pw) {
        let user = {
            username: username,
            pw: pw,
            date: new Date().toLocaleDateString()
        }

        const users = { ...this.state.users }
        users[`user-${Date.now()}`] = user

        this.setState({ users })
        localStorage.setItem('listUsers', JSON.stringify(users))
    }

    render() {

        return (
            <div className='container'>

                <HeaderNav />
                <ContentHtml />

                <div className="row">
                    <h1 className='mt-2'>Hello</h1>
                    <p>Phosfluorescently extend impactful process improvements rather than open-source quality vectors. Efficiently syndicate stand-alone quality vectors for innovative solutions. Authoritatively morph virtual infrastructures before diverse testing.</p>
                </div>

                <Connexion
                    listUsers={this.state.users}
                    saveNewUser={this.saveNewUser}
                />

                <section className='mt-5'>
                    <div className="row">
                        <Button>CLICK ON IT</Button>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
