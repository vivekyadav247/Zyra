import { lazy, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Providers } from "./providers";

export function App() {
  return (
    <Providers>
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading…</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Providers>
  );
}
