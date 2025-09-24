// app/professionals/loading.tsx
export default function Loading() {
  // This file makes Next wrap the whole /professionals segment in <Suspense>
  return (
    <div className="p-6 text-sm text-gray-500">
      Loading professionals…
    </div>
  );
}
