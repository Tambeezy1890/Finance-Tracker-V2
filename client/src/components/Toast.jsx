function Toast({ message }) {
  return (
    <>
      <div
        className="fixed
        top-5
        right-5
        w-[350px]
        p-4
        rounded-2xl

        bg-[rgba(79,70,229,0.4)]
        backdrop-blur-lg

        border
        border-white/20

        shadow-2xl
        text-white"
      >
        <h3 className="text-xl font-bold text-center"></h3>
      </div>
    </>
  );
}
export default Toast;
