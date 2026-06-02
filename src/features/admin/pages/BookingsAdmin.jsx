import { useEffect, useState } from "react";
import axios from "axios";

function BookingsAdmin() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/admin/bookings"
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }

  };
  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:3000/admin/bookings/${id}`,
        { status }
      );

      getBookings();

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="min-h-screen bg-[#071426] text-white p-8">

      <h1 className="text-3xl font-bold mb-8">
        Kelola Booking
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-white/10">

          <thead>

            <tr className="bg-[#0b1f38]">

              <th className="p-4">ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Lapangan</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Jam</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((item) => (

              <tr
                key={item.id}
                className="border-t border-white/10"
              >

                <td className="p-4">{item.id}</td>

                <td className="p-4">
                  {item.nama_user}
                </td>

                <td className="p-4">
                  {item.nama_lapangan}
                </td>

                <td className="p-4">
                  {item.tanggal}
                </td>

                <td className="p-4">
                  {item.jam_mulai} - {item.jam_selesai}
                </td>

                <td className="p-4">
                  Rp{" "}
                  {Number(
                    item.total_harga
                  ).toLocaleString("id-ID")}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded text-white ${item.status === "pending"
                      ? "bg-yellow-500"
                      : item.status === "selesai"
                        ? "bg-green-600"
                        : "bg-red-600"
                      }`}
                  >

                    {item.status}

                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                    >
                      Detail
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(item.id, "selesai")
                      }
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                    >
                      Selesai
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(item.id, "dibatalkan")
                      }
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      Batalkan
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default BookingsAdmin;