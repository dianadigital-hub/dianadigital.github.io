import { useState, useEffect, createContext, useContext, ReactNode } from "react";

export type RoutePath = "/" | "/angebote" | "/projekte" | "/ueber-mich" | "/kontakt";

interface RouterContextType {
  path: RoutePath;
  params: URLSearchParams;
  navigate: (to: RoutePath, params?: Record<string, string>, anchor?: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: "/",
  params: new URLSearchParams(),
  navigate: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const parseLocation = (): { path: RoutePath; params: URLSearchParams } => {
    // Expected format: #/angebote?topic=test#top
    const raw = window.location.hash.replace(/^#/, "") || "/";
    const [pathAndQuery] = raw.split("#");
    const [pathname, queryString] = pathAndQuery.split("?");

    const validRoutes: RoutePath[] = ["/", "/angebote", "/projekte", "/ueber-mich", "/kontakt"];
    const matched = validRoutes.includes(pathname as RoutePath) ? (pathname as RoutePath) : "/";
    const searchParams = new URLSearchParams(queryString || "");

    return { path: matched, params: searchParams };
  };

  const [current, setCurrent] = useState<{ path: RoutePath; params: URLSearchParams }>(parseLocation);

  useEffect(() => {
    const handleHashChange = () => {
      const next = parseLocation();
      setCurrent(next);
      // Beim Wechsel der Route an den Seitenanfang scrollen
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (to: RoutePath, queryParams?: Record<string, string>, anchor?: string) => {
    let hash = to;
    if (queryParams && Object.keys(queryParams).length > 0) {
      const q = new URLSearchParams(queryParams).toString();
      hash += `?${q}`;
    }
    if (anchor) {
      hash += `#${anchor}`;
    }
    window.location.hash = hash;
  };

  return (
    <RouterContext.Provider value={{ path: current.path, params: current.params, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRoute() {
  return useContext(RouterContext);
}
