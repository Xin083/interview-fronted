"use client";
import { useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AuthSessionPage() {
  const router = useRouter();
  useEffect(() => {
    // 检查 session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/signin?next=/auth/session");
      } else {
        const accessToken = session.access_token;
        const refresh_token = session.refresh_token; // 推荐
        window.location.href = `interviewcoder://login?t=${accessToken}&r=${refresh_token}`;
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <img src="/logo.svg" alt="Interview Coder" width={96} height={96} className="mb-8 rounded-full shadow-lg" />
      <h2 className="text-4xl font-bold text-white mb-4 text-center">Success!</h2>
      <p className="text-lg text-white mb-2 text-center">
        Authorization was successful.<br />
        You will be redirected back to Interview Coder.
      </p>
      <p className="text-gray-400 mb-6 text-center">
        You can now close this window.<br />
        If you are not redirected automatically,
        <a
          href="#"
          className="text-yellow-400 underline"
          onClick={async (e) => {
            e.preventDefault();
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
              const accessToken = session.access_token;
              const refresh_token = session.refresh_token; // 或你需要的其他值
              window.location.href = `interviewcoder://login?t=${accessToken}&r=${refresh_token}`;
            }
          }}
        >
          click here
        </a>
      </p>
      <Link href="/" className="px-6 py-2 rounded-xl bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-300 transition">
        Back to Home
      </Link>
    </div>
  );
}
