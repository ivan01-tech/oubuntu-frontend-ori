import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CustomImage from "../ui/image";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
        className="group"
      >
        <CarouselContent className="group">
          <CarouselItem className="w-full lg:h-full h-[200px]">
            <CustomImage
              path="/images/slide.webp"
              className="w-full object-cover rounded-2xl h-full"
            />
          </CarouselItem>
          <CarouselItem className="w-full lg:h-full h-[200px]">
            <CustomImage
              path="/images/slide1.webp"
              className="w-full object-cover rounded-2xl h-full"
            />
          </CarouselItem>
          <CarouselItem className="w-full lg:h-full h-[200px]">
            <CustomImage
              path="/images/slide2.webp"
              className="w-full object-cover rounded-2xl h-full"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="-left-4 opacity-0 transition-all group-hover:duration-300 group-hover:opacity-100 group-hover:translate-x-0 shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
        <CarouselNext className="-right-4 group-hover:transalte-x-0 transition-all group-hover:duration-300 opacity-0 group-hover:opacity-100 shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
      </Carousel>
    </div>
  );
};

export default Hero;
