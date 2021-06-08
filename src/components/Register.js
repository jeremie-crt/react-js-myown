import './Connexion.css'

import React, {Component} from "react";
import {Redirect} from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pw: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    checkDataUsers({username}) {
        let list = this.props.listUsers
        let exist = {
            result: true,
            message: ''
        }

        for (let key in list) {
            if (list.hasOwnProperty(key)) {
                if (list[key].username === username) {
                    exist.result = false
                    exist.message = `This username "${username}" is already taken. Please provide another one.`

                    return exist
                }
            }
        }

        return exist
    }

    confirmSave({username, pw}) {
        this.props.saveNewUser(username, pw)

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
        }

        this.confirmSave(this.state)
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
                <h1>REGISTER</h1>
                <form onSubmit={this.handleSubmit} className="formConnect">
                    <div className="form-group">
                        <label htmlFor="username">Type Username</label>
                        <input type="text" className='form-control' value={this.state.username}
                               onChange={this.handleOnChange} name='username' id='username'/>
                        <span id='isCheckedUsername'></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pw">Type Password</label>
                        <input type="password" className='form-control' value={this.state.pw}
                               onChange={this.handleOnChange}
                               name='pw' id='pw'/>
                    </div>
                    <button type="submit" className='btn btn-info'>SAVE</button>
                </form>
            </div>
        )
    }
}

export default Register