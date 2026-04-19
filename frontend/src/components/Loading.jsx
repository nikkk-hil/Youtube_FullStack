const Loading = ({
  message = "Fetching your page...",
  fullScreen = true,
  className = "",
}) => {
  const wrapperClass = fullScreen
    ? "min-h-screen w-full"
    : "w-full";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${wrapperClass} flex items-center justify-center bg-zinc-950 text-zinc-100 ${className}`}
    >
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/80 px-8 py-6 shadow-lg">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500" />
        <p className="text-sm tracking-wide text-zinc-300">{message}</p>
      </div>
    </div>
  );
};

export default Loading;