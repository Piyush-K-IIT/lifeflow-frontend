import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import API from "../api/axios";

const BLOOD_ORDER = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

// Blood group specific colors
const BLOOD_GROUP_COLORS = {
  "A+": "#F44336", // Red
  "A-": "#FF6D00", // Orange
  "B+": "#3B82F6", // Blue
  "B-": "#06B6D4", // Cyan
  "AB+": "#7C4DFF", // Purple
  "AB-": "#A855F7", // Violet
  "O+": "#22C55E", // Green
  "O-": "#EAB308", // Yellow
};

const BloodDemandChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/requests/stats/demand");

        if (response.data.success) {
          // Keep blood groups in fixed order
          const formattedData = BLOOD_ORDER.map((group) => {
            const found = response.data.stats.find(
              (item) => item._id === group
            );

            return {
              name: group,
              units: found ? found.totalUnits : 0,
            };
          });

          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching blood demand stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Blood Group Demand Analysis
      </h3>

      <p className="text-gray-500 mb-6">
        Real-time distribution of blood requests across all blood groups.
      </p>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="name"
              tick={{
                fontSize: 14,
                fontWeight: 600,
              }}
            />

            <YAxis allowDecimals={false} />

            <Tooltip
              cursor={{ fill: "#FEF2F2" }}
              formatter={(value) => [`${value} Units`, "Demand"]}
              labelFormatter={(label) => `Blood Group : ${label}`}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="units"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={BLOOD_GROUP_COLORS[entry.name]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-500 italic mt-5">
        * Total units required across all active hospital requests.
      </p>
    </div>
  );
};

export default BloodDemandChart;