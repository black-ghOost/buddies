/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import UserList from './UserList';

export default function User() {
    const [loading, setLoading] = useState(false);

    // fetch request for get user info and set them in user variable
    const [user, setUser] = useState([]);
    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setLoading(false);
            });
    }, []);

    // apply pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage, setUserPerPage] = useState(3);

    // Get current user
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUser = user.slice(indexOfFirstUser, indexOfLastUser);

    // change page
    const paginate = (pagenumber) => {
        setCurrentPage(pagenumber);
    };

    const [q, setQ] = useState('');
    const search = (rows) =>
        rows.filter(
            (rows) =>
                rows.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                rows.email.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                rows.website.toLowerCase().indexOf(q.toLowerCase()) > -1
        );
    const handleUserPerPafe = (value) => {
        setUserPerPage(value);
    };

    return (
        <>
            {loading ? (
                <h2>loading....</h2>
            ) : (
                <div>
                    {/* search input field */}
                    <div className="d-flex flex-row justify-content-center">
                        <input
                            className="mt-5 px-4 py-2 bg-light"
                            placeholder="search..."
                            type="text"
                            onChange={(e) => setQ(e.target.value)}
                            value={q}
                        />
                    </div>

                    <UserList user={search(currentUser)} />

                    <div className="d-flex justify-content-center">
                        {userPerPage < 10 && (
                            <Pagination
                                userPerPage={userPerPage}
                                totalUser={user.length}
                                paginate={paginate}
                            />
                        )}
                        <form className=" py-2 mb-5 ">
                            <label htmlFor="userPerPage">User Per Page:</label>
                            <select
                                id="userPerPage"
                                onChange={(event) => handleUserPerPafe(event.target.value)}
                            >
                                <option selected>3</option>
                                <option>5</option>
                                <option>10</option>
                            </select>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
