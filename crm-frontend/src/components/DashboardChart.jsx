import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function DashboardChart({

    customerCount,
    leadCount,
    taskCount,
    convertedCount

}) {

    const data = [

        {
            name: "Customers",
            count: customerCount
        },

        {
            name: "Leads",
            count: leadCount
        },

        {
            name: "Tasks",
            count: taskCount
        },

        {
            name: "Converted",
            count: convertedCount
        }
    ];

    return (

        <div
            style={{
                width: "100%",
                height: 350,
                marginTop: "40px",
                background: "white",
                padding: "20px",
                borderRadius: "10px"
            }}
        >


            <ResponsiveContainer>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#4a90e2"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default DashboardChart;