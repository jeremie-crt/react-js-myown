import React, {useState} from 'react'

import './Infos.css'

const Infos = (props) => {

    const [user, setUser] = useState(props.userInfo)

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})

    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        props.saveUserInfo(user)
    }

    checkInputs()

    return (
        <div className="container">
            <h1>My account - details</h1>
            <form onSubmit={handleOnSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name='username' value={user.username} id='username'
                           autoFocus={true}
                           onChange={handleOnChange}/>
                    <p className="error-span"> </p>
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" className="form-control" name='firstname' value={user.firstname} id='firstname'
                           onChange={handleOnChange}/>
                    <p className="error-span"> </p>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" className="form-control" name='lastname' value={user.lastname} id='lastname'
                           onChange={handleOnChange}/>
                    <p className="error-span"> </p>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name='email' value={user.email} id='email'
                           onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" name='address' value={user.address} id='address'
                           onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input type="text" className="form-control" name='zipcode' value={user.zipcode} id='zipcode'
                           onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="birthdate">Birthdate</label>
                    <input type="text" className="form-control" name='birthdate' value={user.birthdate} id='birthdate'
                           onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" className="form-control" name='mobile' value={user.mobile} id='mobile'
                           onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" name='phone' value={user.phone} id='phone'
                           onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="informations">Informations</label>
                    <textarea className="form-control" name="informations" id="informations"
                              placeholder="Some infos about you..." rows='5'
                              value={user.informations}
                              onChange={handleOnChange}
                    > </textarea>
                </div>

                <button type="submit" className='btn btn-info'>EDIT</button>
            </form>
        </div>
    )
}

function checkInputs() {
    document.querySelectorAll('input')
        .forEach(item => {
            item.addEventListener('blur', event => {
                let input = event.target
                let inputValue = input.value
                let lengthValue = inputValue.length
                let inputName = input.name

                if (lengthValue > 0) {
                    switch (inputName) {
                        case 'username':
                        case 'firstname':
                        case 'lastname':
                            if (lengthValue < 3) {
                                responseReturn(input, 'error', 'The length is at least 3 characters.')
                            } else if (lengthValue > 15) {

                                responseReturn(input, 'error', 'The length cannot be more than 15 characters.')
                            } else {
                                responseReturn(input, 'success', 'Good')
                            }
                            break;
                        default:
                    }
                }
            })
        })
}

function responseReturn(input, type, message) {
    let response
    if (type === 'success') {
        input.classList.remove("error-input")
        input.classList.add("success-input")
        response = `<span class='success'>${message}<i></i></span>`

    } else if (type === 'error') {
        input.classList.remove("success-input")
        input.classList.add("error-input")
        response = `<span class='error'>${message}<i></i></span>`
    }

    input.nextElementSibling.innerHTML = response
}

export default Infos