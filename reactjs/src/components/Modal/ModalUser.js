import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect, useCallback } from 'react';
import './ModalUser.scss'
import { fetchGroup, createNewUser, fetchAllUsers } from '../../services/userService'
import { toast } from 'react-toastify';
import _ from 'lodash'


function ModalUser(props) {
    const { action, dataUserModal } = props

    const [userGroup, setUserGroup] = useState([])

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: '',
    }

    const validInputDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    }

    const [userData, setUserData] = useState(defaultUserData)
    const [validInput, setValidInput] = useState(validInputDefault)

    const getGroup = useCallback(async () => {
        let res = await fetchGroup()
        if (res && res.data && res.data.EC === 0) {
            setUserGroup(res.data.DT)
            if (res.data.DT && res.data.DT.length > 0) {
                let group = res.data.DT
                setUserData({ ...userData, group: group[0].id })
            }
        }
        else {
            toast.error(res.data.EM)
        }

    }, [])

    useEffect(() => {
        getGroup()
    }, [getGroup])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataUserModal, group: dataUserModal.Group ? dataUserModal.Group.id : '' })
        }
    }, [action, dataUserModal])



    const handleChangeInput = (value, name) => {
        // copy state
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData);
    }

    const handleCheckValidInput = () => {
        setValidInput(validInputDefault)
        let arr = ['email', 'phone', 'password', 'group']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInput = _.cloneDeep(validInputDefault)
                _validInput[arr[i]] = false
                setValidInput(_validInput)

                toast.error(`Emty input ${arr[i]}`)
                check = false;
                break
            }
        }
        return check
    }

    const handleConfirmUser = async () => {
        let check = handleCheckValidInput()
        if (check === true) {
            let res = await createNewUser({ ...userData, groupId: userData['group'] })
            if (res.data && res.data.EC === 0) {
                props.onHide()
                setUserData({ ...defaultUserData, group: userGroup[0].id })
            }
            if (res.data && res.data.EC !== 0) {
                toast.error(res.data.EM)
                let _validInput = _.cloneDeep(validInputDefault)
                _validInput[res.data.DT] = false
                setValidInput(_validInput)
            }
        }
    }

    const handleCloseModalUser = async () => {
        props.onHide()
        setUserData(defaultUserData)
        setValidInput(validInputDefault)
    }

    return (
        <>
            <Modal size="lg" show={props.show} className='modal-user' onHide={() => handleCloseModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{action === 'CREATE' ? 'Create new User' : 'Eidt User'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email address (<span className='red'>*</span>): </label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInput.email ? 'form-control' : 'form-control is-invalid'}
                                type='email'
                                value={userData.email}
                                onChange={(e) => handleChangeInput(e.target.value, 'email')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number (<span className='red'>*</span>): </label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInput.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.phone}
                                onChange={(e) => handleChangeInput(e.target.value, 'phone')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username: </label>
                            <input
                                className={validInput.username ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.username}
                                onChange={(e) => handleChangeInput(e.target.value, 'username')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'CREATE'
                                &&
                                <>
                                    <label>Password (<span className='red'>*</span>): </label>
                                    <input
                                        className={validInput.password ? 'form-control' : 'form-control is-invalid'}
                                        type='password'
                                        value={userData.password}
                                        onChange={(e) => handleChangeInput(e.target.value, 'password')}
                                    />
                                </>
                            }
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address: </label>
                            <input
                                className={validInput.address ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.address}
                                onChange={(e) => handleChangeInput(e.target.value, 'address')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gerder </label>
                            <select
                                className='form-select'
                                onChange={(e) => handleChangeInput(e.target.value, 'sex')}
                                value={userData.sex}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group (<span className='red'>*</span>): </label>
                            <select
                                className={validInput.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(e) => handleChangeInput(e.target.value, 'group')}
                                value={userData.group}
                            >
                                {userGroup.length > 0 &&
                                    userGroup.map((item, index) => {
                                        return (
                                            <option
                                                key={`group-${index}`}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }


                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>Close</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;