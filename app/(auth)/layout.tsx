"use client";

import { getSession } from "@/lib/services/auth.service";
import { Loader2 } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const router: AppRouterInstance = useRouter();
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async (): Promise<void> => {
      try {
        const session: any = await getSession();
        if (session) {
          setAuth(true);
          router.replace("/space");
        } else {
          setAuth(false);
        }
      } catch (error: any) {
        console.error("Error checking session:", error);
        setAuth(false);
      } finally {
      }
    };

    checkSession();
  }, []);

  return (
    <>
      <main
        className={`${inter.className} w-screen min-h-[calc(100vh-10vh)] flex items-center justify-center`}
      >
        {!auth ? (
          <>{children}</>
        ) : (
          <>
            <Loader2 size={24} className="animate-spin" />
          </>
        )}
      </main>
    </>
  );
};

export default AuthLayout;
