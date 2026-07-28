import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppShell } from "../components/AppShell";
import { MarketingBackdrop } from "../components/MarketingBackdrop";
import { MarketingNav } from "../components/MarketingNav";
import { Toaster } from "../components/ui/sonner";


function NotFoundComponent() {
  return (
    <AppShell>
      <div className="glass mx-auto max-w-md rounded-3xl p-10 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This page isn't part of the FYNORA console.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go to Dashboard
        </Link>
      </div>
    </AppShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <AppShell>
      <div className="glass mx-auto max-w-md rounded-3xl p-10 text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-xl border border-black/[0.09] bg-black/[0.04] px-4 py-2 text-sm font-medium"
          >
            Home
          </a>
        </div>
      </div>
    </AppShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FYNORA — The Future of School Fee Management" },
      {
        name: "description",
        content:
          "Eliminate chaotic spreadsheets. Automate collections, offer smart EMI splits, and reconcile payments instantly with our modern FinTech suite for schools.",
      },
      { property: "og:title", content: "FYNORA — The Future of School Fee Management" },
      { property: "og:description", content: "Eliminate chaotic spreadsheets. Automate collections, offer smart EMI splits, and reconcile payments instantly with our modern FinTech suite for schools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FYNORA — The Future of School Fee Management" },
      { name: "twitter:description", content: "Eliminate chaotic spreadsheets. Automate collections, offer smart EMI splits, and reconcile payments instantly with our modern FinTech suite for schools." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ec653b9b-ae90-4257-bca3-11e873fc47dc/id-preview-6732ab38--67e09847-7766-4954-bd75-25d54b35d67c.lovable.app-1784926991446.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ec653b9b-ae90-4257-bca3-11e873fc47dc/id-preview-6732ab38--67e09847-7766-4954-bd75-25d54b35d67c.lovable.app-1784926991446.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isMarketing = pathname === "/";
  const isStandalone = pathname.startsWith("/controller");

  if (isStandalone) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster position="bottom-right" richColors closeButton />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {isMarketing ? (
        <>
          <MarketingBackdrop />
          <MarketingNav />
          <Outlet />
        </>
      ) : (
        <AppShell>
          <Outlet />
        </AppShell>
      )}
      <Toaster position="bottom-right" richColors closeButton />
    </QueryClientProvider>


  );
}
