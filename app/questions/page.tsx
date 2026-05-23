"use client";

import { useState } from "react";

type Question = {
  id: string;
  type: "text" | "choice" | "multi";
  question: string;
  placeholder?: string;
  options?: string[];
};

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyF74vAjK-ozrZCVLCQsUgEbmBT3ekumIlnkAXNQrCHOUf3FhBAqF0eeuC_9ioY2fjl/exec";

const questions: Question[] = [
  {
    id: "specialty",
    type: "text",
    question: "Dil ve konuşma alanındaki uzmanlık alanınız nedir?",
    placeholder: "Uzmanlık alanınızı yazınız",
  },
  {
    id: "ageGroup",
    type: "multi",
    question: "En sık hangi yaş grubundaki çocuklarla çalışıyorsunuz?",
    options: ["0-3 yaş", "4-6 yaş", "7-12 yaş", "12 yaş üzeri", "Tüm yaş grupları"],
  },
  {
    id: "monthlyCases",
    type: "choice",
    question: "Aylık ortalama kaç vaka takip ediyorsunuz?",
    options: ["10’dan az", "10-30", "31-60", "60’tan fazla"],
  },
  {
    id: "workType",
    type: "multi",
    question: "Çalışma şekliniz nedir?",
    options: ["Bireysel", "Klinik", "Merkez", "Hastane", "Birden fazla yerde"],
  },
  {
    id: "sessionType",
    type: "multi",
    question: "Seanslarınızı nasıl gerçekleştiriyorsunuz?",
    options: ["Sadece yüz yüze", "Sadece online", "Yüz yüze ve online"],
  },
  {
    id: "dataStorage",
    type: "multi",
    question: "Hasta bilgilerini şu anda nasıl saklıyorsunuz?",
    options: ["Kağıt", "Excel", "WhatsApp", "Özel bir yazılım", "Sabit bir sistem yok"],
  },
  {
    id: "sessionNotes",
    type: "text",
    question: "Her seansın notlarını nasıl kaydediyorsunuz?",
    placeholder: "Kısaca açıklayınız",
  },
  {
    id: "biggestProblem",
    type: "text",
    question: "Vaka takibinde en çok zorlandığınız konu nedir?",
    placeholder: "En büyük zorluğunuzu yazınız",
  },
  {
    id: "historyProblem",
    type: "choice",
    question: "Vakanın geçmiş gelişimini takip etmekte zorlanıyor musunuz?",
    options: ["Evet", "Hayır", "Bazen"],
  },
  {
    id: "treatmentPlan",
    type: "choice",
    question: "Her çocuk için ayrı bir terapi planı oluşturuyor musunuz?",
    options: ["Evet", "Hayır", "Kısmen"],
  },
  {
    id: "visualProgress",
    type: "choice",
    question: "Çocuğun gelişimini grafiklerle görmek ister misiniz?",
    options: ["Evet", "Hayır", "Kararsızım"],
  },
  {
    id: "betweenSessions",
    type: "choice",
    question: "Çocuğu seanslar arasında takip ediyor musunuz?",
    options: ["Evet", "Hayır", "Sadece bazı vakalarda"],
  },
  {
    id: "parentsContact",
    type: "multi",
    question: "Ailelerle şu anda en çok hangi kanaldan iletişim kuruyorsunuz?",
    options: ["WhatsApp", "Telefon", "E-posta", "Klinik sistemi", "Diğer"],
  },
  {
    id: "parentsPressure",
    type: "choice",
    question: "Ailelerle iletişim süreci zamanınızı fazla alıyor mu?",
    options: ["Evet", "Hayır", "Bazen"],
  },
  {
    id: "parentView",
    type: "text",
    question: "Ailelerin uygulamada çocukları hakkında hangi bilgileri görmesini istersiniz?",
    placeholder: "Örn: seans notları, gelişim raporu, ev ödevleri",
  },
  {
    id: "homework",
    type: "choice",
    question: "Ailelere ev çalışmaları veya egzersizler veriyor musunuz?",
    options: ["Evet", "Hayır", "Bazen"],
  },
  {
    id: "homeworkMethod",
    type: "multi",
    question: "Ev çalışmalarını şu anda nasıl gönderiyorsunuz?",
    options: ["WhatsApp", "PDF", "Kağıt", "Video", "Göndermiyorum"],
  },
  {
    id: "gamesBenefit",
    type: "choice",
    question: "Dijital oyunların terapi sürecine katkı sağlayacağını düşünüyor musunuz?",
    options: ["Evet", "Hayır", "Kararsızım"],
  },
  {
    id: "gamesType",
    type: "text",
    question: "Sizce çocuklar için hangi tür oyunlar veya aktiviteler faydalı olur?",
    placeholder: "Kısaca yazınız",
  },
  {
    id: "gamesPlan",
    type: "choice",
    question: "Oyunların çocuğun terapi planı ve seviyesine göre önerilmesini ister misiniz?",
    options: ["Evet", "Hayır", "Olabilir"],
  },
  {
    id: "parentsPay",
    type: "choice",
    question: "Ailelerin çocuk takibi için aylık abonelik ödeyebileceğini düşünüyor musunuz?",
    options: ["Evet", "Hayır", "Doğru değer sunulursa evet"],
  },
  {
    id: "paidServices",
    type: "multi",
    question: "Aileleri ödeme yapmaya ikna edebilecek hizmetler neler olabilir?",
    options: ["Gelişim raporları", "Dijital oyunlar", "Ev ödevleri", "Takip paneli", "Doktorla düzenli iletişim"],
  },
  {
    id: "price",
    type: "choice",
    question: "Aileler için uygun aylık abonelik fiyatı sizce ne olabilir?",
    options: ["100 TL altı", "100-250 TL", "250-500 TL", "500 TL üzeri", "Fikrim yok"],
  },
  {
    id: "topFeatures",
    type: "text",
    question: "Sizi bu uygulamayı düzenli kullanmaya ikna edecek en önemli 3 özellik nedir?",
    placeholder: "3 önemli özelliği yazınız",
  },
  {
    id: "beta",
    type: "choice",
    question: "İlk test sürümünü deneyen uzmanlar listesine katılmak ister misiniz?",
    options: ["Evet", "Hayır", "Daha sonra karar vermek isterim"],
  },
];

