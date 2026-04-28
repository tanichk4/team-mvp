import { Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Plus, Pencil } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';

const settingsRows = [
  { Icon: Settings, label: 'Discovery Settings', sub: 'Distance, age, who to show' },
  { Icon: Bell, label: 'Notifications', sub: 'Push, email, matches' },
  { Icon: Shield, label: 'Privacy & Safety', sub: 'Block, hide, report' },
  { Icon: HelpCircle, label: 'Help & Support', sub: 'FAQ, contact us' },
];

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
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow"
        >
          <Pencil size={18} className="text-tinder-text" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-bold">{me.name}</h1>
            <span className="text-2xl font-light">{me.age}</span>
          </div>
          <p className="text-sm text-white/85 mt-1">{me.bio}</p>
        </div>
      </div>

      {/* Completeness bar */}
      <div className="mx-4 mt-5 p-4 bg-white rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-[14px]">Profile completeness</p>
          <span className="text-[14px] font-bold text-tinder-pink">{me.completeness}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-tinder-gradient rounded-full"
            style={{ width: `${me.completeness}%` }}
          />
        </div>
        <p className="text-[12px] text-tinder-muted mt-2">
          Add 2 more photos to reach 100%
        </p>
      </div>

      {/* Add Media */}
      <section className="mx-4 mt-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-tinder-muted mb-2">Media</h3>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
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
          <button className="aspect-[3/4] rounded-xl border-2 border-dashed border-tinder-pink flex items-center justify-center text-tinder-pink">
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* Settings */}
      <section className="mx-4 mt-6 bg-white rounded-2xl overflow-hidden shadow-sm">
        {settingsRows.map(({ Icon, label, sub }, i) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${
              i !== 0 ? 'border-t border-gray-100' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-tinder-text" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[15px]">{label}</p>
              <p className="text-[12px] text-tinder-muted truncate">{sub}</p>
            </div>
            <ChevronRight size={18} className="text-tinder-muted shrink-0" />
          </button>
        ))}
      </section>

      {/* Logout */}
      <button className="mx-4 mt-5 w-[calc(100%-2rem)] flex items-center justify-center gap-2 py-3.5 rounded-full bg-white text-tinder-pink font-semibold text-[15px] shadow-sm">
        <LogOut size={18} />
        Log out
      </button>

      <p className="text-center text-[11px] text-tinder-muted mt-6">
        Tinder UI Clone · v0.0.1
      </p>
    </div>
  );
}
