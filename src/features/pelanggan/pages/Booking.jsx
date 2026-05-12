import React, { useState } from "react";

export default function BookingPage2() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [bookings, setBookings] = useState([
    { date: "Senin, 1 Juni 2025", time: "08:00 - 09:00", price: 50000 },
    { date: "Senin, 1 Juni 2025", time: "09:00 - 10:00", price: 50000 },
    { date: "Senin, 1 Juni 2025", time: "10:00 - 11:00", price: 50000 },
  ]);

  const removeBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
  };

  const total = bookings.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = () => {
    if (!name || !phone) {
      alert("Lengkapi data pemesan");
      return;
    }
    if (bookings.length === 0) {
      alert("Pilih minimal 1 jadwal");
      return;
    }

    alert("Lanjut ke pembayaran");
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-4 rounded-t-2xl w-fit">
        BOOKING LAPANGAN ONLINE
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {/* Form */}
        <div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nama Pemesan</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">No Telp</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-blue-900 text-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-3">Nama Lapangan</h3>

            {bookings.map((item, index) => (
              <div
                key={index}
                className="bg-yellow-100 text-black rounded-lg px-3 py-2 mb-2 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm">{item.date} - {item.time}</p>
                  <p className="text-sm">Rp.{item.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => removeBooking(index)}
                  className="text-red-500 font-bold"
                >
                  🗑
                </button>
              </div>
            ))}

            <button className="mt-2 text-sm underline">+ Tambah Jadwal</button>
          </div>

          {/* Rincian */}
          <div className="bg-yellow-100 p-4 rounded-2xl mt-4">
            <h4 className="font-semibold mb-2">Rincian Biaya</h4>
            <div className="flex justify-between text-sm">
              <span>Biaya Sewa</span>
              <span>Rp.{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <span>Total Bayar</span>
              <span>Rp.{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl"
          >
            Lanjutkan Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}