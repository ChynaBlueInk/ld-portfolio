// app/professionals/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1 style={{ margin: 0 }}>Professionals</h1>
      <p style={{ color: "#555" }}>
        Temporary placeholder to unblock deploys. (No client hooks here.)
      </p>
    </div>
  );
}
