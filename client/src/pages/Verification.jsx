import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, replace, useNavigate, useParams } from "react-router-dom";
import authService from "../services/api";
import toast from "react-hot-toast";

function Verification() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying");

  const verificationStarted = useRef(false);

  useEffect(() => {
    if (verificationStarted.current) return;

    verificationStarted.current = true;
    const verify = async () => {
      try {
        const response = await authService.verify(token);
        setStatus("success");
        toast.success(response.message || "Identity confirmed");
        setTimeout(() => navigate("/login", { replace: true }), 3000);
      } catch (err) {
        setStatus("Error");
        toast.error(err.response?.data?.message || "Failed to verify email");
      }
    };
    verify();
  }, [token, navigate]);
  return (
    <div className="min-h-screen flex justify-center col-end-1 bg-[#f8fafc] px-4 py-8">
      <div className="max-w-md w-full">
        <div
          className="bg-white rounded-[2.5rem] border shadow-sm border-slate-200 
      p-10 text-center relative overflow-hidden "
        >
          {/* conditional rendering */}
          {/* verifing */}
          {status === "Verifying" && (
            <div className="flex flex-col items-center justify-center">
              <div className=" mb-8">
                <div className=" bg-indigo-100 opacity-25 rounded-3xl">
                  <div
                    className="relative w-20 h-20 bg-indigo-200 rounded-3xl flex items-center
              justify-center text-indigo-600 shadow-inner"
                  >
                    <Loader2
                      size={40}
                      strokeWidth={1.5}
                      className="animate-spin"
                    />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">
                Verifying
              </h2>
              <p className="text-slate-400 text-xs font-medium leading-relaxed italic">
                Syncing with the control node <br /> to finalize your secure
                access
              </p>
            </div>
          )}

          {/* conditional close */}
          {/* conditional rendering */}
          {/* Access granted */}

          {status === "success" && (
            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center
                            justify-center mb-8 text-emerald-500 shadow-inner 
                            ring-4 ring-emerald-50/50 "
              >
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>
              <h2 className="font-medium text-slate-500 mb-2 uppercase tracking-tight">
                Active
              </h2>
              <p className="font-medium mb-8 text-slate-500 leading-relaxed">
                Identity confirmed. Access Granted <br /> Fowarding to the login
                terminal...
              </p>
              <div className="w-full bg-slate-50 rounded-2xl p-4 flex items-center justify-center gap-3 border border-slate-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-black text-slate-400 tracking-[0.2rem] uppercase">
                  Redirecting to vault
                </span>
              </div>
            </div>
          )}

          {/* stat erro invalid token */}
          {status === "Error" && (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mb-8 text-rose-600 shadow-inner">
                <XCircle size={40} strokeWidth={1.5} />
              </div>
              <h2 className="font-black text-slate-900 tracking-tight text-3xl mb-2 uppercase">
                Access Denied
              </h2>

              <p className="font-medium text-slate-500 mb-8 leading-relaxed italic">
                This verification token is invalid <br /> or has already expired
              </p>
              <div className=" group flex justify-center items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center mt-4 text-sm font-medium text-slate-500 hover:text-indigo-500 tracking-widest group"
                >
                  Return to login
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform translate-y-px"
                  />
                </Link>
              </div>
            </div>
          )}
          {/* End of the container*/}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 opacity-60">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2rem]">
            Auth lab &middot; Secure Handshake
          </span>
        </div>
      </div>
    </div>
  );
}
export default Verification;
