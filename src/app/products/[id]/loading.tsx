export default function ProductLoading() {
  return (
    <div className="container relative mx-auto max-w-screen-2xl space-y-8 px-2 py-10 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <div className="w-full md:w-1/2">
          <div className="skeleton aspect-square" />
        </div>
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="skeleton h-10 w-2/3" />
          <div className="space-y-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-4/5" />
            <div className="skeleton h-4 w-3/4" />
          </div>
          <div className="skeleton h-8 w-28" />
          <div className="skeleton h-10 w-full" />
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-screen-2xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
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
  )
}