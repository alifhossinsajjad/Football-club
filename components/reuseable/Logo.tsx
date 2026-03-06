import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Image
        src="/images/logo.png"
        alt="NextGen Pros Logo"
        width={150}
        height={50}
        priority
      />
    </div>
  );
};

export default Logo;
