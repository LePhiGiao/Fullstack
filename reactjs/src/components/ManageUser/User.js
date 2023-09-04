
import React, { useEffect, useState, useCallback } from 'react';
import { fetchAllUsers, deleteUser } from '../../services/userService'
import ReactPaginate from 'react-paginate';
import './User.scss'
import { toast } from 'react-toastify';
import ModalDeleteUser from '../Modal/ModalDeleteUser';
import ModalUser from '../Modal/ModalUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const User = (props) => {
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)

    //Delete User
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState([])

    //Create + Update User
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState('CREATE')
    const [dataUserModal, setDataUserModal] = useState([])

    //get Use on one page
    const fetchUsers = useCallback(async () => {
        let response = await fetchAllUsers(currentPage, currentLimit)

        if (response && response.EC === 0) {
            setTotalPages(response.DT.totalPage)
            setListUsers(response.DT.users);
        }
    }, [currentPage, currentLimit])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    //handle Pagination
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        await fetchUsers()
    };

    //handle Click Delete
    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setShowModalDelete(true)
    }
    //handle Show & Hide Modal Delete
    const handleClose = () => {
        setShowModalDelete(false)
        setDataModal([])
    }
    //Handle Click Confirm delete
    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal)
        if (response && +response.EC === 0) {
            toast.success(response.EM)
            await fetchUsers()
            setShowModalDelete(false)
        }
        else {
            toast.error(response.EM)
        }
    }
    //EDIT and CREATE

    //handle click EDIT
    const handleEditUser = (user) => {
        setActionModalUser('UPDATE')
        setDataUserModal(user)
        setIsShowModalUser(true)
    }

    //handle Show & Hide Modal User
    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataUserModal([])
        await fetchUsers()
    }

    const handleRefesh = async () => {
        await fetchUsers()
    }

    return (
        <>

            <div className='container'>
                <div className='manage-user-container'>
                    <div className='user-header'>
                        <div className='title mt-3'>
                            <h3>Manage Users</h3>
                        </div>
                        <div className='action my-3'>
                            <button className='btn btn-primary refesh' onClick={() => handleRefesh()}>
                                <span>
                                    <FontAwesomeIcon icon={faArrowsRotate} spinPulse />
                                </span>
                                Refresh
                            </button>
                            <button
                                className='btn btn-success'
                                onClick={() => {
                                    setIsShowModalUser(true)
                                    setActionModalUser('CREATE')
                                }}
                            >
                                <span className='add'>
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </span>
                                Add New User
                            </button>
                        </div>
                    </div>
                    <div className='user-body'>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0
                                    ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row ${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className='btn btn-warning edit'
                                                            title='Edit'
                                                            onClick={() => handleEditUser(item)}
                                                        >
                                                            <span>
                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                            </span>
                                                        </button>
                                                        <button className='btn btn-danger ml-3 mx-3 delete'
                                                            title='Delete'
                                                            onClick={() => handleDeleteUser(item)}
                                                        >
                                                            <span>
                                                                <FontAwesomeIcon icon={faTrashCan} />
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td><span>Not found User</span></td>
                                        </tr>
                                    </>
                                }


                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>

            <ModalDeleteUser
                show={showModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />

            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataUserModal={dataUserModal}
            />
        </>
    );
}

export default User;