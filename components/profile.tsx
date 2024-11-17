import React, {useEffect, useState} from "react";
import {useAccount, useChainId, useReadContract} from "wagmi";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

import {Button} from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {User} from "lucide-react";
import {
  PREDICTION_MARKET_ADDRESS,
  MORPH_PREDICTION_MARKET_ADDRESS,
} from "@/constants";
import PREDICTION_MARKET_ABI from "@/constants/abi.json";
import Balance from "./ui/balance";
import AllPlacedBets from "./all-placed-bets";
import CreatedBets from "./created-bets";

export const TimestampDisplay = ({timestamp}: {timestamp: string}) => {
  const date = new Date(parseInt(timestamp) * 1000);
  return (
    <span className="text-white">
      {date.toLocaleDateString()} {date.toLocaleTimeString()}
    </span>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("placed");

  const [userBalance, setUserBalance] = useState<any>();

  const {address} = useAccount();
  const chainid = useChainId();
  const {data: contractBalance, refetch: refetchContractBalance} =
    useReadContract({
      address:
        chainid === 2810
          ? MORPH_PREDICTION_MARKET_ADDRESS
          : PREDICTION_MARKET_ADDRESS,
      abi: PREDICTION_MARKET_ABI,
      functionName: "getBalance",
      account: address,
    });

  useEffect(() => {
    setUserBalance(contractBalance);
  }, [contractBalance]);

  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Not connected";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white hover:bg-opacity-20"
        >
          <User className="w-8 h-8 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full h-full sm:max-w-md p-0 bg-black"
      >
        <SheetHeader className="text-white p-4">
          <SheetTitle className="text-xl font-bold">Betting Profile</SheetTitle>
        </SheetHeader>
        <div className="p-4 overflow-y-auto h-[100vh]">
          <Card className="mb-6 bg-black border-2 border-primary">
            <CardHeader></CardHeader>
            <CardContent>
              <p className="text-sm mb-2 text-white">
                Wallet: {displayAddress}
              </p>
              <p className="text-lg font-bold mb-4 text-white flex justify-between items-center">
                USDC Balance:{" "}
                {userBalance && `${Number(userBalance) / 1e18} USDC`}
                <Balance />
              </p>
            </CardContent>
          </Card>

          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-black mb-4">
              <TabsTrigger
                value="placed"
                className="text-white data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Bets Placed
              </TabsTrigger>
              <TabsTrigger
                value="created"
                className="text-white data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Bets Created
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="h-auto max-h-[calc(100vh-300px)] overflow-y-auto pr-2"
              value="placed"
            >
              <AllPlacedBets />
            </TabsContent>
            <TabsContent
              value="created"
              className="h-auto max-h-[calc(100vh-300px)] overflow-y-auto pr-2"
            >
              <CreatedBets />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Profile;
