import TutorialContent from "@/components/tutorialcontents";


export const metadata = {
  title: "Tutorial - PhotoSTAD ",
  description: 'PhotoSTAD is one of the final project that was build by a group of ISTAD student. PhotoSTAD is a cutting-edge print shop that offers a state-of-the-art watermark maker,enabling photographers to protect their valuable images from unauthorized use.Additionally PhotoSTAD provides a powerful certificate generator,allowing professionals to create authentic certificates for their artwork and  establish credibility in the industry',
  images: "https://photostad.istad.co/_next/image?url=%2Fassets%2Fimage%2Fmainlogo-blackv2.png&w=256&q=75",
  openGraph: {
    title: "Tutorial - PhotoSTAD ",
    description: 'PhotoSTAD is one of the final project that was build by a group of ISTAD student. PhotoSTAD is a cutting-edge print shop that offers a state-of-the-art watermark maker,enabling photographers to protect their valuable images from unauthorized use.Additionally PhotoSTAD provides a powerful certificate generator,allowing professionals to create authentic certificates for their artwork and  establish credibility in the industry',
    url: 'https://photostad.istad.co/',
    images: "https://photostad.istad.co/_next/image?url=%2Fassets%2Fimage%2Fmainlogo-blackv2.png&w=256&q=75",
  },
};

export default function page() {
  return (
    <div>

      <div className="mx-auto w-full xl:w-[1290px] p-4">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-5">Tutorial</h1>

        <TutorialContent />

    

      </div>

    </div>
  )
}