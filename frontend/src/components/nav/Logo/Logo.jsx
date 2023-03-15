import Image from "@/components/common/Image";
import { string } from "prop-types";
import React, { useState } from "react";
import styles from "./Logo.module.css";

Logo.propTypes = {
  className: string,
};

export default function Logo({ className }) {
  return (
    <Image src="https://lawcounsel.radiantthemes.com/wp-content/uploads/2018/08/Default-Logo.png" />
  );
}
