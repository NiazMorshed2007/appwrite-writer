"use client";
import { getSession } from "@/lib/services/auth.service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (!session) {
          router.push("/login");
          localStorage.clear();
          setAuth(false);
        }
        setAuth(true);
      } catch (error) {
        router.push("/login");
      }
    };

    checkSession();
  }, []);
  return (
    <>
      {!auth ? (
        <div className="w-screen  h-[calc(100vh-7vh)] flex items-center justify-center">
          <Loader2 size={24} className="animate-spin" />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ProtectedLayout;
