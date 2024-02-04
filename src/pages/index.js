'use client'

import React, { useEffect, useLayoutEffect } from "react";
import Menu from "@/components/Menu";
import Toolbox from "@/components/Toolbox";
import Board from "@/components/Board";
import ZoomPan from "@/components/ZoomPan";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const login = false;

  return (
    <>
      <div className="relative">
        <Menu />
        <Toolbox />
        <Board />
        <ZoomPan />
      </div>
    </>
  );
}
