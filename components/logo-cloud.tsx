import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

const logos = [
  {
    name: "Google",
    logo: "/colleges/google.webp",
  },
  {
    name: "Cambridge",
    logo: "/colleges/cambridge.webp",
  },
  {
    name: "USC",
    logo: "/colleges/usc.webp",
  },
  {
    name: "NYU",
    logo: "/colleges/nyu.webp",
  },
  {
    name: "Stanford",
    logo: "/colleges/stanford.webp",
  },
  {
    name: "Harvard",
    logo: "/colleges/harvard.webp",
  },
  {
    name: "UPenn",
    logo: "/colleges/upenn.webp",
  },
  {
    name: "Princeton",
    logo: "/colleges/princeton.webp",
  },
];

export default function LogoCloud() {
    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="group relative m-auto px-6 md:max-w-9xl">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Powering the best teams</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            {logos.map((item, index) => (
                                <div className="flex" key={index}>
                                    <img
                                        className="mx-auto h-8 w-fit dark:invert"
                                        src={item.logo}
                                        alt={item.name}
                                        height="32"
                                        width="auto"
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}