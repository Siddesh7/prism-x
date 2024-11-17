import {
  MORPH_PREDICTION_MARKET_ADDRESS,
  MORPH_USDC_ADDRESS,
  PREDICTION_MARKET_ADDRESS,
  USDC_ADDRESS,
} from "@/constants";
import React, {useEffect, useState} from "react";
import {erc20Abi, parseEther} from "viem";
import {
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {Button} from "./button";

const ApproveButton = ({onSuccess}: {onSuccess: (success: any) => void}) => {
  const [hash, setHash] = useState<any>();
  const {writeContractAsync} = useWriteContract();
  const {data, isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash,
  });
  const chainid = useChainId();

  const approveHandler = async () => {
    console.log({
      abi: erc20Abi,
      functionName: "approve",
      args: [
        chainid === 2810
          ? MORPH_PREDICTION_MARKET_ADDRESS
          : PREDICTION_MARKET_ADDRESS,
        parseEther("100000000000000000000000"),
      ],
      address: chainid === 2810 ? MORPH_USDC_ADDRESS : USDC_ADDRESS,
    });
    const hash = await writeContractAsync({
      abi: erc20Abi,
      functionName: "approve",
      args: [
        chainid === 2810
          ? MORPH_PREDICTION_MARKET_ADDRESS
          : PREDICTION_MARKET_ADDRESS,
        parseEther("100000000000000000000000"),
      ],
      address: chainid === 2810 ? MORPH_USDC_ADDRESS : USDC_ADDRESS,
    });
    setHash(hash);
  };

  useEffect(() => {
    if (isSuccess) {
      onSuccess(data);
    }
  }, [isSuccess]);

  return (
    <div>
      <Button
        onClick={approveHandler}
        disabled={isLoading}
        className="px-4 py-2 w-full rounded disabled:opacity-50"
      >
        {isLoading ? "Approving..." : "Approve"}
      </Button>
    </div>
  );
};

export default ApproveButton;
