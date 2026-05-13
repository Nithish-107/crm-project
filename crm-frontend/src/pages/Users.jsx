import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

    const [users, setUsers]
        = useState([]);

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/users"
                );

            setUsers(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const deleteUser = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8080/users/${id}`
            );

            alert("User Deleted");

            fetchUsers();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <h1>Manage Users</h1>

            <table
                border="1"
                cellPadding="10"
            >

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            deleteUser(user.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default Users;