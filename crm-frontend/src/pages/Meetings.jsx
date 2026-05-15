import { useEffect, useState } from "react";
import axios from "axios";

import "../css/Meetings.css";

function Meetings() {

  const [meetings, setMeetings] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    meetingDate: "",
    meetingTime: "",
    emails: "",
    location: ""
  });

  useEffect(() => {

    fetchMeetings();

  }, []);

  const fetchMeetings = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8080/meetings"
        );

      setMeetings(response.data);

    } catch (error) {

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

  const saveMeeting = async (e) => {

    e.preventDefault();

      if(
    !formData.title ||
    !formData.meetingDate ||
    !formData.meetingTime ||
    !formData.emails ||
    !formData.location
  ) {

    alert("Please fill all fields");

    return;
  }

    try {

      if(formData.id) {

        await axios.put(

          `http://localhost:8080/meetings/${formData.id}`,

          formData
        );

      } else {

          const response = await axios.post(
  "http://localhost:8080/meetings",
  formData
);

setMeetings([
  ...meetings,
  response.data
]);

      }

      await fetchMeetings();

      setFormData({

        id: "",
        title: "",
        meetingDate: "",
        meetingTime: "",
        emails: "",
        location: ""
      });

    } catch(error) {

      console.log(error);
    }
  };

  const deleteMeeting = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/meetings/${id}`
      );

      await fetchMeetings();

    } catch (error) {

      console.log(error);
    }
  };

  const editMeeting = (meeting) => {

    setFormData({

      id: meeting.id,
      title: meeting.title,
      meetingDate: meeting.meetingDate,
      meetingTime: meeting.meetingTime,
      emails: meeting.emails,
      location: meeting.location
    });
  };

  const filteredMeetings =
    meetings.filter((meeting) =>

      meeting.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="meetings-page">

      <div className="meeting-header">

        <h1>Meetings</h1>

      </div>

      <div className="meeting-top">

        <div className="meeting-filter">

          <h3>Filter Meetings</h3>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="meeting-form">

          <form onSubmit={saveMeeting}>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />

            <input
              type="date"
              name="meetingDate"
              value={formData.meetingDate}
              onChange={handleChange}
            />

            <input
              type="time"
              name="meetingTime"
              value={formData.meetingTime}
              onChange={handleChange}
            />

            <input
              type="text"
              name="emails"
              placeholder="Enter Email"
              value={formData.emails}
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
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

      <div className="meeting-table-box">

        <table>

          <thead>

            <tr>

              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Emails</th>
              <th>Location</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {
              filteredMeetings.map((meeting) => (

                <tr key={meeting.id}>

                  <td>{meeting.title}</td>

                  <td>{meeting.meetingDate}</td>

                  <td>{meeting.meetingTime}</td>

                  <td>{meeting.emails}</td>

                  <td>{meeting.location}</td>

                  <td>

                    <button
                      onClick={() =>
                        editMeeting(meeting)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteMeeting(meeting.id)
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

export default Meetings;