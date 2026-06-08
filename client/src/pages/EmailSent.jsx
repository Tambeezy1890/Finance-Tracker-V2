import {
  ArrowLeft,
  CheckCircle2,
  DivideCircle,
  Loader2,
  MailQuestionMark,
  RefreshCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, Link } from "react-router-dom";
import authService from "../services/api";

function EmailSent() {
  const location = useLocation();
  const email = location.state?.email || "your registered email";
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!location.state?.email) {
      toast.error("Security session expired. Please re-register");
      return;
    }
    setIsResending(true);
    try {
      const response = await authService.resend(email);
      toast.success("Security token re-dispatched");
      setCountdown(60);
      console.log(response);
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Rate limit reached");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center bg-[#f8f8fc]">
      <div className="max-w-md w-full bg-indigo-50 shadow-2xl p-8  rounded-2xl">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-indigo-50/50 text-indigo-500 rounded-3xl group shadow-indigo-50 shadow-xl">
            <MailQuestionMark
              size={40}
              strokeWidth={1.5}
              className="group-hover:scale-[1.2] transition-all duration-400"
            />
          </div>
          <div className="flex flex-col items-center py-8">
            <h1 className="font-black text-2xl text-slate-900  uppercase">
              Verify Identity
            </h1>
            <p className="text-center font-medium text-sm text-slate-800 uppercase py-2 tracking-tight">
              A verification email was sent <br />
              click on{" "}
              <span className="text-indigo-800 cursor-pointer hover:scale-[0.90] underline">
                {email}
              </span>{" "}
              to verify your account
            </p>

            <div>
              <div className="flex gap-8 bg-indigo-100/50 rounded-3xl mt-4 py-4 ">
                <CheckCircle2 size={60} className="text-emerald-300 pl-4 " />
                <p className="text-slate-700 uppercase font-medium text-xs tracking-tight">
                  Action required: Access your inbox <br />
                  and initialize the security link to <br />
                  activate your node. Check your spam if not visible in 60
                  seconds
                </p>
              </div>
            </div>
            <button
              className="w-full bg-indigo-500 p-2 mt-4 rounded-3xl text-white hover:bg-indigo-500/90 active:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleResend()}
              disabled={isResending || countdown > 0}
            >
              {isResending ? (
                <div className="inline-flex items-center justify-center">
                  <Loader2 className="animate-spin mx-auto" size={18} />
                  Sending....
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <RefreshCcw
                    size={18}
                    className={countdown > 0 ? "opacity-5" : ""}
                  />
                  {countdown > 0
                    ? ` Resend again in.....${countdown}`
                    : "Resend Verification Email"}
                </div>
              )}
            </button>
            <Link
              to="/login"
              className="inline-flex items-center mt-4 text-sm font-medium text-slate-500 hover:text-indigo-500 tracking-widest group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSent;
