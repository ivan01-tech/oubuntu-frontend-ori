import Image from "next/image";
import React from "react";

type Props = {
  title?: string;
  objectType: string;
};

function NoDataComp({ title, objectType }: Props) {
  return (
    <div className="mx-2 my-4 flex w-full flex-col items-center justify-center gap-4 text-xl font-bold">
      <Image
        width={300}
        height={300}
        src="/images/undraw_no_data_re_kwbl.svg"
        alt=" not found !"
      />
      <p>{`${objectType} non trouvé.`}</p>
    </div>
  );
}

export default NoDataComp;
