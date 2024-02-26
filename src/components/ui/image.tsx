import Image from "next/image";
import React from "react";

type Props = {
  className?: string;
  path: string;
};

const CustomImage = (props: Props) => {
  return (
    <Image
      alt="image"
      className={props.className}
      src={props.path}
      width={1200}
      height={1200}
    />
  );
};

export default CustomImage;
