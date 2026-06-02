import Navbar from "../components/NavBar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-10">
        {/* Welcome */}
        <div className="flex flex-col mb-10 md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Welcome, User name
            </h1>
            <p className="mt-1 text-slate-500 font-medium">
              Realtime security oversight and profile management
            </p>
          </div>
          <div className="text-[10px] font-black text-slate-400 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-400 uppercase tracking-widest">
            Identity Node: {}
            Admin
          </div>
        </div>
        {/* Verification alret */}
        {/* Conditional rendering */}
        <div className="mb-8 bg-amber-50 border"></div>
      </div>
    </div>
  );
}
export default Dashboard;
