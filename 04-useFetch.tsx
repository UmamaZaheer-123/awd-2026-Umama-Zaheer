/**
 * PRACTICE PROBLEM 4
 * Build a typed useFetch<T>(url: string) custom hook returning
 * { data: T | null, loading: boolean }.
 *
 * This file is .tsx because it uses React/JSX (an example component
 * at the bottom shows the hook being used).
 */

import { useEffect, useState } from "react";

// 1. Describe the shape of what the hook returns.
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 2. `T` is supplied by the caller, e.g. useFetch<User>(url), so `data`
//    comes back fully typed instead of `any`.
function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const json: T = await response.json();
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    // Cleanup: avoid setting state if the component unmounts (or url
    // changes) before the request finishes.
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// ---- example usage ----
interface Post {
  id: number;
  title: string;
  body: string;
}

function PostView({ postId }: { postId: number }) {
  const { data, loading, error } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <article>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </article>
  );
}

export { useFetch, PostView };
export type { UseFetchResult };
