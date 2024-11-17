import {
  MORPH_PREDICTION_MARKET_ADDRESS,
  PREDICTION_MARKET_ADDRESS,
} from "@/constants";
import React, {useEffect, useState} from "react";
import {parseUnits} from "viem";
import {
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import PREDICTION_MARKET_ABI from "@/constants/abi.json";
import {baseSepolia} from "viem/chains";
import {Button} from "./button";

const DepositButton = ({
  amount,
  onError,
  onSuccess,
}: {
  amount: string;
  onSuccess: (success: any) => void;
  onError: (error: any) => void;
}) => {
  const [hash, setHash] = useState<any>("");
  const {writeContractAsync} = useWriteContract();
  const {data, isSuccess, isLoading, isError} = useWaitForTransactionReceipt({
    hash,
  });
  const chainid = useChainId();

  const depositHandler = async () => {
    try {
      const parsedAmount = parseUnits(amount, 18);
      const hash = await writeContractAsync({
        abi: PREDICTION_MARKET_ABI,
        functionName: "deposit",
        args: [parsedAmount],
        address:
          chainid === 2810
            ? MORPH_PREDICTION_MARKET_ADDRESS
            : PREDICTION_MARKET_ADDRESS,
        chain: baseSepolia,
      });

      setHash(hash);
    } catch (error) {
      onError(error);
    }
  };

  useEffect(() => {
    if (isError) {
      onError(data);
    }
    if (isSuccess) {
      onSuccess(data);
    }
  }, [data, isSuccess, isError, onSuccess, onError]);

  return (
    <div className="w-full">
      <Button
        onClick={depositHandler}
        disabled={isLoading}
        className="px-4 py-2 w-full rounded disabled:opacity-50"
      >
        {isLoading ? "Depositing..." : "Deposit"}
      </Button>
    </div>
  );
};

export default DepositButton;
