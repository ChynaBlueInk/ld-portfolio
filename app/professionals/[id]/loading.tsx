// app/professionals/[id]/loading.tsx
export default function Loading() {
  // Provides a Suspense boundary for the dynamic [id] page,
  // satisfying Next’s router hook requirement.
  return (
    <div className="p-6 text-sm text-gray-500">
      Loading profile…
    </div>
  );
}
