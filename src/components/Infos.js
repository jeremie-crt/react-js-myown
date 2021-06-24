import React, {useState} from 'react'


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

    return (
        <div className="container">
            <h1>My account - details</h1>

            <form onSubmit={handleOnSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name='username' value={user.username} id='username'
                           onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" className="form-control" name='firstname' value={user.firstname} id='firstname'
                           onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" className="form-control" name='lastname' value={user.lastname} id='lastname'
                           onChange={handleOnChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name='email' value={user.email} id='email'
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
                <button type="submit" className='btn btn-info'>EDIT</button>
            </form>
        </div>
    )
}

export default Infos