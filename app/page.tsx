"use client";

import BigScreenPrompt from "@/components/big-screen-prompt";
import Mobile from "@/components/mobile";
import {usePrivy} from "@privy-io/react-auth";

export default function Home() {
  const {login, logout, ready, authenticated} = usePrivy();
  return (
    <main className="max-h-screen overflow-hidden">
      <BigScreenPrompt />
      <Mobile />
    </main>
  );
}
