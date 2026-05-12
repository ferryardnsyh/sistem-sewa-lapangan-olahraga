import React, { useState } from "react";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  // contoh data jadwal (true = tersedia, false = tidak)
  const timeSlots = [
    { time: "08:00 - 09:00", available: true },
    { time: "09:00 - 10:00", available: false },
    { time: "10:00 - 11:00", available: true },
    { time: "11:00 - 12:00", available: true },
    { time: "12:00 - 13:00", available: false },
    { time: "13:00 - 14:00", available: true },
    { time: "14:00 - 15:00", available: true },
    { time: "15:00 - 16:00", available: false },
    { time: "16:00 - 17:00", available: true },
    { time: "17:00 - 18:00", available: true },
    { time: "18:00 - 19:00", available: true },
    { time: "19:00 - 20:00", available: false },
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Pilih tanggal dan jam terlebih dahulu");
      return;
    }
    alert(`Booking berhasil untuk ${selectedDate} jam ${selectedTime}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="bg-blue-900 text-white px-6 py-3 rounded-xl flex justify-between">
        <h1 className="font-semibold">Sewa Lapangan</h1>
        <div className="space-x-4">
          <button>Home</button>
          <button>Masuk</button>
          <button className="bg-yellow-400 text-black px-3 py-1 rounded-lg">Daftar</button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow mt-6 p-6">
        <img
          src="https://i.pinimg.com/736x/13/c3/42/13c3423cd3d2e12a6087d33e14093615.jpg"
          alt="lapangan"
          className="rounded-xl w-full h-64 object-cover"
        />

        <div className="mt-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Nama Lapangan</h2>
            <p className="text-sm text-gray-500">Lokasi / Alamat</p>
          </div>
          <div className="bg-yellow-100 px-4 py-2 rounded-xl text-right">
            <p className="font-semibold">Rp 50.000 / jam</p>
            <button className="text-sm text-blue-900">Cek Ketersediaan</button>
          </div>
        </div>

        {/* Pilih Tanggal */}
        <div className="mt-6">
          <label className="block mb-2 font-medium">Pilih Tanggal</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        {/* Jadwal */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Pilih Jadwal</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={`py-2 rounded-lg text-sm ${
                  slot.available
                    ? selectedTime === slot.time
                      ? "bg-green-600 text-white"
                      : "bg-blue-900 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          className="w-full mt-6 bg-blue-900 text-white py-3 rounded-xl"
        >
          Booking Sekarang
        </button>
      </div>
    </div>
  );
}