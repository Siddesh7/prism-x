import React from "react";
import {usePrivy} from "@privy-io/react-auth";
import Header from "./header";
import MainApp from "./main-app";
import Hero from "./hero";

const Mobile = () => {
  const {authenticated, ready} = usePrivy();
  return (
    <div className="flex flex-col h-[100vh] w-screen overflow-hidden md:hidden">
      <Header />
      {authenticated && ready ? <MainApp /> : <Hero />}
      {!ready && (
        <div className="inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-2xl">
          <div className="w-8 h-8 bg-primary animate-ping rounded-full" />
        </div>
      )}
    </div>
  );
};

export default Mobile;
