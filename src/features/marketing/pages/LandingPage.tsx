import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  Globe2,
  Store,
} from "lucide-react";

const highlights = [
  {
    title: "Screenshots in every language",
    body: "See what your App Store listing will actually look like before you ship.",
    icon: Camera,
  },
  {
    title: "App words translated too",
    body: "Buttons, empty states, settings, and onboarding stay together in one place.",
    icon: Globe2,
  },
  {
    title: "Store copy ready to review",
    body: "Subtitle, description, keywords, and promo text live beside the product work.",
    icon: Store,
  },
];

const steps = [
  "Connect your iOS app",
  "Pick the languages you want",
  "Review screenshots and words",
  "Export when it looks right",
];

const audienceNotes = [
  "For the founder who keeps putting localization off.",
  "For the tiny team that does not have a localization department.",
  "For the app that is ready for more countries, not more chores.",
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f7f9f8] text-slate-950">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-white"
            aria-label="Localizer home"
          >
            <span className="grid size-10 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
              <Globe2 className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-normal">
              Localizer
            </span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-teal-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none"
          >
            Go to dashboard
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <section className="relative isolate min-h-[82svh] overflow-hidden bg-slate-950 text-white sm:min-h-[86svh]">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Localizer dashboard demo"
        >
          <source
            src="/videos/localizer-dashboard-demo.webm"
            type="video/webm"
          />
        </video>
        <div className="absolute inset-0 bg-slate-950/35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.62)_42%,rgba(15,23,42,0.18)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-7xl items-center px-5 pt-24 pb-10 sm:min-h-[86svh] sm:px-6 sm:pt-28 sm:pb-14 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold text-teal-50 ring-1 ring-white/20 sm:text-sm">
              <Camera className="size-4" aria-hidden="true" />
              Screenshots first. Translations included.
            </p>

            <h1 className="max-w-3xl text-4xl leading-[1.04] font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
              App screenshots localized in 5 minutes.
            </h1>

            <p className="mt-6 hidden max-w-xl text-lg leading-8 text-slate-100 sm:block">
              Most indie apps stay in one language because screenshots, store
              copy, and app text are painful to keep together. Localizer puts
              the whole job in one calm dashboard.
            </p>
            <p className="mt-5 text-base leading-7 text-slate-100 sm:hidden">
              Screenshots, store copy, and app text together in one calm
              dashboard.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-500 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-teal-400 focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none"
              >
                Go to dashboard
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <a
                href="#how-it-works"
                className="hidden items-center justify-center rounded-md bg-white/10 px-5 py-3 text-base font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/15 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none sm:inline-flex"
              >
                See the simple flow
              </a>
            </div>

            <p className="mt-4 hidden text-sm text-slate-300 sm:block">
              The demo loops automatically. No audio, no play button.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <Icon
                  className="mb-4 size-5 text-teal-600"
                  aria-hidden="true"
                />
                <h2 className="text-base font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="bg-[#f7f9f8] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold tracking-normal text-teal-700 uppercase">
              The five minute version
            </p>
            <h2 className="mt-3 text-4xl leading-tight font-semibold tracking-normal text-slate-950">
              One launch task instead of five separate chores.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Localizer keeps the app, App Store words, and localized
              screenshots moving together. You review the parts people will
              actually see, then head back to shipping.
            </p>
          </div>

          <div className="grid gap-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-teal-50 text-sm font-semibold text-teal-700">
                  {index + 1}
                </span>
                <p className="text-base font-semibold text-slate-900">{step}</p>
                <CheckCircle2
                  className="ml-auto size-5 shrink-0 text-teal-600"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-normal text-teal-700 uppercase">
              <Clock3 className="size-4" aria-hidden="true" />
              Built for small teams
            </p>
            <h2 className="mt-3 text-4xl leading-tight font-semibold tracking-normal text-slate-950">
              Reach more people without becoming a translation project manager.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {audienceNotes.map((note) => (
              <div
                key={note}
                className="rounded-lg border border-slate-200 bg-[#f7f9f8] p-5"
              >
                <p className="text-lg leading-7 font-semibold text-slate-900">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-normal text-teal-300 uppercase">
              Screenshots included
            </p>
            <h2 className="mt-3 text-4xl leading-tight font-semibold tracking-normal">
              Make your app feel local before the next release.
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-500 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-teal-400 focus:ring-2 focus:ring-teal-200 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none"
          >
            Go to dashboard
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
