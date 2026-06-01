import {
  CheckCircle2,
  DivideCircle,
  Loader2,
  MailQuestionMark,
} from "lucide-react";

function EmailSent() {
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
                email
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
            <button className="w-full bg-indigo-500 p-2 mt-4 rounded-3xl text-white hover:bg-indigo-500/90 active:bg-indigo-500 ">
              <Loader2 className="animate-spin mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSent;
