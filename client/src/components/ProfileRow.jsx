function ProfileRow({ label, value, icon, badge }) {
  return (
    <div
      className="flex items-center justify-between 
            py-5 border-b border-slate-50 last:border-0"
    >
      <div className="flex items-center gap-4">
        <div className="text-slate-300">{icon}</div>
        <span className="text-sm font-black uppercase tracking-tight text-slate-4 00">
          {label}
        </span>
      </div>
      <span
        className={`text-sm font-black px-4 py-1.5 rounded-xl ${badge || "text-slate-900 bg-slate"}`}
      >
        {value}
      </span>
    </div>
  );
}
export default ProfileRow;
