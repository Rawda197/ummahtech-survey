export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute left-[-120px] top-[-120px] h-80 w-80 animate-pulse rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 animate-pulse rounded-full bg-cyan-400/20 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="animate-fadeIn">
          <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-blue-300">
            UMMAHTECH
          </p>

          <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Dil ve Konuşma Terapistleri İçin Dijital Takip Platformu
          </h1>

          <p className="mb-6 max-w-3xl text-lg leading-8 text-slate-300">
            Bu proje, Mısır-Türkiye merkezli UMMAHTECH şirketi tarafından
            yürütülmektedir.
          </p>

          <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
            Amacımız, uzmanların çocuk vakalarını daha kolay takip edebilmesini,
            ailelerle düzenli iletişim kurabilmesini ve terapi sürecini dijital
            araçlarla destekleyebilmesini sağlamaktır.
          </p>

          <div className="mb-10 rounded-2xl border border-blue-400/30 bg-white/10 p-6 shadow-2xl backdrop-blur transition duration-500 hover:scale-[1.02] hover:border-blue-300/60">
            <p className="leading-8 text-slate-200">
              Ankete katılan uzmanlar, projenin ilk test sürümünü deneyecek
              terapistler listesine dahil edilecektir. Ayrıca proje yayına
              alındıktan sonra özel avantajlardan yararlanacak ve geri
              bildirimleri ürün geliştirme sürecinde dikkate alınacaktır.
            </p>
          </div>

          <a
            href="/survey"
            className="inline-flex w-fit items-center gap-3 rounded-xl bg-blue-500 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition duration-300 hover:-translate-y-1 hover:bg-blue-600"
          >
            Ankete Başla
            <span className="text-xl">→</span>
          </a>
        </div>
      </section>

      <footer className="relative border-t border-white/10 bg-slate-950/80 px-6 py-6 text-center text-sm text-slate-400">
        <p>
          Bu proje UMMAHTECH tarafından geliştirilmekte ve yönetilmektedir.
        </p>
        <p className="mt-2 text-slate-500">
          © 2026 UMMAHTECH. All rights reserved.
        </p>
      </footer>
    </main>
  );
}