import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { signOut } from "next-auth/react";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="min-h-screen">
      <main className="w-12/12 mx-auto flex flex-col p-2 md:w-8/12 md:p-4 xl:w-10/12">
        <div className="radius flex flex-col items-center gap-2 border p-4">
          <h1 className="text-lg">Home - Not protected</h1>
          <p>
            {session ? "You are authenticated" : "You are not authenticated"}
          </p>
          {session && (
            <div className="flex flex-row gap-2">
              <Link href={"/dashboard"} className="rounded border px-4 py-1">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded border px-4 py-1"
              >
                Logout
              </button>
            </div>
          )}

          {!session && (
            <div className="flex flex-row gap-2">
              <Link href={"/login"} className="rounded border px-4 py-1">
                Login
              </Link>
              <Link href={"/register"} className="rounded border px-4 py-1">
                Register
              </Link>
            </div>
          )}
          <p>{"Hello T3 Stack..."}</p>
        </div>
      </main>
    </div>
  );
}
