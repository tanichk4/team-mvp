import { Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Plus, Pencil, Crown, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';

const settingsRows = [
  { Icon: Settings, label: 'Discovery Settings', sub: 'Distance, age, who to show' },
  { Icon: Bell, label: 'Notifications', sub: 'Push, email, matches' },
  { Icon: Shield, label: 'Privacy & Safety', sub: 'Block, hide, report' },
  { Icon: HelpCircle, label: 'Help & Support', sub: 'FAQ, contact us' },
];

function GradientIconCircle({ Icon, size = 40 }) {
  const id = `profile-icon-grad-${Icon.displayName || size}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        background: 'var(--color-bg-secondary)',
      }}
    >
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-primary)" />
            <stop offset="100%" stopColor="var(--color-brand-secondary)" />
          </linearGradient>
        </defs>
      </svg>
      <Icon size={20} strokeWidth={1.75} style={{ stroke: `url(#${id})` }} fill="none" />
    </div>
  );
}

function SectionHeader({ children }) {
  return (
    <h3
      className="font-bold uppercase mb-2 px-1"
      style={{
        fontSize: 'var(--font-size-xs)',
        letterSpacing: 'var(--letter-spacing-wider)',
        color: 'var(--color-text-tertiary)',
      }}
    >
      {children}
    </h3>
  );
}

export default function Profile() {
  const { me } = useApp();

  return (
    <div className="w-full max-w-2xl mx-auto pb-6">
      {/* Hero */}
      <div className="relative w-full aspect-[4/5] md:aspect-[16/9] md:rounded-b-3xl overflow-hidden">
        <Avatar
          src={me.photo}
          name={me.name}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <button
          aria-label="Edit profile"
          className="absolute top-4 right-4 rounded-full flex items-center justify-center text-white"
          style={{
            width: 44,
            height: 44,
            background: 'var(--gradient-brand)',
            boxShadow: 'var(--shadow-action-btn)',
          }}
        >
          <Pencil size={18} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-bold">{me.name}</h1>
            <span className="text-2xl font-light">{me.age}</span>
          </div>
          <p className="text-sm text-white/85 mt-1">{me.bio}</p>
        </div>
      </div>

      <div className="mx-4 mt-5 flex flex-wrap gap-2">
        {[me.distance, `${me.age}`, me.job].map((label) => (
          <span
            key={label}
            className="font-medium"
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: 'var(--font-size-sm)',
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-primary)',
            }}
          >
            {label}
          </span>
        ))}
      </div>

      <button
        className="mx-4 mt-3 font-bold flex items-center justify-center gap-2"
        style={{
          height: 44,
          padding: '0 20px',
          borderRadius: 'var(--radius-pill)',
          fontSize: 'var(--font-size-sm)',
          letterSpacing: 'var(--letter-spacing-wide)',
          border: '1.5px solid var(--color-brand-primary)',
          color: 'var(--color-brand-primary)',
          background: 'transparent',
        }}
      >
        Edit profile
      </button>

      <div
        className="mx-4 mt-5 p-4"
        style={{
          backgroundColor: 'var(--color-surface-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-[14px]">Profile completeness</p>
          <span className="text-[14px] font-bold text-tinder-pink">{me.completeness}%</span>
        </div>
        <div
          className="w-full overflow-hidden"
          style={{
            height: 8,
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--color-bg-tertiary)',
          }}
        >
          <div
            className="h-full bg-tinder-gradient rounded-full"
            style={{ width: `${me.completeness}%` }}
          />
        </div>
        <p
          className="mt-2"
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          Add 2 more photos to reach 100%
        </p>
      </div>

      <div
        className="relative overflow-hidden mx-4 mt-5 p-5 flex items-center gap-4"
        style={{
          borderRadius: 'var(--radius-lg)',
          background: 'var(--gradient-gold)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Crown size={24} className="text-white" fill="white" />
        </div>
        <div className="flex-1 text-white">
          <p className="font-bold" style={{ fontSize: 'var(--font-size-base)' }}>
            Upgrade to Tinder Gold
          </p>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.92)' }}>
            See who likes you, unlimited likes & more
          </p>
        </div>
        <button
          className="font-bold"
          style={{
            background: 'white',
            color: 'var(--color-gold-dark)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-pill)',
            fontSize: 'var(--font-size-sm)',
            letterSpacing: 'var(--letter-spacing-wide)',
          }}
        >
          Get Gold
        </button>
      </div>

      <section className="mx-4 mt-6">
        <SectionHeader>Media</SectionHeader>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] overflow-hidden"
              style={{
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-tertiary)',
              }}
            >
              <img
                src={`https://picsum.photos/200/300?random=10${i}`}
                alt={`${me.name}'s photo ${i}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden';
                }}
                className="w-full h-full object-cover bg-gradient-to-br from-tinder-pink to-tinder-orange"
              />
            </div>
          ))}
          <button
            className="aspect-[3/4] flex items-center justify-center"
            style={{
              borderRadius: 'var(--radius-md)',
              border: '2px dashed var(--color-brand-primary)',
              color: 'var(--color-brand-primary)',
            }}
          >
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>
      </section>

      <section className="mx-4 mt-6">
        <SectionHeader>Account</SectionHeader>
        <div
          className="overflow-hidden"
          style={{
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {settingsRows.map(({ Icon, label, sub }, i) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-4 text-left"
              style={{
                height: 64,
                borderTop: i !== 0 ? '1px solid var(--color-border-light)' : 'none',
              }}
            >
              <GradientIconCircle Icon={Icon} />
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold"
                  style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {label}
                </p>
                <p
                  className="truncate"
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {sub}
                </p>
              </div>
              <ChevronRight
                size={18}
                strokeWidth={1.5}
                style={{ color: 'var(--color-text-tertiary)' }}
              />
            </button>
          ))}

          <button
            onClick={toggle}
            className="w-full flex items-center gap-3 px-4 text-left"
            style={{
              height: 64,
              borderTop: '1px solid var(--color-border-light)',
            }}
          >
            <GradientIconCircle Icon={Moon} />
            <div className="flex-1 min-w-0">
              <p
                className="font-semibold"
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Dark mode
              </p>
              <p
                className="truncate"
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                {isDark ? 'On' : 'Off'}
              </p>
            </div>
            <span
              className="relative inline-block transition-colors"
              style={{
                width: 44,
                height: 26,
                borderRadius: 'var(--radius-pill)',
                background: isDark
                  ? 'var(--gradient-brand)'
                  : 'var(--color-bg-tertiary)',
              }}
            >
              <span
                className="absolute top-0.5 transition-all rounded-full"
                style={{
                  width: 22,
                  height: 22,
                  background: 'white',
                  left: isDark ? 20 : 2,
                  boxShadow: 'var(--shadow-action-btn)',
                }}
              />
            </span>
          </button>
        </div>
      </section>

      <button
        className="mx-4 mt-5 w-[calc(100%-2rem)] flex items-center justify-center gap-2 font-bold"
        style={{
          height: 52,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--color-surface-card)',
          color: 'var(--color-nope)',
          fontSize: 'var(--font-size-base)',
          letterSpacing: 'var(--letter-spacing-wide)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <LogOut size={18} />
        Log out
      </button>

      <p
        className="text-center mt-6"
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-tertiary)',
        }}
      >
        Tinder UI Clone · v0.0.1
      </p>
    </div>
  );
}
