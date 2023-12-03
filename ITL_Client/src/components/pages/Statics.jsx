import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Statics = () => {
  const statisticsData = [
    {
      cameraId: 1,
      location: "Location 1",
      isGreen: true,
      greenDuration: 30,
      averageWaitingTime: 20,
      averageGreenTime: 40,
      trafficVolumeByHour: [
        { name: "00:00", value: 30 },
        { name: "01:00", value: 40 },
        { name: "02:00", value: 20 },
        { name: "03:00", value: 10 },
        { name: "04:00", value: 50 },
        { name: "05:00", value: 60 },
        { name: "06:00", value: 70 },
        { name: "07:00", value: 80 },
        { name: "08:00", value: 90 },
        { name: "09:00", value: 100 },
        { name: "10:00", value: 110 },
        { name: "11:00", value: 120 },
      ],
      vehicleCountByHour: [
        { name: "00:00", value: 5 },
        { name: "01:00", value: 10 },
        { name: "02:00", value: 8 },
        { name: "03:00", value: 6 },
        { name: "04:00", value: 12 },
        { name: "05:00", value: 15 },
        { name: "06:00", value: 20 },
        { name: "07:00", value: 25 },
        { name: "08:00", value: 30 },
        { name: "09:00", value: 35 },
        { name: "10:00", value: 40 },
        { name: "11:00", value: 45 },
      ],
    },
    {
      cameraId: 2,
      location: "Location 2",
      isGreen: false,
      greenDuration: 0,
      averageWaitingTime: 15,
      averageGreenTime: 35,
      trafficVolumeByHour: [
        { name: "00:00", value: 20 },
        { name: "01:00", value: 30 },
        { name: "02:00", value: 25 },
        { name: "03:00", value: 15 },
        { name: "04:00", value: 40 },
        { name: "05:00", value: 45 },
        { name: "06:00", value: 50 },
        { name: "07:00", value: 55 },
        { name: "08:00", value: 60 },
        { name: "09:00", value: 65 },
        { name: "10:00", value: 70 },
        { name: "11:00", value: 75 },
      ],
      vehicleCountByHour: [
        { name: "00:00", value: 3 },
        { name: "01:00", value: 8 },
        { name: "02:00", value: 6 },
        { name: "03:00", value: 4 },
        { name: "04:00", value: 10 },
        { name: "05:00", value: 12 },
        { name: "06:00", value: 15 },
        { name: "07:00", value: 18 },
        { name: "08:00", value: 20 },
        { name: "09:00", value: 22 },
        { name: "10:00", value: 24 },
        { name: "11:00", value: 26 },
      ],
    },
    {
      cameraId: 3,
      location: "Location 3",
      isGreen: false,
      greenDuration: 0,
      averageWaitingTime: 15,
      averageGreenTime: 35,
      trafficVolumeByHour: [
        { name: "00:00", value: 20 },
        { name: "01:00", value: 30 },
        { name: "02:00", value: 25 },
        { name: "03:00", value: 15 },
        { name: "04:00", value: 40 },
        { name: "05:00", value: 45 },
        { name: "06:00", value: 50 },
        { name: "07:00", value: 55 },
        { name: "08:00", value: 60 },
        { name: "09:00", value: 65 },
        { name: "10:00", value: 70 },
        { name: "11:00", value: 75 },
      ],
      vehicleCountByHour: [
        { name: "00:00", value: 3 },
        { name: "01:00", value: 8 },
        { name: "02:00", value: 6 },
        { name: "03:00", value: 4 },
        { name: "04:00", value: 10 },
        { name: "05:00", value: 12 },
        { name: "06:00", value: 15 },
        { name: "07:00", value: 18 },
        { name: "08:00", value: 20 },
        { name: "09:00", value: 22 },
        { name: "10:00", value: 24 },
        { name: "11:00", value: 26 },
      ],
    },
    {
      cameraId: 4,
      location: "Location 4",
      isGreen: false,
      greenDuration: 0,
      averageWaitingTime: 15,
      averageGreenTime: 35,
      trafficVolumeByHour: [
        { name: "00:00", value: 20 },
        { name: "01:00", value: 30 },
        { name: "02:00", value: 25 },
        { name: "03:00", value: 15 },
        { name: "04:00", value: 40 },
        { name: "05:00", value: 45 },
        { name: "06:00", value: 50 },
        { name: "07:00", value: 55 },
        { name: "08:00", value: 60 },
        { name: "09:00", value: 65 },
        { name: "10:00", value: 70 },
        { name: "11:00", value: 75 },
      ],
      vehicleCountByHour: [
        { name: "00:00", value: 3 },
        { name: "01:00", value: 8 },
        { name: "02:00", value: 6 },
        { name: "03:00", value: 4 },
        { name: "04:00", value: 10 },
        { name: "05:00", value: 12 },
        { name: "06:00", value: 15 },
        { name: "07:00", value: 18 },
        { name: "08:00", value: 20 },
        { name: "09:00", value: 22 },
        { name: "10:00", value: 24 },
        { name: "11:00", value: 26 },
      ],
    },
  ];
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-blue-500 overflow-hidden">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Istatistikler</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statisticsData.map((statistic) => (
            <div
              key={statistic.cameraId}
              className="p-4 bg-white shadow-md rounded-lg"
            >
              <h2 className="text-xl font-bold mb-4">
                Kamera {statistic.cameraId}
              </h2>
              <p className="text-md">Konum: {statistic.location}</p>
              <p className="text-md">
                Trafik Lambası Durumu:{" "}
                {statistic.isGreen
                  ? "Yeşil, " + statistic.greenDuration + " sn"
                  : "Kırmızı"}
              </p>
              <div className="mt-8">
                <p className="text-lg font-semibold mb-4">İstatistikler</p>
                <p className="text-md">
                  Ortalama Bekleme Süresi: {statistic.averageWaitingTime} sn
                </p>
                <p className="text-md">
                  Ortalama Yeşil Süre: {statistic.averageGreenTime} sn
                </p>
              </div>
              <div className="mt-8">
                <p className="text-lg font-semibold mb-4">
                  Saate Göre Trafik Hacmi
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={statistic.trafficVolumeByHour}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8">
                <p className="text-lg font-semibold mb-4">
                  Saate Göre Araç Sayısı
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statistic.vehicleCountByHour}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statics;
