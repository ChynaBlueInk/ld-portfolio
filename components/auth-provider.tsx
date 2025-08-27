"use client";

import * as React from "react";

// If you later use next-auth, wrap children with SessionProvider here.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



