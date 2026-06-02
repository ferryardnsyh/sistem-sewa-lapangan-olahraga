import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [metode, setMetode] = useState("qris");

  const admin = 5000;

  const total =
    Number(booking?.total_harga || 0) + admin;

  useEffect(() => {
    getBooking();

    const script = document.createElement("script");

    script.src =
      "https://app.sandbox.midtrans.com/snap/snap.js";

    script.setAttribute(
      "data-client-key",
      ""
    );

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getBooking = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/detail/${id}`
      );

      setBooking(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create-transaction",
        {
          booking_id: booking.id,
          total_harga: total,
          nama_user: "Customer",
        }
      );

      window.snap.pay(response.data.token, {
        onSuccess: async function () {
          await axios.put(
            `http://localhost:3000/booking/bayar/${booking.id}`
          );

          alert("Pembayaran berhasil");

          navigate("/halamanpesan");
        },

        onPending: function () {
          alert("Menunggu pembayaran");
        },

        onError: function () {
          alert("Pembayaran gagal");
        },

        onClose: function () {
          alert("Popup pembayaran ditutup");
        },
      });
    } catch (error) {
      console.log(error);

      alert("Gagal membuat transaksi");
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071426] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071426] text-white">

      {/* NAVBAR */}
      <header className="bg-[#08182d] border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <h1 className="text-2xl font-extrabold italic">
            SPORT CENTER
          </h1>

          <button
            onClick={() => navigate("/halamanpesan")}
            className="flex items-center gap-2 text-white/70 hover:text-white"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

        </div>

      </header>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* DETAIL */}
            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <ReceiptText className="text-blue-400" />

                <h2 className="text-3xl font-bold">
                  Informasi Pembayaran
                </h2>

              </div>

              <div className="bg-[#08182d] p-6 rounded-2xl">

                <p className="text-white/70">
                  Setelah menekan tombol bayar,
                  Midtrans akan menampilkan
                  seluruh metode pembayaran
                  yang tersedia seperti:
                </p>

                <ul className="mt-4 space-y-2 text-white/60">

                  <li>• QRIS</li>
                  <li>• GoPay</li>
                  <li>• Dana</li>
                  <li>• ShopeePay</li>
                  <li>• Virtual Account</li>
                  <li>• Transfer Bank</li>

                </ul>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div className="bg-[#0b1f38] border border-white/10 rounded-3xl p-8 sticky top-10">

              <h2 className="text-3xl font-bold">
                Ringkasan Booking
              </h2>

              <div className="space-y-4 mt-8">

                <div className="flex justify-between">
                  <span>Lapangan</span>
                  <span>{booking.nama_lapangan}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tanggal</span>
                  <span>{booking.tanggal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Durasi</span>
                  <span>{booking.durasi} Jam</span>
                </div>

              </div>

              <div className="border-t border-white/10 my-6"></div>

              <div className="flex justify-between">

                <span>Harga Booking</span>

                <span>
                  Rp{" "}
                  {Number(
                    booking.total_harga
                  ).toLocaleString("id-ID")}
                </span>

              </div>

              <div className="flex justify-between mt-3">

                <span>Biaya Admin</span>

                <span>
                  Rp 5.000
                </span>

              </div>

              <div className="border-t border-white/10 my-6"></div>

              <div className="flex justify-between font-bold text-xl">

                <span>Total</span>

                <span>
                  Rp {total.toLocaleString("id-ID")}
                </span>

              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold"
              >
                Bayar Sekarang
              </button>

              <div className="mt-5 flex items-center gap-2 text-white/50">

                <ShieldCheck size={18} />

                Pembayaran Aman Midtrans

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default PembayaranPage;