import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const files = ["links", "new", "redirects"];

export function CarouselScreenshots() {
  return (
    <Carousel className="w-2/3 max-w-xs">
      <CarouselContent>
        {files.map((file, index) => (
          <CarouselItem key={index}>
            <Image
              src={`/mobile/${file}.webp`}
              alt={file}
              width={1170}
              height={2220}
              className="rounded-lg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