export default function QuestionsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [coreSent, setCoreSent] = useState(false);

  const [coreTeam, setCoreTeam] = useState({
    name: "",
    title: "",
    specialty: "",
    country: "",
    city: "",
    workplace: "",
    phone: "",
    email: "",
    agreement: "",
  });

  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);
  const progress = Math.round(((currentPage + 1) / totalPages) * 100);

  function isAnswered(question: Question) {
    const answer = answers[question.id];

    if (question.type === "multi") {
      return Array.isArray(answer) && answer.length > 0;
    }

    return typeof answer === "string" && answer.trim().length > 0;
  }

  function handleSingleAnswer(id: string, value: string) {
    setError("");
    setAnswers({ ...answers, [id]: value });
  }

  function handleMultiAnswer(id: string, value: string) {
    setError("");

    const current = Array.isArray(answers[id]) ? answers[id] : [];

    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    setAnswers({ ...answers, [id]: updated });
  }

  function handleTextAnswer(id: string, value: string) {
    setError("");
    setAnswers({ ...answers, [id]: value });
  }

  function handleCoreChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setCoreTeam({
      ...coreTeam,
      [e.target.name]: e.target.value,
    });
  }

  async function sendToGoogleSheet(coreTeamData?: typeof coreTeam) {
    const doctorInfo = localStorage.getItem("doctorInfo");

    const payload = {
      doctorInfo: doctorInfo ? JSON.parse(doctorInfo) : null,
      answers,
      submittedAt: new Date().toISOString(),
      coreTeam: coreTeamData
        ? {
            interested: "yes",
            ...coreTeamData,
          }
        : {
            interested: "no",
          },
    };

    localStorage.setItem("completeSurveyData", JSON.stringify(payload));

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  async function handleNext() {
    const currentPageAnswered = currentQuestions.every((question) =>
      isAnswered(question)
    );

    if (!currentPageAnswered) {
      setError("Lütfen bu bölümdeki tüm soruları cevaplayınız.");
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const allAnswered = questions.every((question) => isAnswered(question));

    if (!allAnswered) {
      setError("Lütfen tüm soruları cevaplayınız.");
      return;
    }

    try {
      setIsSending(true);
      setError("");

      await sendToGoogleSheet();

      setIsCompleted(true);
    } catch (err) {
      console.error(err);
      setError("Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsSending(false);
    }
  }

  async function handleCoreSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !coreTeam.name ||
      !coreTeam.phone ||
      !coreTeam.email ||
      coreTeam.agreement !== "yes"
    ) {
      setError("Core Team başvurusu için ad, telefon, e-posta ve onay alanları gereklidir.");
      return;
    }

    try {
      setIsSending(true);
      setError("");

      await sendToGoogleSheet(coreTeam);

      setCoreSent(true);
    } catch (err) {
      console.error(err);
      setError("Core Team bilgileri gönderilirken bir hata oluştu.");
    } finally {
      setIsSending(false);
    }
  }

  function handleBack() {
    setError("");

    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (isCompleted) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="confetti confetti-1" />
        <div className="confetti confetti-2" />
        <div className="confetti confetti-3" />
        <div className="confetti confetti-4" />
        <div className="confetti confetti-5" />
        <div className="confetti confetti-6" />
        <div className="confetti confetti-7" />
        <div className="confetti confetti-8" />

        <section className="animate-celebrate relative mx-auto max-w-5xl rounded-3xl border border-emerald-400/30 bg-white/10 p-6 text-center shadow-2xl backdrop-blur sm:p-8">
          <div className="mx-auto mb-6 flex h-24 w-24 animate-pop items-center justify-center rounded-full bg-emerald-500 text-5xl shadow-lg shadow-emerald-500/40">
            ✓
          </div>

          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-emerald-300">
            UMMAHTECH
          </p>

          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Teşekkür ederiz!
          </h1>

          <p className="mb-5 leading-8 text-slate-200">
            Yanıtlarınız başarıyla kaydedildi. Katkınız, projenin geliştirme
            sürecinde dikkatle değerlendirilecektir.
          </p>

          <div className="mb-6 rounded-2xl border border-blue-400/30 bg-blue-500/10 p-5">
            <p className="leading-8 text-blue-100">
              Proje süreci, UMMAHTECH ekibi ve Proje Yöneticisi Mühendis Rawda
              İspitan tarafından yakından takip edilmektedir.
            </p>
          </div>

          <div className="mt-8 grid gap-6 text-left lg:grid-cols-2">
            <div className="rounded-3xl border border-emerald-400/30 bg-slate-900/70 p-6">
              <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-emerald-300">
                CORE TEAM
              </p>

              <h2 className="mb-4 text-2xl font-bold text-white">
                İlk 15 Uzman Doktordan Biri Olmak İster misiniz?
              </h2>

              <p className="mb-5 leading-8 text-slate-300">
                Projenin geliştirme süreci 3 ay sürecektir. Seçilecek 15 uzman
                doktor, özel takip ekibinde yer alacak ve ürünün gelişimine
                doğrudan katkı sağlayacaktır.
              </p>

              <ul className="space-y-3 text-sm leading-7 text-slate-200">
                <li>✓ 15 doktordan oluşan özel Core Team içinde yer alma</li>
                <li>✓ WhatsApp grubunda proje sürecini yakından takip etme</li>
                <li>✓ Her 2 haftada bir güncellemeleri görme</li>
                <li>✓ Geliştirme sürecinde doğrudan feedback verme</li>
                <li>✓ İlk test sürümünü ücretsiz deneme</li>
                <li>✓ 6 ay boyunca sistemi ücretsiz kullanma ve aylık feedback verme</li>
                <li>✓ Resmi lansmandan sonra final sürümü ömür boyu ücretsiz kullanma</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              {coreSent ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-3xl">
                    ✓
                  </div>
                  <h2 className="mb-3 text-2xl font-bold">
                    Core Team başvurunuz alındı!
                  </h2>
                  <p className="leading-8 text-slate-300">
                    Sizinle WhatsApp üzerinden iletişime geçilecektir.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="mb-2 text-2xl font-bold">
                    Core Team Başvuru Formu
                  </h2>

                  <p className="mb-5 text-sm leading-7 text-slate-300">
                    İlk 15 uzman takip ekibine dahil olmak isterseniz lütfen
                    iletişim bilgilerinizi paylaşınız.
                  </p>

                  {error && (
                    <div className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleCoreSubmit} className="grid gap-4">
                    <input
                      name="name"
                      placeholder="Ad Soyad *"
                      value={coreTeam.name}
                      onChange={handleCoreChange}
                      className="input-style"
                    />

                    <input
                      name="title"
                      placeholder="Ünvan"
                      value={coreTeam.title}
                      onChange={handleCoreChange}
                      className="input-style"
                    />

                    <input
                      name="specialty"
                      placeholder="Uzmanlık Alanı"
                      value={coreTeam.specialty}
                      onChange={handleCoreChange}
                      className="input-style"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        name="country"
                        placeholder="Ülke"
                        value={coreTeam.country}
                        onChange={handleCoreChange}
                        className="input-style"
                      />

                      <input
                        name="city"
                        placeholder="Şehir"
                        value={coreTeam.city}
                        onChange={handleCoreChange}
                        className="input-style"
                      />
                    </div>

                    <input
                      name="workplace"
                      placeholder="Çalıştığınız Kurum / Klinik"
                      value={coreTeam.workplace}
                      onChange={handleCoreChange}
                      className="input-style"
                    />

                    <input
                      name="phone"
                      type="tel"
                      placeholder="WhatsApp Telefon Numaranız *"
                      value={coreTeam.phone}
                      onChange={handleCoreChange}
                      className="input-style"
                    />

                    <input
                      name="email"
                      type="email"
                      placeholder="E-posta Adresiniz *"
                      value={coreTeam.email}
                      onChange={handleCoreChange}
                      className="input-style"
                    />

                    <select
                      name="agreement"
                      value={coreTeam.agreement}
                      onChange={handleCoreChange}
                      className="input-style"
                    >
                      <option value="">
                        Core Team’e katılmayı kabul ediyor musunuz? *
                      </option>
                      <option value="yes">Evet, kabul ediyorum</option>
                      <option value="no">Hayır</option>
                    </select>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-1 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSending ? "Gönderiliyor..." : "Core Team’e Başvur"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute left-[-100px] top-[-100px] h-72 w-72 animate-pulse rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 animate-pulse rounded-full bg-emerald-400/20 blur-3xl" />

      <section className="relative mx-auto max-w-4xl animate-slideUp rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur sm:p-8">
        <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-blue-300">
          UMMAHTECH
        </p>

        <h1 className="mb-3 text-3xl font-bold">Uzman Anketi</h1>

        <p className="mb-6 leading-8 text-slate-300">
          Sadece 7 dakikanızı ayırarak projenin ilk aşamasını yakından takip etme
          ve erken dönem uzman avantajlarından yararlanma fırsatı elde edebilirsiniz.
        </p>

        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>
              Bölüm {currentPage + 1} / {totalPages}
            </span>
            <span>{progress}% tamamlandı</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {currentQuestions.map((item, index) => (
            <div
              key={item.id}
              className={`animate-fadeIn rounded-2xl border p-5 transition duration-300 ${
                isAnswered(item)
                  ? "border-emerald-400/40 bg-slate-900/70"
                  : "border-white/10 bg-slate-900/70 hover:border-emerald-400/60"
              }`}
            >
              <p className="mb-4 font-semibold leading-7">
                {startIndex + index + 1}. {item.question}
                <span className="ml-2 text-emerald-300">*</span>
              </p>

              {item.type === "text" ? (
                <textarea
                  value={(answers[item.id] as string) || ""}
                  onChange={(e) => handleTextAnswer(item.id, e.target.value)}
                  placeholder={item.placeholder}
                  className="input-style min-h-[110px]"
                />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {item.options?.map((option) => {
                    const answer = answers[item.id];

                    const isSelected =
                      item.type === "multi"
                        ? Array.isArray(answer) && answer.includes(option)
                        : answer === option;

                    return (
                      <button
                        key={`${item.id}-${option}`}
                        type="button"
                        onClick={() =>
                          item.type === "multi"
                            ? handleMultiAnswer(item.id, option)
                            : handleSingleAnswer(item.id, option)
                        }
                        className={`rounded-xl border p-3 text-right transition duration-300 hover:scale-[1.02] ${
                          isSelected
                            ? "scale-[1.02] border-emerald-400 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                            : "border-white/10 bg-white text-slate-900 hover:border-emerald-400"
                        }`}
                      >
                        <span
                          className={`ml-2 inline-block ${
                            isSelected ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          ✓
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}

              {item.type === "multi" && (
                <p className="mt-3 text-sm text-emerald-300">
                  Birden fazla seçenek seçebilirsiniz.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentPage === 0 || isSending}
            className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            Geri
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isSending}
            className="rounded-xl bg-emerald-500 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-1 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending
              ? "Gönderiliyor..."
              : currentPage === totalPages - 1
              ? "Anketi Gönder"
              : "Sonraki"}
          </button>
        </div>
      </section>
    </main>
  );
}