"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/lib/redux/reducers/userSlice";
import { useRouter } from "next/navigation";
import { Auth } from "@/components";
import { RootState } from "@/lib/redux/store";

export default function Home() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((store: RootState) => store.user.user);

  useEffect(() => {
    if (!user.name && session?.user) {
      router.push("/messages");
    }
    if (session?.user?.name) {
      dispatch(setUser(session?.user));
    }
  }, [session?.user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Auth />
    </div>
  );
}
