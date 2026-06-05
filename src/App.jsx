import { useState } from 'react'

/* ------------------------------------------------------------------ *
 * Hard-coded demo data — no backend, no API, no real AI.
 * This is a clickable pitch prototype for "PFood".
 * ------------------------------------------------------------------ */

const NEARBY = [
  {
    id: 'goodhouse',
    name: 'Goodhouse',
    distance: '0.4 km',
    occupancy: 90,
    status: 'full',
    label: 'Full',
  },
  {
    id: 'study-nook',
    name: 'The Study Nook',
    distance: '0.6 km',
    occupancy: 40,
    status: 'open',
    label: 'Seats available',
  },
  {
    id: 'brew-lab',
    name: 'Brew Lab',
    distance: '0.8 km',
    occupancy: 55,
    status: 'open',
    label: 'Seats available',
  },
  {
    id: 'corner-coffee',
    name: 'Corner Coffee',
    distance: '1.1 km',
    occupancy: 75,
    status: 'filling',
    label: 'Filling up',
  },
]

const STATUS_STYLES = {
  full: { dot: 'bg-status-full', text: 'text-status-full', bar: 'bg-status-full' },
  filling: { dot: 'bg-status-filling', text: 'text-status-filling', bar: 'bg-status-filling' },
  open: { dot: 'bg-status-open', text: 'text-status-open', bar: 'bg-status-open' },
}

/* ------------------------------------------------------------------ *
 * Small shared UI pieces
 * ------------------------------------------------------------------ */

function StatusDot({ status, className = '' }) {
  return (
    <span className={`inline-block h-2.5 w-2.5 rounded-full ${STATUS_STYLES[status].dot} ${className}`} />
  )
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl bg-brand px-5 py-4 text-base font-semibold text-white shadow-lg shadow-brand/30 transition active:scale-[0.98] hover:bg-brand-dark"
    >
      {children}
    </button>
  )
}

function BackButton({ onClick, children = 'Back' }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-800"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      {children}
    </button>
  )
}

