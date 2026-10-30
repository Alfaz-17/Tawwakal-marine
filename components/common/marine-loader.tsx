"use client"

import React from "react";

export const MarineLoader = () => {
  return (
    <div className="w-full h-[350px] flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-3 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Loading...
        </span>
      </div>
    </div>
  );
};
