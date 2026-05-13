import { useEffect, useState } from "react";
import axios from "axios";
// import '../css/Customer.css';

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: ""
    });

    useEffect(() => {

        fetchCustomers();

    }, [page]);

    const fetchCustomers = async () => {
    try {
        const response = await axios.get(
            `http://localhost:8080/customers/page?page=${page}&size=5`
        );

        setCustomers(response.data.content);

        setTotalPages(response.data.totalPages);

    } catch (error) {

        console.log(error);
    }
};

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


const addCustomer = async (e) => {

    e.preventDefault();
        if(
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.company
    ) {
        alert("All fields required");
        return;
    }

    try {

        if(editingId) {

            await axios.put(
                `http://localhost:8080/customers/${editingId}`,
                formData
            );


            setEditingId(null);

        } else {

            await axios.post(
                "http://localhost:8080/customers",
                formData
            );
        }

        fetchCustomers();

        setFormData({
            name: "",
            email: "",
            phone: "",
            company: ""
        });

    } catch (error) {

        console.log(error);

        alert("Operation Failed");
    }
};

    const deleteCustomer = async (id) => {

    try {

        await axios.delete(
            `http://localhost:8080/customers/${id}`
        );


        fetchCustomers();

    } catch (error) {

        console.log(error);

        alert("Delete Failed");
    }
};
    const editCustomer = (customer) => {

    setEditingId(customer.id);

    setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        company: customer.company
    });

};


    const searchCustomers = async () => {

    try {

        if(search.trim() === "") {

            fetchCustomers();

            return;
        }

        const response = await axios.get(
            `http://localhost:8080/customers/search?name=${search}`
        );

        setCustomers(response.data);
        setPage(0);
        setTotalPages(1);

    } catch (error) {

        console.log(error);
    }
};

return (

    <div className="customers-container">

        <h1>Customers</h1>

        <div className="search-box">

            <input
                type="text"
                placeholder="Search Customer"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <button onClick={searchCustomers}>
                Search
            </button>

        </div>

        <form
            className="customer-form"
            onSubmit={addCustomer}
        >

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
            />

            <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
            />

            <button type="submit">

                {
                    editingId
                    ? "Update Customer"
                    : "Add Customer"
                }

            </button>

        </form>
        <table className="customer-table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {
                    customers
                    .filter(customer => customer.name)
                    .map((customer) => (

                        <tr key={customer.id}>

                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.company}</td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        editCustomer(customer)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteCustomer(customer.id)
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

        <div className="pagination">

            <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>

            <span>
                Page {page + 1} of {totalPages}
            </span>

            <button
                disabled={page + 1 === totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>

        </div>

    </div>
);

}

export default Customers;