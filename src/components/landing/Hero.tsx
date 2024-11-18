"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import waterImage from "@/assets/landing/water.png";
// import plannerImage from "@/assets/landing/win.png";
import Serif from "../Serif";

import { createRandomLobbyCode } from "@/lib/game/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

function Hero() {
  const randomLobby = createRandomLobbyCode();
  const [lobbyCode, setLobbyCode] = React.useState("");

  return (
    <div className="pt-32 max-w-6xl mx-auto p-12">
      <Serif>
        <h1 className="text-6xl font-extrabold max-w-2xl">
          Craft the Craziest Phrases from{" "}
          <span
            style={{
              background: "linear-gradient(132deg, #c86b8a 0%, #943c5f 100%)",
              backgroundClip: "text",
              // @ts-ignore
              "-webkit-background-clip": "text",
              // @ts-ignore
              "-webkit-text-fill-color": "transparent",
            }}
          >
            Scattered Words
          </span>
          !
        </h1>
      </Serif>

      <div className="mt-8 flex gap-6">
        <Link href={`/game/${randomLobby}`}>
          <Button>New lobby</Button>
        </Link>

        <InputOTP
          maxLength={4}
          value={lobbyCode}
          onChange={(val) => setLobbyCode(val)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>

        <Link href={lobbyCode.length === 4 ? `/game/${lobbyCode}` : "#"}>
          <Button disabled={lobbyCode.length !== 4}>Join lobby</Button>
        </Link>
      </div>

      <div className="mt-16 w-full h-[80vh] relative rounded-xl overflow-hidden">
        <Image
          src={waterImage}
          alt="Water"
          fill
          className="object-cover w-full h-full rounded-xl blur-3xl"
        />

        {/* <Image
          src={plannerImage}
          alt="SparkTunes screen"
          className="absolute w-2/3 md:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-8 border-zinc-100 rounded-xl"
        /> */}
      </div>
    </div>
  );
}

export default Hero;
