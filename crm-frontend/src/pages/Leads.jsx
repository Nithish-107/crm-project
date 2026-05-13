import { useEffect, useState } from "react";
import axios from "axios";

function Leads() {
  const [leads, setLeads] = useState([]);

  const [users, setUsers] = useState([]);

  const role = localStorage.getItem("role");

  const userName = localStorage.getItem("userName");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "New",
    assignedTo: "",
  });

  useEffect(() => {
    fetchLeads();

    fetchUsers();
  }, []);

 
  const fetchLeads = async () => {
    try {
      const response = await axios.get("http://localhost:8080/leads");

      if (role === "ADMIN") {
        setLeads(response.data);
      } else {
  
        const filteredLeads = response.data.filter(
          (lead) => lead.assignedTo === userName,
        );

        setLeads(filteredLeads);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };


  const addLead = async (e) => {

    e.preventDefault();

    if(
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.source ||
        !formData.assignedTo
    ) {

        alert("Please fill all fields");

        return;
    }

    try {

        await axios.post(
            "http://localhost:8080/leads",
            formData
        );


        fetchLeads();

        setFormData({
            name: "",
            email: "",
            phone: "",
            source: "",
            status: "New",
            assignedTo: ""
        });

    } catch (error) {

        console.log(error);
    }
};

  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/leads/${id}`);

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/leads/${id}/status?status=${status}`,
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const convertLead = async (id) => {
    try {
      await axios.post(`http://localhost:8080/leads/${id}/convert`);

      alert("Lead Converted");

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{role === "ADMIN" ? "Leads" : "My Leads"}</h1>


      {role === "ADMIN" && (
        <form onSubmit={addLead}>
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
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
          />


          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
          >
            <option value="">Assign User</option>

            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          <button type="submit">Add Lead</button>
        </form>
      )}

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Status</th>
            <th>Assigned To</th>

            {role === "ADMIN" && (
              <>
                <th>Convert</th>
                <th>Actions</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>

              <td>{lead.email}</td>

              <td>{lead.phone}</td>

              <td>{lead.source}</td>

              <td>
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                >
                  <option value="New">New</option>

                  <option value="Contacted">Contacted</option>

                  <option value="Qualified">Qualified</option>

                  <option value="Converted">Converted</option>

                  <option value="Lost">Lost</option>
                </select>
              </td>

              <td>{lead.assignedTo}</td>

              {role === "ADMIN" && (
                <td>
                  <button onClick={() => convertLead(lead.id)}>Convert</button>
                </td>
              )}

              {role === "ADMIN" && (
                <td>
                  <button onClick={() => deleteLead(lead.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;
