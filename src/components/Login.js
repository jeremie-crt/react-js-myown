import React, {Component} from "react";
import './Connexion.css'
import {Redirect} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pw: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    checkDataUsers({username, pwd}) {
        let list = this.props.listUsers
        let exist = {
            result: false,
            message: 'Login has failed. An error with the credentials provided.'
        }

        for (let key in list) {
            if (list.hasOwnProperty(key)) {
                if (list[key].username === username && list[key].pwd === pwd) {
                    exist.result = true
                    exist.message = 'Success credentials'
                    exist.user = key
                    return exist
                }
            }
        }
        return exist
    }

    connection(userId) {
        this.props.logInUser(userId)

        this.setState({
            username: '',
            pw: ''
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let isChecked = this.checkDataUsers(this.state)
        if (!isChecked.result) {
            document.body.querySelector('#isCheckedUsername').innerHTML = isChecked.message
            return

        } else {
            this.connection(isChecked.user)
        }
    }

    handleOnChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    render() {
        if (this.props.session.started) {
            return <Redirect to='/'/>
        }

        return (
            <div className="container">
                <h1>LOGIN</h1>
                <form onSubmit={this.handleSubmit} className="formConnect">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className='form-control' value={this.state.username}
                               onChange={this.handleOnChange} name='username' id='username'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pw">Password</label>
                        <input type="password" className='form-control' value={this.state.pw}
                               onChange={this.handleOnChange}
                               name='pw' id='pw'/>
                    </div>
                    <div className="form-group">
                        <span id='isCheckedUsername'></span>
                    </div>
                    <button type="submit" className='btn btn-info'>SAVE</button>
                </form>
            </div>

        )
    }
}

export default Login