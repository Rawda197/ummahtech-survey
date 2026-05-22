"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SurveyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    doctorName: "",
    title: "",
    specialty: "",
    experienceYears: "",
    country: "",
    city: "",
    workplace: "",
    phone: "",
    email: "",
    whatsappAgreement: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    localStorage.setItem("doctorInfo", JSON.stringify(form));

    router.push("/questions");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute left-[-100px] top-[-100px] h-72 w-72 animate-pulse rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 animate-pulse rounded-full bg-cyan-400/20 blur-3xl" />

      <section className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
        <div className="animate-fadeIn">
          <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-blue-300">
            UMMAHTECH
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            Uzman Bilgi Formu
          </h1>

          <p className="mb-5 text-lg leading-8 text-slate-300">
            Bu form, dil ve konuşma terapistleri için geliştirilen dijital takip
            platformunun ilk aşaması kapsamında hazırlanmıştır.
          </p>

          <div className="rounded-2xl border border-blue-400/30 bg-white/10 p-5 backdrop-blur">
            <p className="leading-8 text-slate-200">
              Telefon numaranız, proje sürecini takip edebilmeniz ve ilk test
              sürümüyle ilgili bilgilendirmeleri alabilmeniz için WhatsApp takip
              grubuna eklenmek amacıyla kullanılacaktır.
            </p>
          </div>
        </div>

        <div className="animate-slideUp rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur sm:p-8">
          <h2 className="mb-2 text-2xl font-bold">Doktor Bilgileri</h2>

          <p className="mb-6 text-sm leading-7 text-slate-300">
            Lütfen bilgilerinizi eksiksiz doldurunuz.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              name="doctorName"
              placeholder="Ad Soyad"
              onChange={handleChange}
              className="input-style"
              required
            />

            <select
              name="title"
              onChange={handleChange}
              className="input-style"
              required
            >
              <option value="">Ünvanınızı seçiniz</option>
              <option value="doctor">Doktor</option>
              <option value="therapist">Dil ve Konuşma Terapisti</option>
              <option value="specialist">Uzman</option>
              <option value="student">Öğrenci / Stajyer</option>
            </select>

            <input
              name="specialty"
              placeholder="Uzmanlık Alanı"
              onChange={handleChange}
              className="input-style"
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="experienceYears"
                placeholder="Deneyim Yılı"
                onChange={handleChange}
                className="input-style"
              />

              <input
                name="city"
                placeholder="Şehir"
                onChange={handleChange}
                className="input-style"
              />
            </div>

            <input
              name="country"
              placeholder="Ülke"
              onChange={handleChange}
              className="input-style"
            />

            <input
              name="workplace"
              placeholder="Çalıştığınız Kurum / Klinik"
              onChange={handleChange}
              className="input-style"
            />

            <input
              name="phone"
              type="tel"
              placeholder="WhatsApp Telefon Numaranız"
              onChange={handleChange}
              className="input-style"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="E-posta Adresiniz"
              onChange={handleChange}
              className="input-style"
            />

            <select
              name="whatsappAgreement"
              onChange={handleChange}
              className="input-style"
              required
            >
              <option value="">
                WhatsApp takip grubuna eklenmeyi kabul ediyor musunuz?
              </option>
              <option value="yes">Evet, kabul ediyorum</option>
              <option value="no">Hayır</option>
            </select>

            <button
              type="submit"
              className="mt-3 rounded-xl bg-blue-500 p-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition duration-300 hover:-translate-y-1 hover:bg-blue-600"
            >
              Bilgileri Kaydet ve Devam Et
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}