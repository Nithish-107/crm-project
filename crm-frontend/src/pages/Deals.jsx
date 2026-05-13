import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../css/Deals.css";

function Deals() {

    const navigate = useNavigate();

    const [deals, setDeals] = useState([]);

    const [showForm, setShowForm] =
        useState(false);

    const [formData, setFormData] =
        useState({

            dealOwner: "admin",

            dealName: "",

            accountName: "",

            amount: "",

            closingDate: "",

            stage: "Qualification",

            type: "",

            probability: "",

            nextStep: "",

            expectedRevenue: "",

            leadSource: "",

            campaignSource: "",

            contactName: "",

            description: ""
        });

    useEffect(() => {

        fetchDeals();

    }, []);

    const fetchDeals = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/deals"
                );

            setDeals(response.data);

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

    const saveDeal = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/deals",
                formData
            );

            fetchDeals();

            setShowForm(false);

            setFormData({

                dealOwner: "admin",

                dealName: "",

                accountName: "",

                amount: "",

                closingDate: "",

                stage: "Qualification",

                type: "",

                probability: "",

                nextStep: "",

                expectedRevenue: "",

                leadSource: "",

                campaignSource: "",

                contactName: "",

                description: ""
            });

        } catch(error) {

            console.log(error);
        }
    };

    const qualificationDeals =
        deals.filter(
            deal =>
                deal.stage ===
                "Qualification"
        );

    const proposalDeals =
        deals.filter(
            deal =>
                deal.stage ===
                "Proposal"
        );

    const negotiationDeals =
        deals.filter(
            deal =>
                deal.stage ===
                "Negotiation"
        );

    const wonDeals =
        deals.filter(
            deal =>
                deal.stage ===
                "Won"
        );

    const renderDeals = (dealList) => (

        dealList.map((deal) => (

            <div
                className="deal-card"
                key={deal.id}
                onClick={() =>
                    navigate(
                        `/deals/${deal.id}`
                    )
                }
            >

                <h4>{deal.dealName}</h4>

                <p>
                    <strong>
                        Account:
                    </strong>

                    {deal.accountName}
                </p>

                <p>
                    <strong>
                        Owner:
                    </strong>

                    {deal.dealOwner}
                </p>

                <p>
                    <strong>
                        Amount:
                    </strong>

                    ₹ {deal.amount}
                </p>

                <p>
                    <strong>
                        Type:
                    </strong>

                    {deal.type}
                </p>

                <p>
                    <strong>
                        Next Step:
                    </strong>

                    {deal.nextStep}
                </p>

                <p>
                    <strong>
                        Contact:
                    </strong>

                    {deal.contactName}
                </p>

                <small>
                    {deal.closingDate}
                </small>

            </div>
        ))
    );

    return (

        <div className="deals-page">

            <div className="deals-header">

                <h1>Deals</h1>

                {
                    !showForm && (

                        <button
                            className="create-btn"
                            onClick={() =>
                                setShowForm(true)
                            }
                        >
                            Create Deal
                        </button>
                    )
                }

            </div>

            {
                showForm ? (

                    <form
                        className="deal-form"
                        onSubmit={saveDeal}
                    >

                        <div className="form-grid">

                            <input
                                type="text"
                                name="dealOwner"
                                placeholder="Deal Owner"
                                value={formData.dealOwner}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="dealName"
                                placeholder="Deal Name"
                                value={formData.dealName}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="accountName"
                                placeholder="Account Name"
                                value={formData.accountName}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                value={formData.amount}
                                onChange={handleChange}
                            />

                            <input
                                type="date"
                                name="closingDate"
                                value={formData.closingDate}
                                onChange={handleChange}
                            />

                            <select
                                name="stage"
                                value={formData.stage}
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

                            <input
                                type="text"
                                name="type"
                                placeholder="Type"
                                value={formData.type}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="probability"
                                placeholder="Probability"
                                value={formData.probability}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="nextStep"
                                placeholder="Next Step"
                                value={formData.nextStep}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="expectedRevenue"
                                placeholder="Expected Revenue"
                                value={formData.expectedRevenue}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="leadSource"
                                placeholder="Lead Source"
                                value={formData.leadSource}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="campaignSource"
                                placeholder="Campaign Source"
                                value={formData.campaignSource}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="contactName"
                                placeholder="Contact Name"
                                value={formData.contactName}
                                onChange={handleChange}
                            />

                        </div>

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <div className="form-buttons">

                            <button type="button"
                                onClick={() =>
                                    setShowForm(false)
                                }
                            >
                                Cancel
                            </button>

                            <button type="submit">
                                Save
                            </button>

                        </div>

                    </form>

                ) : (

                    <div className="deal-board">

                        {
                            qualificationDeals.length > 0 && (

                                <div className="deal-column">

                                    <h3>
                                        Qualification
                                    </h3>

                                    {
                                        renderDeals(
                                            qualificationDeals
                                        )
                                    }

                                </div>
                            )
                        }

                        {
                            proposalDeals.length > 0 && (

                                <div className="deal-column">

                                    <h3>
                                        Proposal
                                    </h3>

                                    {
                                        renderDeals(
                                            proposalDeals
                                        )
                                    }

                                </div>
                            )
                        }

                        {
                            negotiationDeals.length > 0 && (

                                <div className="deal-column">

                                    <h3>
                                        Negotiation
                                    </h3>

                                    {
                                        renderDeals(
                                            negotiationDeals
                                        )
                                    }

                                </div>
                            )
                        }

                        {
                            wonDeals.length > 0 && (

                                <div className="deal-column">

                                    <h3>
                                        Won
                                    </h3>

                                    {
                                        renderDeals(
                                            wonDeals
                                        )
                                    }

                                </div>
                            )
                        }

                    </div>
                )
            }

        </div>
    );
}
export default Deals;