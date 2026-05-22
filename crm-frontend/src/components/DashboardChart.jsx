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
        height: "300px",
        marginTop: "10px"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;