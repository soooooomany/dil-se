export default function ProductsLoading() {
  return (
    <div className="space-y-8 pb-10">
      <div className="grid gap-10">
        <div className="flex flex-col gap-4">
          <div className="skeleton h-10 w-28" />
          <div className="skeleton h-4 w-48" />
        </div>
        <div className="mx-auto grid w-full max-w-screen-2xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="group relative rounded-lg border">
              <div className="skeleton aspect-square rounded-t-lg" />
              <div className="p-4">
                <div className="skeleton mb-2 h-4 w-2/3" />
                <div className="skeleton h-4 w-full" />
                <div className="mt-4 flex items-center justify-between">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-8 w-8 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}