
import React, { useEffect, useState, useCallback } from 'react';
import { fetchAllUsers, deleteUser } from '../../services/userService'
import ReactPaginate from 'react-paginate';
import './User.scss'
import { toast } from 'react-toastify';
import ModalDeleteUser from '../Modal/ModalDeleteUser';
import ModalUser from '../Modal/ModalUser';

const User = (props) => {
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState([])
    const [isShowModalUser, setIsShowModalUser] = useState(false)

    const fetchUsers = useCallback(async () => {
        let response = await fetchAllUsers(currentPage, currentLimit)

        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPage)
            setListUsers(response.data.DT.users);
        }
    }, [currentPage, currentLimit])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        await fetchUsers()
    };

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setShowModalDelete(true)

    }
    const handleClose = () => {
        setShowModalDelete(false)
        setDataModal([])
    }

    const onHideModalUser = () => {
        setIsShowModalUser(false)
    }


    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModal)
        if (response && +response.data.EC === 0) {
            toast.success(response.data.EM)
            await fetchUsers()
            setShowModalDelete(false)
        }
        else {
            toast.error(response.data.EM)
        }
    }

    return (
        <>

            <div className='container'>
                <div className='manage-user-container'>
                    <div className='user-header'>
                        <div className='title'>
                            <h3>Table Users</h3>
                        </div>
                        <div className='action'>
                            <button className='btn btn-primary'>Refresh</button>
                            <button className='btn btn-warning' onClick={() => setIsShowModalUser(true)}>Add New User</button>
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
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className='btn btn-warning'>Edit</button>
                                                        <button className='btn btn-danger ml-3 mx-3'
                                                            onClick={() => handleDeleteUser(item)}
                                                        >
                                                            Delete
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
                title={'Create new user'}
                onHide={onHideModalUser}
                show={isShowModalUser}
            />
        </>
    );
}

export default User;