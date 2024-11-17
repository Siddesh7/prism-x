"use client";
import React from "react";
import {Button} from "./ui/button";
import {useChainId, useSwitchChain} from "wagmi";

const SwitchChain = () => {
  const {switchChain} = useSwitchChain();
  const chainId = useChainId();
  console.log(chainId);
  return (
    <>
      {chainId !== 2810 ? (
        <Button
          onClick={() => {
            switchChain({
              chainId: 2810,
            });
          }}
        >
          Switch to Morph
        </Button>
      ) : (
        <Button
          onClick={() => {
            switchChain({
              chainId: 13331370345,
            });
          }}
        >
          Switch to Prism
        </Button>
      )}
    </>
  );
};

export default SwitchChain;
