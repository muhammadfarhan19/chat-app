/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { LoadingIcon } from "./Icons";

interface LoadingLogoProps {
  size?: number;
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({
  size = 100,
}: LoadingLogoProps) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <LoadingIcon />
    </div>
  );
};

export default LoadingLogo;
