import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  CalendarDays,
  Clock3,
  MapPin,
  CreditCard,
  BadgeDollarSign,
} from "lucide-react";

function BookingPage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= STATE =================
  const [lapangan, setLapangan] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [durasi, setDurasi] = useState(1);
  const [bookedSlots, setBookedSlots] = useState([]);
  const totalHarga = selectedField
    ? selectedField.harga * durasi
    : 0;

  // ================= FETCH LAPANGAN =================
  useEffect(() => {
    fetchLapangan();
  }, []);

  const fetchLapangan = async () => {
    try {
      const response = await axios.get("http://localhost:3000/lapangan");

      setLapangan(response.data);

      if (response.data.length > 0) {
        setSelectedField(respone.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH BOOKED SLOT =================
  useEffect(() => {
    if (selectedField && selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedField, selectedDate]);

  const fetchBookedSlots = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/jadwal/${selectedField.id_lapangan}/${selectedDate}`,
      );

      setBookedSlots(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= BOOKING =================
  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Pilih tanggal dan jam booking");
      return;
    }

    try {
      const jamSelesai =
        `${parseInt(selectedTime.split(":")[0]) + durasi}:00`;

      await axios.post("http://localhost:3000/booking", {
        user_id: user.id,
        lapangan_id: selectedField.id_lapangan,
        tanggal: selectedDate,
        jam_mulai: selectedTime,
        jam_selesai: jamSelesai,
        durasi: durasi,
        total_harga: totalHarga,
      });

      alert("Booking berhasil dibuat!");

      navigate("/halamanpesan");
    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message || "Booking gagal"
      );

    }
  };

  return (
    <div className="min-h-screen bg-[#071426] text-white">
      {/* FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* MATERIAL ICON */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />

      {/* NAVBAR */}
      <header className="bg-[#08182d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold italic uppercase">
            Sport Center
          </h1>

          <nav className="hidden md:flex gap-10 text-sm text-white/80">
            <Link to="/dashboard" className="hover:text-white transition">
              Beranda
            </Link>

            <Link to="/booking" className="text-blue-400">
              Booking
            </Link>

            <Link to="/halamanpesan">Pesanan</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[350px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#001433]/80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div>
            <p className="uppercase tracking-[5px] text-blue-300 text-sm font-semibold">
              Booking Lapangan
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold italic uppercase leading-tight mt-4">
              Booking <br />
              Lapangan Online
            </h1>

            <p className="text-white/70 mt-5 max-w-2xl leading-relaxed">
              Pilih lapangan, tentukan jadwal bermain, dan lakukan booking
              secara online realtime.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* PILIH LAPANGAN */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-8">Pilih Lapangan</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {lapangan.map((item) => (
                  <div
                    key={item.id_lapangan}
                    onClick={() => {
                      setSelectedField(item);
                      setSelectedTime("");
                    }}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition ${selectedField?.id_lapangan === item.id_lapangan
                      ? "border-blue-500 scale-[1.02]"
                      : "border-white/10 hover:border-blue-400"
                      }`}
                  >
                    <img
                      src={item.gambar}
                      alt={item.nama_lapangan}
                      className="w-full h-40 object-cover"
                    />

                    <div className="p-5">
                      <span className="text-xs uppercase bg-blue-600 px-3 py-1 rounded-full">
                        {item.kategori}
                      </span>

                      <h3 className="text-xl font-bold mt-4">{item.nama}</h3>

                      <p className="text-white/60 text-sm mt-2">
                        Rp {item.harga?.toLocaleString("id-ID")} / jam
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAIL LAPANGAN */}
            {selectedField && (
              <div className="bg-[#0b1f38] rounded-3xl border border-white/10 overflow-hidden">
                <img
                  src={selectedField.gambar}
                  alt="Lapangan"
                  className="w-full h-[320px] object-cover"
                />

                <div className="p-8">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                      <h2 className="text-4xl font-extrabold italic">
                        {selectedField.nama_lapangan}
                      </h2>

                      <div className="flex items-center gap-2 text-white/60 mt-4">
                        <MapPin size={18} />

                        {selectedField.lokasi}
                      </div>
                    </div>

                    <div className="bg-blue-600 px-6 py-4 rounded-2xl h-fit">
                      <p className="text-sm text-white/70">Harga Mulai</p>

                      <h3 className="text-3xl font-bold mt-1">
                        Rp {selectedField?.harga?.toLocaleString("id-ID")}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PILIH TANGGAL */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <CalendarDays className="text-blue-400" />

                <h2 className="text-2xl font-bold">Pilih Tanggal</h2>
              </div>

              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#08182d] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            {/* PILIH JAM */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Clock3 className="text-blue-400" />

                <h2 className="text-2xl font-bold">Pilih Jam Booking</h2>
              </div>

              <div className="space-y-5">

                {/* INPUT JAM */}
                <input
                  type="time"
                  min="08:00"
                  max="22:00"
                  value={selectedTime}
                  onChange={(e) => {

                    const jam = e.target.value;

                    if (jam < "08:00" || jam > "22:00") {

                      alert("Jam booking hanya tersedia dari 08:00 sampai 22:00");

                      setSelectedTime("");

                      return;

                    }

                    setSelectedTime(jam);

                  }}
                  className="w-full bg-[#08182d] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
                />


                {/* PILIH DURASI */}
                <select
                  value={durasi}
                  onChange={(e) => setDurasi(Number(e.target.value))}
                  className="w-full bg-[#08182d] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500"
                >

                  <option value={1}>
                    1 Jam
                  </option>

                  <option value={2}>
                    2 Jam
                  </option>

                  <option value={3}>
                    3 Jam
                  </option>

                  <option value={4}>
                    4 Jam
                  </option>

                  <option value={5}>
                    5 Jam
                  </option>

                </select>

              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8 sticky top-10">
              <h2 className="text-3xl font-extrabold italic">
                Ringkasan Booking
              </h2>

              <div className="space-y-6 mt-8">
                <div className="flex justify-between text-white/70">
                  <span>Lapangan</span>

                  <span className="text-white font-semibold">
                    {selectedField?.nama}
                  </span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Tanggal</span>

                  <span className="text-white font-semibold">
                    {selectedDate || "-"}
                  </span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Jam</span>

                  <span className="text-white font-semibold">
                    {selectedTime || "-"}
                  </span>
                </div>

                <div className="flex justify-between text-white/70">

                  <span>Durasi</span>
                  <span className="text-white font-semibold">
                    {durasi} Jam
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 my-8"></div>

              <div className="flex justify-between items-center">
                <h3 className="text-4xl font-extrabold mt-2">
                  Rp {totalHarga.toLocaleString("id-ID")}
                </h3>

                <BadgeDollarSign size={40} className="text-blue-400" />
              </div>

              <button
                onClick={handleBooking}
                className="w-full mt-10 bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Booking Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-[#020817] py-16 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h1 className="text-white text-2xl font-black italic uppercase">
              Sport Center
            </h1>

            <p className="text-white/50 mt-5 text-sm leading-relaxed">
              Platform booking lapangan olahraga online modern dan terpercaya di
              Indonesia.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase text-sm mb-5">
              Menu
            </h3>

            <ul className="space-y-3 text-white/50 text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Venue</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase text-sm mb-5">
              Bantuan
            </h3>

            <ul className="space-y-3 text-white/50 text-sm">
              <li>FAQ</li>
              <li>Cara Booking</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase text-sm mb-5">
              Hubungi Kami
            </h3>

            <ul className="space-y-4 text-white/50 text-sm">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
                0821-1234-5678
              </li>

              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                info@sportcenter.com
              </li>

              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
                Bandung, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/40 text-sm">
          © 2026 Sport Center. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default BookingPage;