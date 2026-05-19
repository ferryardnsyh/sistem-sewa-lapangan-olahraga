import React, { useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  CreditCard,
  BadgeDollarSign,
} from "lucide-react";

function BookingPage() {
  const [selectedField, setSelectedField] = useState("Arena Utama 1");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const lapangan = [
    {
      id: 1,
      nama: "Arena Utama 1",
      kategori: "Futsal",
      harga: "Rp 150.000",
      lokasi: "Jakarta Selatan",
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    },

    {
      id: 2,
      nama: "Court Badminton B",
      kategori: "Badminton",
      harga: "Rp 50.000",
      lokasi: "Bandung",
      img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
    },

    {
      id: 3,
      nama: "Hall Basket VIP",
      kategori: "Basket",
      harga: "Rp 200.000",
      lokasi: "Jakarta Barat",
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const jadwal = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "19:00",
    "20:00",
  ];

  const bookedSlots = ["11:00", "16:00"];

  const currentField = lapangan.find(
    (item) => item.nama === selectedField
  );

  return (
    <div className="min-h-screen bg-[#071426] text-white">

      {/* FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* NAVBAR */}
      <header className="bg-[#08182d] border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-extrabold italic uppercase">
            Sport Center
          </h1>

          <nav className="hidden md:flex gap-10 text-sm text-white/80">

            <a href="#" className="hover:text-white transition">
              Home
            </a>

            <a href="#" className="text-blue-400">
              Booking
            </a>

            <a href="#" className="hover:text-white transition">
              Kontak
            </a>

          </nav>

        </div>

      </header>

      {/* HERO */}
      <section className="relative h-[350px] overflow-hidden">

        <img
          src={currentField.img}
          alt="Lapangan"
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
              secara online dengan sistem realtime.
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

              <h2 className="text-2xl font-bold mb-8">
                Pilih Lapangan
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {lapangan.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedField(item.nama);
                      setSelectedTime("");
                    }}
                    className={`rounded-2xl overflow-hidden border cursor-pointer transition ${
                      selectedField === item.nama
                        ? "border-blue-500 scale-[1.02]"
                        : "border-white/10 hover:border-blue-400"
                    }`}
                  >

                    <img
                      src={item.img}
                      alt={item.nama}
                      className="w-full h-40 object-cover"
                    />

                    <div className="p-5">

                      <span className="text-xs uppercase bg-blue-600 px-3 py-1 rounded-full">

                        {item.kategori}

                      </span>

                      <h3 className="text-xl font-bold mt-4">
                        {item.nama}
                      </h3>

                      <p className="text-white/60 text-sm mt-2">
                        {item.harga} / jam
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* DETAIL LAPANGAN */}
            <div className="bg-[#0b1f38] rounded-3xl border border-white/10 overflow-hidden">

              <img
                src={currentField.img}
                alt="Lapangan"
                className="w-full h-[320px] object-cover"
              />

              <div className="p-8">

                <div className="flex flex-col md:flex-row justify-between gap-6">

                  <div>

                    <h2 className="text-4xl font-extrabold italic">
                      {currentField.nama}
                    </h2>

                    <div className="flex items-center gap-2 text-white/60 mt-4">

                      <MapPin size={18} />

                      {currentField.lokasi}

                    </div>

                  </div>

                  <div className="bg-blue-600 px-6 py-4 rounded-2xl h-fit">

                    <p className="text-sm text-white/70">
                      Harga Mulai
                    </p>

                    <h3 className="text-3xl font-bold mt-1">
                      {currentField.harga}
                    </h3>

                    <p className="text-sm text-white/70">
                      / jam
                    </p>

                  </div>

                </div>

                <p className="text-white/70 mt-8 leading-relaxed">
                  Lapangan olahraga premium dengan fasilitas lengkap,
                  pencahayaan profesional, area tunggu nyaman, dan
                  sistem booking online realtime.
                </p>

              </div>

            </div>

            {/* PILIH TANGGAL */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-6">

                <CalendarDays className="text-blue-400" />

                <h2 className="text-2xl font-bold">
                  Pilih Tanggal
                </h2>

              </div>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#08182d] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
              />

            </div>

            {/* PILIH JAM */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <Clock3 className="text-blue-400" />

                <h2 className="text-2xl font-bold">
                  Pilih Jam Booking
                </h2>

              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                {jadwal.map((jam, index) => {
                  const isBooked = bookedSlots.includes(jam);

                  return (
                    <button
                      key={index}
                      disabled={isBooked}
                      onClick={() => setSelectedTime(jam)}
                      className={`py-4 rounded-2xl border transition font-semibold ${
                        isBooked
                          ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed"
                          : selectedTime === jam
                          ? "bg-blue-600 border-blue-500"
                          : "bg-[#08182d] border-white/10 hover:border-blue-500"
                      }`}
                    >

                      {jam}

                    </button>
                  );
                })}

              </div>

              {/* INFO */}
              <div className="mt-8 flex items-center gap-6 text-sm text-white/60">

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>

                  Available

                </div>

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>

                  Booked

                </div>

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
                    {selectedField}
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
                    1 Jam
                  </span>

                </div>

              </div>

              <div className="border-t border-white/10 my-8"></div>

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-white/60">
                    Total Harga
                  </p>

                  <h3 className="text-4xl font-extrabold mt-2">
                    {currentField.harga}
                  </h3>

                </div>

                <BadgeDollarSign
                  size={40}
                  className="text-blue-400"
                />

              </div>

              <button className="w-full mt-10 bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-bold flex items-center justify-center gap-2">

                <CreditCard size={20} />

                Booking Sekarang

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#08182d] border-t border-white/10 mt-10">

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-extrabold italic uppercase">
              Sport Center
            </h2>

            <p className="text-white/60 mt-5 leading-relaxed">
              Platform booking lapangan olahraga modern dengan fasilitas
              premium dan pelayanan terbaik.
            </p>

          </div>

          <div>

            <h3 className="text-blue-400 uppercase tracking-widest font-semibold mb-5">
              Navigasi
            </h3>

            <ul className="space-y-3 text-white/70">
              <li>Home</li>
              <li>Booking</li>
            </ul>

          </div>

          <div>

            <h3 className="text-blue-400 uppercase tracking-widest font-semibold mb-5">
              Bantuan
            </h3>

            <ul className="space-y-3 text-white/70">
              <li>FAQ</li>
              <li>Cara Booking</li>
              <li>Kebijakan Privasi</li>
              <li>Syarat & Ketentuan</li>
            </ul>

          </div>

          <div>

            <h3 className="text-blue-400 uppercase tracking-widest font-semibold mb-5">
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

        <div className="border-t border-white/10 text-center py-6 text-white/40 text-sm">
          © 2026 Sport Center. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}

export default BookingPage;