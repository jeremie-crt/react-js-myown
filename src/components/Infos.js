import React, {useEffect, useState} from 'react'
import IntTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

import './Infos.css'

const Infos = (props) => {

    const [user, setUser] = useState(props.userInfo)

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

   const handleOnChangeBirthdate = (e) => {
        const {name, value} = e.target

        let copyUser = { ...user }
        let birthdate = copyUser.birthdate

        if(name === 'b_day') {
            birthdate.day = value
        } else if(name === 'b_month') {
            birthdate.month = value
        } else if(name === 'b_year') {
            birthdate.year = value
        }

       setUser( {...user, birthdate })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.saveUserInfo(user)
    }

    const [ geoIpData, setGeoIpData ] = useState(null)
    useEffect(() => {
        fetch('https://ipinfo.io/json?token=1d7d7f5b497ca5', {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                    console.log('result');
                    console.log(result);
                    setGeoIpData(result.country)
                }
            )
            .catch(error => {
                console.log('IN CATCH ERROR');
                console.log(error);
            })
    }, [])
    
    checkInputs()

    console.log('geoIpData');
    console.log(geoIpData);
    return (
        <div className="container">
            <h1>My account - details</h1>
            <form onSubmit={handleOnSubmit} className="form" id="detail-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name='username' value={user.username} id='username'
                           autoFocus={true}
                           onChange={handleOnChange}/>
                    <p className="error-span"/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" className="form-control" name='firstname' value={user.firstname} id='firstname'
                           onChange={handleOnChange}/>
                    <p className="error-span"/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" className="form-control" name='lastname' value={user.lastname} id='lastname'
                           onChange={handleOnChange}/>
                    <p className="error-span"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name='email' value={user.email} id='email'
                           onChange={handleOnChange}/>
                    <p className="error-span"/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" name='address' value={user.address} id='address'
                           onChange={handleOnChange}/>
                    <p className="error-span"/>
                </div>
                <div className="form-group">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input type="text" className="form-control" name='zipcode' value={user.zipcode} id='zipcode'
                           onChange={handleOnChange}/>
                    <p className="error-span"/>
                </div>
                <div className="form-group">
                    <label htmlFor="birthdate">Birthdate</label>
                    <ul className="list-inline birthdate-fields">
                        <li className="list-inline-item">
                            <label htmlFor="b_day">day</label>
                            <input type="text" className="form-control bday-inputs" name='b_day' id='b_day' placeholder="day" maxLength="2"
                                   value={user.birthdate.day}
                                   onChange={handleOnChangeBirthdate}
                            />
                            <p className="error-span"/>
                        </li>
                        <li className="list-inline-item">
                            <label htmlFor="b_month">month</label>
                            <input type="text" className="form-control bday-inputs" name='b_month' id='b_month' placeholder="month" maxLength="2"
                                   value={user.birthdate.month}
                                   onChange={handleOnChangeBirthdate}

                            />
                            <p className="error-span"/>
                        </li>
                        <li className="list-inline-item">
                            <label htmlFor="b_year">year</label>
                            <input type="text" className="form-control bday-inputs" name='b_year' id='b_year' placeholder="year" maxLength="4"
                                   value={user.birthdate.year}
                                   onChange={handleOnChangeBirthdate}

                            />
                            <p className="error-span"/>
                        </li>
                    </ul>
                    <p className="error-span"/>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" className="form-control" name='mobile' value={user.mobile ?? "+33"} id='mobile'
                           placeholder="+33601020304"
                           onChange={handleOnChange}/>
                    <p className="error-span"/>

                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <IntTelInput
                        containerClassName="intl-tel-input"
                        initialCountry="auto"
                        defaultCountry="auto"
                        geoIpLookup={geoIpData}
                        //defaultCountry={'fr'}
                        inputClassName="form-control" fieldName='phone' defaultValue={user.phone} fieldId='phone'
                        onChange={handleOnChange}
                    />
                    <p className="error-span"/>

                </div>
                <div className="form-group">
                    <label htmlFor="informations">Informations</label>
                    <textarea className="form-control" name="informations" id="informations"
                              placeholder="Some infos about you..." rows='5'
                              value={user.informations}
                              onChange={handleOnChange}
                    > </textarea>
                    <p className="error-span"/>
                </div>

                <button type="submit" className='btn btn-info'>EDIT</button>
            </form>
        </div>
    )
}
const phoneInputField = document.querySelector('#phone')

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
                            if (lengthValue < 3) {
                                responseReturn(input, 'error', 'The length is at least 3 characters.')
                            } else if (lengthValue > 15) {
                                responseReturn(input, 'error', 'The length cannot be more than 15 characters.')
                            } else {
                                let regex = /^[a-zA-Z0-9-_éèàùûôîï]{3,15}$/
                                if (!regex.test(inputValue)) {
                                    return responseReturn(input, 'error', 'The pattern must be with characters, integers, underscores and hyphens only.')
                                }
                                responseReturn(input, 'success', 'Good')
                            }
                            break;

                        case 'firstname':
                        case 'lastname':
                            if (lengthValue < 3) {
                                responseReturn(input, 'error', 'The length is at least 3 characters.')
                            } else if (lengthValue > 15) {
                                responseReturn(input, 'error', 'The length cannot be more than 15 characters.')
                            } else {
                                let regex = /^[a-zA-Zéè]{3,15}$/
                                if (!regex.test(inputValue)) {
                                    return responseReturn(input, 'error', 'The pattern must be with characters, integers, underscores and hyphens only.')
                                }
                                responseReturn(input, 'success', 'Good')
                            }
                            break;

                        case 'email':
                            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                            if (!regex.test(inputValue)) {
                                return responseReturn(input, 'error', 'The pattern must be of email type as: "email@support.com".')

                            }

                            responseReturn(input, 'success', 'Good')
                            break;

                        case 'address':
                            if (lengthValue < 3) {
                                responseReturn(input, 'error', 'The length is at least x characters.')
                            } else {
                                let regex = /^[a-zA-Z0-9-_éèàùûôîï]{3,}$/
                                if (!regex.test(inputValue)) {
                                    return responseReturn(input, 'error', 'The pattern must be with characters, integers, underscores and hyphens only.')
                                }
                                responseReturn(input, 'success', 'Good')
                            }
                            break;

                        case 'zipcode':
                            if (lengthValue < 3) {
                                responseReturn(input, 'error', 'The length is at least x characters.')
                            } else {
                                let regex = /^[\d]{3,}$/
                                if (!regex.test(inputValue)) {
                                    return responseReturn(input, 'error', 'The pattern must be with integers only.')
                                }
                                responseReturn(input, 'success', 'Good')
                            }
                            break;

                        case 'b_day':
                            if (lengthValue < 1) {
                                responseReturn(input, 'error', 'The length is at least 1 characters. (ex: 12)')
                            } else if (parseInt(inputValue) < 1) {
                                responseReturn(input, 'error', 'The min day is 1. (ex: 3)')
                            } else if (parseInt(inputValue) > 31) {
                                responseReturn(input, 'error', 'The max day is 31. (ex: 12)')
                            } else {
                                let regex = /^[\d]{1,2}$/
                                if (!regex.test(inputValue)) {
                                    return responseReturn(input, 'error', 'The pattern must be with integers only.')
                                }

                                responseReturn(input, 'success', 'Good')
                            }
                            break;

                        case 'b_month':
                            if (lengthValue < 1) {
                                responseReturn(input, 'error', 'The length is at least 1 characters. (ex: 12)')
                            } else if (parseInt(inputValue) < 1) {
                                responseReturn(input, 'error', 'The min month is 1. (ex: 4)')
                            } else if (parseInt(inputValue) > 12) {
                                responseReturn(input, 'error', 'The max month is 31. (ex: 5)')
                            } else {
                                let regex = /^[\d]{1,2}$/
                                if (!regex.test(inputValue)) {
                                    return responseReturn(input, 'error', 'The pattern must be with integers only.')
                                }

                                responseReturn(input, 'success', 'Good')
                            }
                            break;

                        case 'b_year':
                            let currentYear = new Date()
                            if (lengthValue < 4) {
                                responseReturn(input, 'error', 'The length is at least 4 characters. (ex: 1998)')
                            } else if (parseInt(inputValue) > currentYear.getFullYear()) {
                                responseReturn(input, 'error', 'The year cannot be above the current year "' + currentYear.getFullYear() + '".')
                            } else {
                                let regex = /^[\d]{4}$/
                                if (!regex.test(inputValue)) {
                                    return responseReturn(input, 'error', 'The pattern must be with integers only and 4 characters long.')
                                }
                                responseReturn(input, 'success', 'Good')
                            }
                            break;

                        case 'mobile':
                            if (lengthValue < 9 || lengthValue > 12) {
                                responseReturn(input, 'error', 'The length is min 9 and max 10.')
                            } else {
                                let regex = /(\+?)(33?)([\d]{9,10})/
                                if (!regex.test(inputValue)) {
                                    return responseReturn(input, 'error', 'The pattern is: "+33123456789"')
                                }
                                responseReturn(input, 'success', 'Good')

                            }
                            break;

                        case 'phone':
                       /*     if (lengthValue < 9 || lengthValue > 12) {
                                responseReturn(input, 'error', 'The length is min 9 and max 10.')
                            } else {
                                regex= /(\+?)(33?)([\d]{9,10})/
                                if (!regex.test(inputValue)) {
                                  return responseReturn(input, 'error', 'The pattern is: "+33123456789"')
                                }

                                    if (phoneInputField !== 'undefined' && !phoneInputField.isValidNumber()) {
                                        return responseReturn(input, 'error', 'The pattern is not valid must be as: "+33123456789"')
                                    }
                                responseReturn(input, 'success', 'Good')

                            }*/
                            break;
                        default:
                    }
                }
            })
        })

    document.querySelectorAll('textarea')
        .forEach(item => {
            item.addEventListener('blur', event => {
                let element = event.target
                let elementValue = element.value
                let lengthValue = elementValue.length
                let elementName = element.name

                if (lengthValue > 0) {
                    switch (elementName) {
                        case 'informations':
                            if (lengthValue < 10) {
                                responseReturn(element, 'error', 'The length is at least 10 characters.')
                            } else if (lengthValue > 200) {

                                responseReturn(element, 'error', 'The length cannot be more than 200 characters.')
                            } else {
                                responseReturn(element, 'success', 'Good')
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

    let parentElmt = input.closest('.form-group')
    parentElmt.querySelector('.error-span').innerHTML = response
}

function getIp(callback) {
    console.log('9999');
    fetch('https://ipinfo.io/json?token=1d7d7f5b497ca5', {headers: {'Accept': 'application/json'}})
        .then((resp) => resp.json())
        .catch(() => {
            return {
                country: 'us',
            };
        })
        .then((resp) => callback(resp.country));
}

export default Infos