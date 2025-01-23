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
import { ChevronDown, DoorOpen, Sparkles } from "lucide-react";

function Hero() {
  const randomLobby = createRandomLobbyCode();
  const [lobbyCode, setLobbyCode] = React.useState("");

  return (
    <div className="pt-32 max-w-6xl lg:max-w-none mx-auto p-12 text-center lg:grid lg:grid-cols-2 lg:gap-6">
      <div className="">
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
                // @ts-expect-error Background clip
                "-webkit-background-clip": "text",
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
            <Button className="w-full p-8">
              <Sparkles size={16} className="mr-2" />
              New lobby
            </Button>
          </Link>

          <div className="text-center text-zinc-400 font-medium">or</div>

          <div className="flex gap-6 items-center justify-center">
            <InputOTP
              maxLength={4}
              value={lobbyCode}
              onChange={(val) => setLobbyCode(val)}
              className="scale-150"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} autoFocus className="scale-150 mx-2" />
                <InputOTPSlot index={1} className="scale-150 mx-2" />
                <InputOTPSlot index={2} className="scale-150 mx-2" />
                <InputOTPSlot index={3} className="scale-150 mx-2" />
              </InputOTPGroup>
            </InputOTP>

            <Link href={lobbyCode.length === 4 ? `/game/${lobbyCode}` : "#"}>
              <Button disabled={lobbyCode.length !== 4} className="p-8">
                <DoorOpen size={16} className="mr-2" />
                Join lobby
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full h-[60vh] relative rounded-xl overflow-hidden">
        <Image
          src={waterImage}
          alt="Water"
          fill
          className="object-cover w-full h-full rounded-xl blur-3xl"
        />

        <Image
          src={gameImage}
          alt="SparkTunes screen"
          className="absolute w-1/2 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl object-contain"
        />
      </div>
      <div className="mx-auto col-span-2">
        <ChevronDown size={32} className="mt-8 text-zinc-400 animate-bounce" />
      </div>
    </div>
  );
}

export default Hero;
