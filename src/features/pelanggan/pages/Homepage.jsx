import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // HERO SLIDER
  const heroImages = [
    "https://i.pinimg.com/736x/13/c3/42/13c3423cd3d2e12a6087d33e14093615.jpg",
    "https://i.pinimg.com/736x/c6/58/25/c65825dcce10ba81027a6af6ed16e58d.jpg",
    "https://i.pinimg.com/736x/51/bb/40/51bb4002f4cd587efb5310ed623a74c5.jpg",
    "https://i.pinimg.com/736x/64/47/65/644765371ed808ca092827a061ebc4d7.jpg"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // KATEGORI
  const kategoriOlahraga = [
    {
      id: 1,
      nama: "Futsal",
      desc: "Lapangan futsal modern.",
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 2,
      nama: "Badminton",
      desc: "Lapangan badminton nyaman.",
      img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 3,
      nama: "Basket",
      desc: "Lapangan basket indoor.",
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 4,
      nama: "Tenis",
      desc: "Lapangan tenis premium.",
      img: "https://i.pinimg.com/736x/c9/1f/79/c91f79b5431e5154409df92d7448e824.jpg",
    },
  ];

  return (
    <div className="bg-[#050B18] overflow-hidden">

      {/* FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ICON */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <h1 className="text-white font-black italic uppercase text-xl tracking-wide">
            Sport Center
          </h1>

          <nav className="hidden md:flex items-center gap-8 text-white text-sm font-medium">

            <a href="#" className="hover:text-gray-300 transition">
              Home
            </a>

            <a href="#" className="hover:text-gray-300 transition">
              About
            </a>

          </nav>

          <button
            onClick={() => navigate("/login")}
            className="bg-white/10 border border-white/20 text-white px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition"
          >
            Login
          </button>

        </div>

      </header>

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">

        {/* CAROUSEL */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >

            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.88), rgba(0,20,51,0.45)), url(${img})`,
              }}
            />

          </div>
        ))}

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center">

          <div className="max-w-7xl mx-auto px-6 w-full">

            <div className="max-w-xl">

              <p className="uppercase tracking-[4px] text-white/70 text-sm font-semibold mb-5">
                Booking Mudah & Cepat
              </p>

              <h1 className="text-white text-5xl md:text-7xl font-black italic uppercase leading-none">

                Selamat <br />

                Datang di <br />

                <span className="text-blue-800">
                  Sport Center
                </span>

              </h1>

              <p className="text-white/70 mt-7 leading-relaxed text-sm md:text-base">
                Booking lapangan olahraga modern dengan tampilan premium
                dan sistem realtime untuk futsal, badminton, basket,
                dan tenis.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <button className="bg-[#2453D2] hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-semibold flex items-center gap-2 transition">

                  <span className="material-symbols-outlined text-[20px]">
                    calendar_month
                  </span>

                  Booking Sekarang

                </button>

                <button className="border border-white/30 hover:bg-white/10 text-white px-7 py-4 rounded-xl font-semibold flex items-center gap-2 transition">

                  <span className="material-symbols-outlined text-[20px]">
                    grid_view
                  </span>

                  Lihat Jadwal

                </button>

              </div>

              {/* DOT */}
              <div className="flex gap-3 mt-10">

                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all rounded-full ${
                      currentSlide === index
                        ? "w-10 h-3 bg-white"
                        : "w-3 h-3 bg-white/40"
                    }`}
                  />
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* KATEGORI */}
      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          {/* TITLE */}
          <div className="text-center mb-14">

            <p className="uppercase tracking-[4px] text-[#2453D2] font-semibold text-sm">
              Pilih Olahraga Favoritmu
            </p>

            <h2 className="text-[#001433] text-3xl md:text-4xl font-black italic uppercase mt-3">
              Kategori Olahraga
            </h2>

          </div>

          {/* CARD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {kategoriOlahraga.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group border border-gray-100"
              >

                <div className="h-36 overflow-hidden">

                  <img
                    src={item.img}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                </div>

                <div className="p-4">

                  <h3 className="text-[#001433] font-black uppercase text-sm">
                    {item.nama}
                  </h3>

                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    {item.desc}
                  </p>

                  <button className="mt-4 text-[#2453D2] text-xs font-bold flex items-center gap-1 hover:gap-3 transition-all">

                    Booking

                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>

                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="bg-[#001433] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[4px] text-blue-200 text-sm font-semibold">
              Kenapa Memilih Kami
            </p>

            <h2 className="text-white text-3xl md:text-4xl font-black italic uppercase mt-3">
              Fasilitas & Layanan Terbaik
            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

            {[
              {
                angka: "500+",
                title: "Pengguna Aktif",
                icon: "groups",
              },

              {
                angka: "20+",
                title: "Lapangan",
                icon: "stadium",
              },

              {
                angka: "1000+",
                title: "Booking",
                icon: "verified",
              },

              {
                angka: "24/7",
                title: "Support",
                icon: "headset_mic",
              },
            ].map((item, index) => (
              <div key={index}>

                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">

                  <span className="material-symbols-outlined text-white">
                    {item.icon}
                  </span>

                </div>

                <h3 className="text-white text-3xl font-black">
                  {item.angka}
                </h3>

                <p className="text-blue-100 text-sm uppercase mt-2 tracking-wider">
                  {item.title}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-gradient-to-r from-[#001433] to-[#2453D2] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl">

            <div>

              <p className="uppercase tracking-[4px] text-blue-200 text-sm font-semibold">
                Siap Bermain?
              </p>

              <h2 className="text-white text-3xl md:text-5xl font-black italic uppercase mt-3 leading-tight">
                Booking Lapangan <br />
                Sekarang!
              </h2>

              <p className="text-white/70 mt-5 max-w-xl">
                Pilih jadwal terbaik dan nikmati pengalaman booking
                lapangan olahraga modern dengan tampilan premium.
              </p>

            </div>

            <button className="bg-white text-[#001433] px-8 py-4 rounded-xl font-bold hover:scale-105 transition flex items-center gap-2">

              Booking Sekarang

              <span className="material-symbols-outlined">
                arrow_forward
              </span>

            </button>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#020817] py-16">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>

            <h1 className="text-white text-2xl font-black italic uppercase">
              Sport Center
            </h1>

            <p className="text-white/50 mt-5 text-sm leading-relaxed">
              Platform booking lapangan olahraga online modern
              dan terpercaya di Indonesia.
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
          © 2024 Sport Center. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;