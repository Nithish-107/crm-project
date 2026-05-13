import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import axios from "axios";

import "../css/DealDetails.css";

function DealDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [deal, setDeal] = useState(null);

    const [editMode, setEditMode] =
        useState(false);

    useEffect(() => {

        fetchDeal();

    }, []);

    const fetchDeal = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/deals/${id}`
                );

            setDeal(response.data);

        } catch(error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        setDeal({

            ...deal,

            [e.target.name]:
                e.target.value
        });
    };

    const updateDeal = async () => {

        try {

            await axios.put(
                `http://localhost:8080/deals/${id}`,
                deal
            );

            alert("Deal Updated");

            setEditMode(false);

        } catch(error) {

            console.log(error);
        }
    };

const closeDeal = async () => {

    const confirmDelete =
        window.confirm(
            "Are you sure you want to close this deal?"
        );

    if(!confirmDelete) {

        return;
    }

    try {

        await axios.delete(
            `http://localhost:8080/deals/${id}`
        );

        alert("Deal Closed Successfully");

        navigate("/deals");

    } catch(error) {

        console.log(error);
    }
};

    if(!deal) {

        return <h2>Loading...</h2>;
    }

    return (

        <div className="deal-details-page">

            <div className="details-top">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/deals")
                    }
                >
                    ← Back
                </button>

                <div>

                    <button
                        className="close-btn"
                        onClick={closeDeal}
                    >
                        Close Deal
                    </button>

                    <button
                        className="edit-btn"
                        onClick={() =>
                            setEditMode(!editMode)
                        }
                    >
                        {
                            editMode
                            ? "Cancel"
                            : "Edit"
                        }
                    </button>

                    {
                        editMode && (

                            <button
                                className="save-btn"
                                onClick={updateDeal}
                            >
                                Save
                            </button>
                        )
                    }

                </div>

            </div>

            <div className="details-card">

                {
                    editMode ? (

                        <input
                            className="deal-title-input"
                            type="text"
                            name="dealName"
                            value={deal.dealName}
                            onChange={handleChange}
                        />

                    ) : (

                        <h1>{deal.dealName}</h1>
                    )
                }

                <div className="details-grid">

                    <div>

                        <label>
                            Account Name
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="text"
                                    name="accountName"
                                    value={deal.accountName}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {deal.accountName}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Deal Owner
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="text"
                                    name="dealOwner"
                                    value={deal.dealOwner}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {deal.dealOwner}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Amount
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="number"
                                    name="amount"
                                    value={deal.amount}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    ₹ {deal.amount}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Stage
                        </label>

                        {
                            editMode ? (

                                <select
                                    name="stage"
                                    value={deal.stage}
                                    onChange={handleChange}
                                >

                                    <option>
                                        Qualification
                                    </option>

                                    <option>
                                        Proposal
                                    </option>

                                    <option>
                                        Negotiation
                                    </option>

                                    <option>
                                        Won
                                    </option>

                                </select>

                            ) : (

                                <p>
                                    {deal.stage}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Type
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="text"
                                    name="type"
                                    value={deal.type}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {deal.type}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Probability
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="number"
                                    name="probability"
                                    value={deal.probability}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {deal.probability}%
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Next Step
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="text"
                                    name="nextStep"
                                    value={deal.nextStep}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {deal.nextStep}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Expected Revenue
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="number"
                                    name="expectedRevenue"
                                    value={deal.expectedRevenue}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    ₹ {deal.expectedRevenue}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Lead Source
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="text"
                                    name="leadSource"
                                    value={deal.leadSource}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {deal.leadSource}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Campaign Source
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="text"
                                    name="campaignSource"
                                    value={deal.campaignSource}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {deal.campaignSource}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Contact Name
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="text"
                                    name="contactName"
                                    value={deal.contactName}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {deal.contactName}
                                </p>
                            )
                        }

                    </div>

                    <div>

                        <label>
                            Closing Date
                        </label>

                        {
                            editMode ? (

                                <input
                                    type="date"
                                    name="closingDate"
                                    value={deal.closingDate}
                                    onChange={handleChange}
                                />

                            ) : (

                                <p>
                                    {deal.closingDate}
                                </p>
                            )
                        }

                    </div>

                </div>

                <div className="description-section">

                    <label>
                        Description
                    </label>

                    {
                        editMode ? (

                            <textarea
                                name="description"
                                value={deal.description}
                                onChange={handleChange}
                            />

                        ) : (

                            <p>
                                {deal.description}
                            </p>
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default DealDetails;