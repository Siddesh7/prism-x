import {
  MORPH_PREDICTION_MARKET_ADDRESS,
  PREDICTION_MARKET_ADDRESS,
} from "@/constants";
import React, {useEffect, useState} from "react";
import {useAccount, useChainId, useReadContract} from "wagmi";
import PREDICTION_MARKET_ABI from "@/constants/abi.json";
import {Card, CardContent, CardTitle} from "./ui/card";
import {Badge} from "./ui/badge";
import {Clock, Flame} from "lucide-react";
import {Progress} from "@radix-ui/react-progress";
import {TimestampDisplay} from "./profile";
const AllPlacedBets = () => {
  const [userBets, setUserBets] = useState<any>();
  const {address} = useAccount();
  const chainid = useChainId();

  const {data: myBets} = useReadContract({
    address:
      chainid === 2810
        ? MORPH_PREDICTION_MARKET_ADDRESS
        : PREDICTION_MARKET_ADDRESS,
    abi: PREDICTION_MARKET_ABI,
    functionName: "getUserBets",
    account: address,
    args: [address],
  });

  useEffect(() => {
    if (myBets) setUserBets(myBets);
  }, [myBets]);
  return (
    <div>
      {userBets &&
        userBets[0]?.map((bet: any, index: number) => (
          <PlacedBetCard key={bet.id} bet={bet} value={userBets[1][index]} />
        ))}
    </div>
  );
};
const PlacedBetCard = ({bet, value}: {bet: any; value: any}) => {
  const winOdds =
    Number(bet.totalYesAmount) /
    (Number(bet.totalYesAmount) + Number(bet.totalNoAmount));
  return (
    <Card className="mb-4 bg-black border-2 border-primary overflow-hidden">
      <div className="bg-primary p-2">
        <CardTitle className="text-lg text-white flex justify-between items-center">
          <span>{bet.question}</span>
          <div className="flex flex-row gap-2">
            <Badge className="bg-white text-primary">
              ${Number(value.amount.toString()) / 1e18}
            </Badge>{" "}
            <Badge className="bg-white text-primary">
              {value.choice === true ? "Yes" : "No"}
            </Badge>
          </div>
        </CardTitle>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Flame className="text-green-500" size={20} />
            <span className="text-sm text-white font-bold">
              {(winOdds * 100).toFixed(0)}%
            </span>
          </div>
        </div>
        <Progress
          value={Number((winOdds * 100).toFixed(0))}
          className="h-2 mb-2 bg-green-500 rounded-full text-green-500"
        />
        <div className="flex justify-between items-center text-xs text-white">
          <span>Win Chance</span>
          <div className="flex items-center gap-1 text-white">
            <Clock size={14} />
            <TimestampDisplay timestamp={bet.bettingEndTime.toString()} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default AllPlacedBets;
