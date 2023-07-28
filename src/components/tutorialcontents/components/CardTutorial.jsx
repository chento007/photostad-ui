import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardTutorial = ({ uuid, slug, name, thumbnail }) => {
  return (
    <Link href={`/tutorial/${uuid}/${slug}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-[#1e1e1e]">
        <img className="rounded-t-lg w-full object-contain" src={thumbnail} alt="" style={{ height: "300px" }} />
        <div className="p-5 overflow-hidden" style={{ height: "120px" }}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default CardTutorial;
