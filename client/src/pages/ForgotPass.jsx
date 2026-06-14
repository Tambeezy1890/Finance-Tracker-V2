import {
  AlertCircle,
  ArrowLeft,
  KeyRound,
  Loader2,
  Mail,
  MailCheck,
} from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import authService from "../services/api";
import { Link } from "react-router-dom";

function ForgotPass() {
  const [data, setData] = useState({
    email: "",
  });
  const resetPasswordSent = useRef(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { email } = data;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.email.length <= 0) {
      setError("Email is not valid");
      return;
    }
    try {
      setLoading(true);
      const response = await authService.forgotPass(email);
      toast.success("Instructions sent");
      resetPasswordSent.current = true;
      setTimeout(() => {}, 2000);
      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to verify email";
      resetPasswordSent.current = false;
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      {resetPasswordSent.current ? (
        <>
          <div className="max-w-md w-full p-8 relative bg-slate-100 shadow-2xl rounded-2xl ">
            <div className="text-center">
              <div className="inline-flex text-emerald-400 w-16 h-16 bg-emerald-100/50 items-center justify-center rounded-2xl shadow-inner">
                <MailCheck
                  size={40}
                  strokeWidth={1.5}
                  className=" rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-2 my-4 ">
                <h1 className="font-black text-2xl tracking-tight text-slate-800">
                  Check Your Inbox
                </h1>
                <p className="font-medium text-slate-500 leading-relaxed">
                  A password reset link has been sent to <br />{" "}
                  <span className="font-bold underline text-indigo-500">
                    {email}
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-slate-200 w-full p-4 rounded-2xl shadow-inner flex flex-col items-center justify-center">
              <h2 className="text-[12px] tracking-widest uppercase text-slate-400 font-black">
                Safety First
              </h2>
              <p className="font-medium text-[11px] tracking-tight text-slate-500 text-center">
                If you don't see the email chech your{" "}
                <span className="uppercase font-bold text-slate-900">Spam</span>{" "}
                folder <br />
                The link expires in{" "}
                <span className="font-bold text-slate-900">10 minutes</span>
              </p>
            </div>
            <Link
              to="/login"
              className="w-full bg-slate-900 flex justify-center items-center text-white p-4 mt-4 rounded-2xl hover:bg-indigo-700 group text-md active:bg-slate-800"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-0.5 mr-[0.2rem]"
              />{" "}
              Back to Login
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-md w-full py-8 relative">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100 mb-6">
                <KeyRound size={32} strokeWidth={2.5} />
              </div>
              <h2 className="font-black text-slate-900 text-3xl tracking-tight">
                Reset Password
              </h2>
              <p className="mt-2 font-medium text-slate-500">
                Enter your email we'll send you recovery steps
              </p>
            </div>
            <div className="bg-white w-full shadow-lg shadow-slate-300 border border-slate-50 rounded-2xl p-8 mt-2">
              <div>
                {error && (
                  <div className="mb-6 flex items-center gap-2 p-4 bg-rose-50 border border-rose-100">
                    <AlertCircle size={18} className="shrink-0" />
                    <p className="text-[10px] font-black uppercase tracking-wide">
                      {error}
                    </p>
                  </div>
                )}
                <label className="block  text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">
                  Account Email
                </label>

                <div className="relative group">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="name@agency.com"
                    className=" w-full pl-11 pr-4 py-4 bg-slate-50 border
                        border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 focus:bg-white outline-none  transition-all"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="text-center ">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center mt-8 bg-slate-900 w-full p-4 text-white rounded-2xl active:bg-slate-800 hover:bg-indigo-700 transition-all disabled:opacity-70 font-medium tracking-tight shadow-md shadow-slate-300 outline-none disabled:cursor-not-allowed disabled:pointer-events-none"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> Sending
                      instructions
                    </>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
              <Link
                className="inline-flex items-center justify-center w-full mt-4 group transition-all duration-700 "
                to="/login"
              >
                <ArrowLeft
                  size={20}
                  strokeWidth={1.5}
                  className="group-hover:-translate-x-1 group-hover:text-indigo-400"
                />
                <p className="font-medium text-[11px] tracking-widest cursor-pointer group-hover:text-indigo-400 ">
                  Return to login
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default ForgotPass;
