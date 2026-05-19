import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Building2,
  ShieldCheck,
  ReceiptText,
  CheckCircle2,
} from "lucide-react";

function PembayaranPage() {
  const [metode, setMetode] = useState("qris");

  const booking = {
    lapangan: "Arena Futsal Utama",
    tanggal: "20 Mei 2025",
    jam: "19:00 - 20:00",
    durasi: "1 Jam",
    harga: 150000,
    admin: 5000,
  };

  const total = booking.harga + booking.admin;

  return (
    <div className="min-h-screen bg-[#071426] text-white">

      {/* NAVBAR */}
      <header className="bg-[#08182d] border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-extrabold italic">
            SPORT CENTER
          </h1>

          <button className="flex items-center gap-2 text-white/70 hover:text-white transition">

            <ArrowLeft size={18} />

            Kembali

          </button>

        </div>

      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80"
            alt="Futsal"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#001433]/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          <p className="uppercase tracking-[5px] text-blue-300 text-sm">
            Pembayaran Booking
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold italic uppercase leading-tight mt-5">

            Selesaikan <br />
            Pembayaran

          </h1>

          <p className="text-white/70 mt-6 max-w-2xl">
            Pilih metode pembayaran favoritmu dan selesaikan transaksi
            untuk mengaktifkan booking lapangan.
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* METODE PEMBAYARAN */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <Wallet className="text-blue-400" />

                <h2 className="text-3xl font-bold">
                  Pilih Metode Pembayaran
                </h2>

              </div>

              <div className="space-y-5">

                {/* QRIS */}
                <button
                  onClick={() => setMetode("qris")}
                  className={`w-full rounded-2xl border p-5 transition text-left ${
                    metode === "qris"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-white/10 bg-[#08182d]"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">

                        <CreditCard className="text-blue-400" />

                      </div>

                      <div>

                        <h3 className="font-bold text-lg">
                          QRIS
                        </h3>

                        <p className="text-white/60 text-sm">
                          OVO, Dana, GoPay, ShopeePay, Mobile Banking
                        </p>

                      </div>

                    </div>

                    {metode === "qris" && (
                      <CheckCircle2 className="text-blue-400" />
                    )}

                  </div>

                </button>

                {/* TRANSFER */}
                <button
                  onClick={() => setMetode("transfer")}
                  className={`w-full rounded-2xl border p-5 transition text-left ${
                    metode === "transfer"
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-white/10 bg-[#08182d]"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">

                        <Building2 className="text-green-400" />

                      </div>

                      <div>

                        <h3 className="font-bold text-lg">
                          Transfer Bank
                        </h3>

                        <p className="text-white/60 text-sm">
                          BCA, BRI, Mandiri, BNI
                        </p>

                      </div>

                    </div>

                    {metode === "transfer" && (
                      <CheckCircle2 className="text-blue-400" />
                    )}

                  </div>

                </button>

              </div>

            </div>

            {/* DETAIL PEMBAYARAN */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <ReceiptText className="text-blue-400" />

                <h2 className="text-3xl font-bold">
                  Detail Pembayaran
                </h2>

              </div>

              {metode === "qris" && (
                <div className="bg-[#08182d] rounded-3xl border border-white/10 p-8 text-center">

                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=SPORTCENTERPAYMENT"
                    alt="QRIS"
                    className="w-64 h-64 mx-auto rounded-2xl bg-white p-4"
                  />

                  <h3 className="text-2xl font-bold mt-6">
                    Scan QRIS
                  </h3>

                  <p className="text-white/60 mt-3">
                    Scan kode QR menggunakan aplikasi e-wallet atau
                    mobile banking untuk menyelesaikan pembayaran.
                  </p>

                </div>
              )}

              {metode === "transfer" && (
                <div className="space-y-5">

                  <div className="bg-[#08182d] rounded-2xl border border-white/10 p-5 flex justify-between items-center">

                    <div>

                      <p className="text-white/50 text-sm">
                        Bank BCA
                      </p>

                      <h3 className="text-2xl font-bold mt-1">
                        1234567890
                      </h3>

                      <p className="text-white/60 mt-1">
                        A/N SPORT CENTER
                      </p>

                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-semibold">
                      Copy
                    </button>

                  </div>

                  <div className="bg-[#08182d] rounded-2xl border border-white/10 p-5 flex justify-between items-center">

                    <div>

                      <p className="text-white/50 text-sm">
                        Bank Mandiri
                      </p>

                      <h3 className="text-2xl font-bold mt-1">
                        9876543210
                      </h3>

                      <p className="text-white/60 mt-1">
                        A/N SPORT CENTER
                      </p>

                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-semibold">
                      Copy
                    </button>

                  </div>

                </div>
              )}

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
                    {booking.lapangan}
                  </span>

                </div>

                <div className="flex justify-between text-white/70">

                  <span>Tanggal</span>

                  <span className="text-white font-semibold">
                    {booking.tanggal}
                  </span>

                </div>

                <div className="flex justify-between text-white/70">

                  <span>Jam</span>

                  <span className="text-white font-semibold">
                    {booking.jam}
                  </span>

                </div>

                <div className="flex justify-between text-white/70">

                  <span>Durasi</span>

                  <span className="text-white font-semibold">
                    {booking.durasi}
                  </span>

                </div>

              </div>

              <div className="border-t border-white/10 my-8"></div>

              <div className="space-y-4">

                <div className="flex justify-between text-white/70">

                  <span>Harga Booking</span>

                  <span>Rp 150.000</span>

                </div>

                <div className="flex justify-between text-white/70">

                  <span>Biaya Admin</span>

                  <span>Rp 5.000</span>

                </div>

              </div>

              <div className="border-t border-white/10 my-8"></div>

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-white/60">
                    Total Pembayaran
                  </p>

                  <h3 className="text-4xl font-extrabold mt-2">
                    Rp {total.toLocaleString("id-ID")}
                  </h3>

                </div>

              </div>

              <button className="w-full mt-10 bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-bold text-lg">

                Bayar Sekarang

              </button>

              <div className="mt-6 flex items-center gap-3 text-sm text-white/50">

                <ShieldCheck size={18} />

                Pembayaran aman dan terenkripsi

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#08182d] border-t border-white/10 mt-10">

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-extrabold italic">
              SPORT CENTER
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
              <li>Jadwal</li>
              <li>Kontak</li>
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

            <ul className="space-y-4 text-white/70">

              <li>📍 Bandung, Indonesia</li>
              <li>📞 0821-1234-5678</li>
              <li>✉ info@sportcenter.com</li>

            </ul>

          </div>

        </div>

        <div className="border-t border-white/10 text-center py-6 text-white/40 text-sm">
          © 2025 Sport Center. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}

export default PembayaranPage;