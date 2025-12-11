export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-1">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary-blue/20" />
          <div className="absolute inset-0 rounded-full border-4 border-primary-blue border-t-transparent animate-spin" />
        </div>
        <p className="text-text-secondary text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}
