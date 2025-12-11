export default function CreateOrganizationLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="h-8 w-64 bg-surface animate-pulse rounded" />

      <div className="space-y-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-4 border border-border-color rounded-2xl p-6">
            <div className="h-6 w-48 bg-surface animate-pulse rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-surface animate-pulse rounded-lg" />
              <div className="h-12 bg-surface animate-pulse rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
