"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import waterImage from "@/assets/landing/water.png";
import gameImage from "@/assets/landing/game.png";
import logo from "@/app/icon.png";
import Serif from "../Serif";

import { createRandomLobbyCode } from "@/lib/game/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

function Hero() {
  const randomLobby = createRandomLobbyCode();
  const [lobbyCode, setLobbyCode] = React.useState("");

  return (
    <div className="pt-32 max-w-6xl mx-auto p-12 text-center">
      <Image
        src={logo}
        alt="Patch Notes Logo"
        width={100}
        height={100}
        className="mx-auto mb-6"
      />

      <Serif>
        <h1 className="text-4xl font-extrabold max-w-2xl ">
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
            Patch Notes
          </span>
        </h1>
      </Serif>

      <p className="mt-6 text-zinc-500 max-w-2xl">
        Craft the Craziest Phrases from Scattered Words!
      </p>

      <div className="mt-8 flex gap-6 flex-col">
        <Link href={`/game/${randomLobby}`}>
          <Button className="w-full">New lobby</Button>
        </Link>

        <div className="text-center text-zinc-400 font-medium">or</div>

        <div className="flex gap-6 items-center justify-center">
          <InputOTP
            maxLength={4}
            value={lobbyCode}
            onChange={(val) => setLobbyCode(val)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} autoFocus />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>

          <Link href={lobbyCode.length === 4 ? `/game/${lobbyCode}` : "#"}>
            <Button disabled={lobbyCode.length !== 4}>Join lobby</Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 w-full h-[80vh] relative rounded-xl overflow-hidden">
        <Image
          src={waterImage}
          alt="Water"
          fill
          className="object-cover w-full h-full rounded-xl blur-3xl"
        />

        <Image
          src={gameImage}
          alt="SparkTunes screen"
          className="absolute w-1/2 top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-8 border-zinc-100 rounded-xl"
        />
      </div>
    </div>
  );
}

export default Hero;
