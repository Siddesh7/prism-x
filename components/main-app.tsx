import React from "react";
import MenuBar from "./menubar";
import Bets from "./bets";

const MainApp = () => {
  return (
    <div className="relative flex flex-col-1 flex-1 w-full h-full overflow-hidden">
      <div className="flex flex-1 w-full max-h-[80vh]">
        <Bets />
      </div>

      <MenuBar />
    </div>
  );
};

export default MainApp;
