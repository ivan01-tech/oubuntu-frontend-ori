import Image from "next/image";
import React from "react";

type Props = {
  title?: string;
  objectType?: string;
};

function NoDataComp({ title, objectType }: Props) {
  return (
    <div className="w-full flex justify-center items-center gap-4 font-bold text-xl flex-col my-4 mx-2">
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
