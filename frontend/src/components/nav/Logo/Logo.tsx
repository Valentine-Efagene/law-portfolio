import Image from "@/components/common/Image";
import { string } from "prop-types";
import React, { useState } from "react";

interface ILogoProps {
  className: string;
  alt: string;
}

export default function Logo({ className, alt = "" }: ILogoProps) {
  return (
    <Image
      alt="alt"
      className={className}
      src="https://lawcounsel.radiantthemes.com/wp-content/uploads/2018/08/Default-Logo.png"
    />
  );
}