function OccupancyBar({ occupancy, status }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full ${STATUS_STYLES[status].bar} transition-all`}
        style={{ width: `${occupancy}%` }}
      />
    </div>
  )
}

function Coupon({ used, onUse }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-brand/40 bg-brand/5">
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div>
          <p className="text-sm font-semibold text-slate-800">−20% your drink</p>
          <p className="mt-0.5 font-mono text-xs tracking-wide text-brand">code PFOOD20</p>
        </div>
        {onUse ? (
          <button
            onClick={used ? undefined : onUse}
            disabled={used}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
              used
                ? 'bg-status-open/15 text-status-open'
                : 'bg-brand text-white active:scale-95 hover:bg-brand-dark'
            }`}
          >
            {used ? 'Redeemed ✓' : 'Mark as used'}
          </button>
        ) : (
          <span className="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-brand shadow-sm">
            🎟️ Coupon
          </span>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Screen 0 — Nearby list
 * ------------------------------------------------------------------ */

function NearbyScreen({ onSelect }) {
  return (
    <div className="flex h-full flex-col">
      <header className="px-5 pb-4 pt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">PFood</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Cafés near you</h1>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Bình Thạnh
        </p>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 pb-6">
        {NEARBY.map((cafe) => {
          const s = STATUS_STYLES[cafe.status]
          return (
            <button
              key={cafe.id}
              onClick={() => onSelect(cafe.id)}
              className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-card transition active:scale-[0.99] hover:border-slate-200"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-xl">
                ☕️
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-base font-semibold text-slate-900">{cafe.name}</p>
                  <span className="shrink-0 text-xs font-medium text-slate-400">{cafe.distance}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <StatusDot status={cafe.status} />
                  <span className={`text-sm font-medium ${s.text}`}>{cafe.label}</span>
                  <span className="text-xs text-slate-400">· {cafe.occupancy}%</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Screen 1 — Venue (your usual spot, FULL)
 * ------------------------------------------------------------------ */

function VenueScreen({ onBack, onFindBackup }) {
  return (
    <div className="flex h-full flex-col">
      {/* Hero image placeholder */}
      <div className="relative h-44 shrink-0 bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200">
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-70">☕️</div>
        <div className="absolute left-4 top-4">
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h1 className="text-2xl font-bold text-slate-900">Goodhouse</h1>
        <p className="mt-0.5 text-sm text-slate-500">0.4 km away · Your usual spot</p>

        <div className="mt-5 rounded-2xl border border-status-full/20 bg-status-full/5 p-4">
          <div className="flex items-center gap-2">
            <StatusDot status="full" />
            <span className="text-lg font-bold text-status-full">Full right now</span>
          </div>
          <div className="mt-3">
            <OccupancyBar occupancy={90} status="full" />
            <div className="mt-1.5 flex justify-between text-xs font-medium text-slate-400">
              <span>90% occupied</span>
              <span>Updated just now</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
          Your usual spot — but there's no seat.
        </p>

        <div className="flex-1" />

        <PrimaryButton onClick={onFindBackup}>Find me a backup</PrimaryButton>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Screen 2 — AI backup (the wow moment)
 * ------------------------------------------------------------------ */

function BackupScreen({ onBack, onDirections }) {
  const tags = ['Quiet', 'Power outlets', 'Student-friendly price']
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 px-5 pb-2 pt-6">
        <BackButton onClick={onBack} />
      </header>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">PFood picked for you</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-slate-900">
          A spot that fits you, with room right now
        </h1>

        {/* Highlighted backup card */}
        <div className="mt-5 rounded-3xl border border-brand/15 bg-white p-5 shadow-card ring-1 ring-brand/5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xl font-bold text-slate-900">The Study Nook</p>
              <p className="mt-0.5 text-sm text-slate-500">0.6 km · 5 min walk</p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-xl">
              ☕️
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <StatusDot status="open" />
            <span className="text-sm font-semibold text-status-open">Seats available</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
            <span>🎯</span>
            Matches how you like to study.
          </p>
        </div>

        {/* Coupon */}
        <div className="mt-4">
          <Coupon used={false} />
        </div>

        <div className="flex-1" />

        <PrimaryButton onClick={onDirections}>Get directions</PrimaryButton>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Screen 3 — Directions + coupon redemption
 * ------------------------------------------------------------------ */

function DirectionsScreen({ onBack, onRestart, couponUsed, onUseCoupon }) {
  return (
    <div className="flex h-full flex-col">
      {/* Map placeholder with SVG route */}
      <div className="relative h-64 shrink-0 overflow-hidden bg-[#e8eef2]">
        {/* faux streets */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-20 h-6 w-full bg-white/70" />
          <div className="absolute left-0 top-44 h-4 w-full bg-white/60" />
          <div className="absolute left-16 top-0 h-full w-6 bg-white/70" />
          <div className="absolute left-52 top-0 h-full w-4 bg-white/60" />
          <div className="absolute left-10 top-10 h-16 w-20 rounded-md bg-emerald-200/50" />
          <div className="absolute right-8 bottom-10 h-16 w-24 rounded-md bg-emerald-200/40" />
        </div>

        {/* route */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 256" fill="none" preserveAspectRatio="none">
          <path
            d="M70 210 L70 150 L200 150 L200 70 L290 70"
            stroke="#2563eb"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 12"
          />
          <path
            d="M70 210 L70 150 L200 150 L200 70 L290 70"
            stroke="#2563eb"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
          />
          {/* start pin */}
          <circle cx="70" cy="210" r="9" fill="#fff" stroke="#64748b" strokeWidth="4" />
          {/* destination pin */}
          <g>
            <circle cx="290" cy="70" r="13" fill="#2563eb" />
            <circle cx="290" cy="70" r="5" fill="#fff" />
          </g>
        </svg>

        <div className="absolute left-4 top-4">
          <button
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
          <span>🚶</span>
          <span className="text-sm font-semibold text-slate-800">5 min walk</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h1 className="text-xl font-bold text-slate-900">Walk to The Study Nook</h1>
        <p className="mt-0.5 text-sm text-slate-500">Head down the alley, it's on your right.</p>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Your reward
          </p>
          <Coupon used={couponUsed} onUse={onUseCoupon} />
          {couponUsed && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-status-open">
              <span>✓</span>
              Redemption tracked — this is how PFood proves attribution.
            </p>
          )}
        </div>

        <div className="flex-1" />

        <button
          onClick={onRestart}
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-600 transition active:scale-[0.98] hover:bg-slate-50"
        >
          ↺ Back to start
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Phone frame + screen router
 * ------------------------------------------------------------------ */

const SCREENS = ['nearby', 'venue', 'backup', 'directions']

export default function App() {
  const [screen, setScreen] = useState('nearby')
  const [couponUsed, setCouponUsed] = useState(false)

  const go = (next) => setScreen(next)
  const restart = () => {
    setCouponUsed(false)
    setScreen('nearby')
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4 sm:p-8">
      <div className="flex flex-col items-center">
        {/* Phone */}
        <div className="relative h-[760px] w-[380px] max-w-full overflow-hidden rounded-[2.75rem] border-[10px] border-slate-950 bg-white shadow-phone">
          {/* notch */}
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-6 w-36 -translate-x-1/2 rounded-b-2xl bg-slate-950" />

          {/* status bar */}
          <div className="relative z-10 flex h-9 items-center justify-between px-7 pt-1 text-[11px] font-semibold text-slate-900">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span>📶</span>
              <span>🔋</span>
            </span>
          </div>

          {/* Screen content */}
          <div className="relative h-[calc(100%-2.25rem)] bg-slate-50">
            <div key={screen} className="h-full animate-fade-slide">
              {screen === 'nearby' && (
                <NearbyScreen onSelect={(id) => id === 'goodhouse' && go('venue')} />
              )}
              {screen === 'venue' && (
                <VenueScreen onBack={() => go('nearby')} onFindBackup={() => go('backup')} />
              )}
              {screen === 'backup' && (
                <BackupScreen onBack={() => go('venue')} onDirections={() => go('directions')} />
              )}
              {screen === 'directions' && (
                <DirectionsScreen
                  onBack={() => go('backup')}
                  onRestart={restart}
                  couponUsed={couponUsed}
                  onUseCoupon={() => setCouponUsed(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Progress dots (presenter aid) */}
        <div className="mt-5 flex items-center gap-2">
          {SCREENS.map((s) => (
            <span
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === screen ? 'w-6 bg-brand' : 'w-1.5 bg-slate-600'
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">PFood — demo prototype</p>
      </div>
    </div>
  )
}
