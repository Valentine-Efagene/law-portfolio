import Image from "@/components/common/Image";
import Link from "next/link";
import { string } from "prop-types";
import React, { useState } from "react";

interface ILogoProps {
  className?: string;
  alt?: string;
  href?: string;
}

export default function Logo({ href = "/", className, alt = "" }: ILogoProps) {
  return (
    <Link href={href} className={className}>
      <Image
        alt=""
        width={200}
        height={43.5}
        src="/assets/img/default-logo.webp"
      />
    </Link>
  );
}
