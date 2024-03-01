import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryBlock from "./_/CategoryBlock";

type Props = {
  data: Category[];
};

const CategoriesSliderComponent = ({ data }: Props) => {
  // console.log("data ; ", data);
  return (
    <div className="w-full lg:py-8 py-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className=" w-full "
      >
        <CarouselContent className="w-full flex justify-center">
          {data.map((prev) => {
            return (
              <CarouselItem className="basis-1/3 lg:basis-1/6" key={prev._id}>
                <CategoryBlock
                  image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${prev._id}.${prev.image_ext}`}
                  label={prev.name}
                  category={prev}
                />
              </CarouselItem>
            );
          })}
          {/* <CarouselItem className="basis-1/3 lg:basis-1/6">
            <CategoryBlock
              image="/images/categories/conserve.webp"
              label="Produits en conserve"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 lg:basis-1/6">
            <CategoryBlock
              image="/images/categories/friandises.webp"
              label="Friandises"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 lg:basis-1/6">
            <CategoryBlock
              image="/images/categories/poisson.webp"
              label="Poissons et Produits Marins"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 lg:basis-1/6">
            <CategoryBlock
              image="/images/categories/veggies-1.webp"
              label="Legumes et Tubercules"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 lg:basis-1/6">
            <CategoryBlock
              image="/images/categories/viande.webp"
              label="Viandes et Volailles"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3 lg:basis-1/6">
            <CategoryBlock
              image="/images/categories/vins.webp"
              label="Vins et Spiritieux"
            />
          </CarouselItem> */}
        </CarouselContent>
        <CarouselPrevious className="-left-4 shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
        <CarouselNext className="-right-4  shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
      </Carousel>
    </div>
  );
};

export default CategoriesSliderComponent;
