import { useEffect, useState } from "react";
import axios from "axios";

import "../css/Contacts.css";

function Contacts() {

  const [contacts, setContacts] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    city: ""
  });

  useEffect(() => {

    fetchContacts();

  }, []);

  const fetchContacts = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8080/contacts"
        );

      setContacts(response.data);

    } catch(error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  const saveContact = async (e) => {

    e.preventDefault();

    if(
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {

      alert("Fill required fields");

      return;
    }

    try {

      if(formData.id) {

        await axios.put(

          `http://localhost:8080/contacts/${formData.id}`,

          formData
        );

      } else {

        await axios.post(

          "http://localhost:8080/contacts",

          formData
        );
      }

      fetchContacts();

      setFormData({

        id: "",
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        city: ""
      });

    } catch(error) {

      console.log(error);
    }
  };

  const deleteContact = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/contacts/${id}`
      );

      fetchContacts();

    } catch(error) {

      console.log(error);
    }
  };

  const editContact = (contact) => {

    setFormData(contact);
  };

  const filteredContacts =
    contacts.filter((contact) =>

      contact.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="contacts-page">

      <h1>Contacts</h1>

      <div className="contact-top">

        <div className="contact-filter">

          <h3>Filter Contacts</h3>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="contact-form">

          <form onSubmit={saveContact}>

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

            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />

            <button type="submit">

              {
                formData.id
                ? "Update"
                : "Add"
              }

            </button>

          </form>

        </div>

      </div>

      <div className="contact-table-box">

        <table>

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Position</th>
              <th>City</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {
              filteredContacts.map((contact) => (

                <tr key={contact.id}>

                  <td>{contact.name}</td>

                  <td>{contact.email}</td>

                  <td>{contact.phone}</td>

                  <td>{contact.company}</td>

                  <td>{contact.position}</td>

                  <td>{contact.city}</td>

                  <td>

                    <button
                      onClick={() =>
                        editContact(contact)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteContact(contact.id)
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

    </div>
  );
}

export default Contacts;