import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-screen absolute top-0 right-0 z-40 flex justify-center items-center">
      <Image
        width={350}
        height={290}
        alt="loading image "
        src={"/assets/loading/loading.gif"}
      ></Image>
    </div>
  );
}
