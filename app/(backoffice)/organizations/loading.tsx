"use client"

export default function OrganizationsLoading() {
  return (
    <div className="px-12 pt-10 max-w-[1360px] mx-auto">
      
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 w-52 rounded-lg 
                        bg-white/20 dark:bg-white/10 
                        backdrop-blur-sm animate-pulse" />

        <div className="h-10 w-36 rounded-xl 
                        bg-white/20 dark:bg-white/10 
                        backdrop-blur-sm animate-pulse" />
      </div>

      <div
        className="
          border border-black/5 dark:border-white/10
          rounded-2xl overflow-hidden
          bg-white/60 dark:bg-white/5
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          backdrop-blur-md
        "
      >
        <div className="p-6 space-y-5">

          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="
                grid grid-cols-12 gap-4 items-center
                py-3 border-b last:border-none
                border-black/5 dark:border-white/5
              "
            >
              <div className="col-span-4 h-5 rounded-md 
                              bg-white/30 dark:bg-white/10 
                              animate-pulse" />

              <div className="col-span-3 h-5 rounded-md 
                              bg-white/25 dark:bg-white/10 
                              animate-pulse" />

              <div className="col-span-2 h-5 rounded-full 
                              bg-white/25 dark:bg-white/10 
                              animate-pulse" />

              <div className="col-span-2 h-5 rounded-full 
                              bg-white/20 dark:bg-white/10 
                              animate-pulse" />

              <div className="col-span-1 h-5 rounded-md 
                              bg-white/20 dark:bg-white/10 
                              animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
