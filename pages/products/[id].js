import Head from 'next/head';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {useTranslations} from "next-intl";

export async function getServerSideProps(context) {
    const response = await fetch(`https://dummyjson.com/products/${context.params.id}/`);

    const data = await response.json();

    return {
        props: {
            product: data,
            locale: context.locale
        }
    }
}

export default function Product({product, locale}) {
    const t = useTranslations();

    return (
        <div dir={`${locale === 'ar' && `rtl`}`} className={`${locale === 'ar' && `font-Tajawal`}`}>
            <Head>
                <title>{product.title}</title>
                <meta name="description" content={product.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="mt-24">
                <div className="container mx-auto">
                    <div className="px-4 py-4">
                        {product &&
                            <div className="flex flex-col xl:flex-row gap-4">
                                <div dir="ltr" className="w-full xl:w-1/2">
                                    <Carousel
                                        showArrows={false}
                                        renderIndicator={false}
                                        showStatus={false}
                                    >
                                        {product.images.map((image, i) => (
                                            <div key={i}>
                                                <img src={image} alt={product.title}/>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <div className="p-4">
                                        <h1 className="text-2xl font-extrabold">{product.title}</h1>

                                        <hr className="mt-2 mb-5"/>

                                        <p className="text-lg">{product.description}</p>

                                        <div className="flex justify-between mt-16">
                                            <div className="flex gap-5">
                                                {product?.discountPercentage > 0
                                                    ?
                                                    <>
                                                        <span className="text-[#bf4a49]">{Math.floor(product.price - (product.price * product.discountPercentage / 100))} {t('SAR')}</span>

                                                        <span className="text-[#a1a1a1]"><del>{product.price}</del><span className="inline-block ml-2">{t('SAR')}</span></span>
                                                    </>
                                                    :
                                                    <>
                                                        <span className="text-[#bf4a49]">200{t('SAR')}</span>

                                                        <span className="text-[#a1a1a1]"><del>400</del><span className="inline-block ml-2">{t('SAR')}</span></span>
                                                    </>
                                                }
                                            </div>

                                            <div className="text-green-600">
                                                {t('stock')} {product.stock}
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-16">
                                            <div>
                                                <span className="inline-block ml-1">{Math.round(product.rating * 10)/10} / 5</span>
                                                <span className="text-yellow-400"><FontAwesomeIcon icon={faStar} /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}
