export function MarketingBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-black">
      <div className="absolute -top-40 -left-40 h-[620px] w-[620px] rounded-full bg-[#00a657] opacity-[0.14] blur-[180px] dark:opacity-[0.10]" />
      <div className="absolute top-1/4 -right-40 h-[660px] w-[660px] rounded-full bg-[oklch(0.6_0.12_220)] opacity-[0.12] blur-[200px] dark:opacity-[0.08]" />
      <div className="absolute bottom-[-220px] left-1/3 h-[620px] w-[620px] rounded-full bg-[oklch(0.55_0.12_300)] opacity-[0.10] blur-[200px] dark:opacity-[0.07]" />
      <div className="absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a657] opacity-[0.10] blur-[160px] dark:opacity-[0.08]" />
    </div>
  );
}
