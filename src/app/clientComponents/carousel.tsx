import Heading from "./heading";
import {
    Carousel as GenericCarousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


export default function Carousel({ children, heading }: { children: any[], heading: string }) {
    return (
        <div className='max-w-[min(100%,100vw)] p-3 flex flex-col gap-y-3 h-auto'>
            <Heading className='border-white border-1 p-3 text-wrap'>{heading}</Heading>
            <div className='font-inherit w-full px-12 flex flex-col h-auto'>
                <GenericCarousel orientation='horizontal' className="relative flex w-full gap-3  box-border h-full">
                    <CarouselContent className=" h-full">
                        {children.map((child: any, index: number) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 border-1 border-white">{child}</CarouselItem>)}
                    </CarouselContent>
                    <CarouselPrevious className='bg-transparent rounded-none h-full' />
                    <CarouselNext className='bg-transparent rounded-none h-full' />
                </GenericCarousel>
            </div>
        </div>
    )
}