import Head from 'next/head'
import {useRouter} from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faBagShopping, faBoltLightning, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useProducts} from "../hooks";
import { useTranslations } from 'next-intl';
import {useCart} from "../hooks";

export default function Home() {
    const {products, loading} = useProducts();
    const router = useRouter();
    const t = useTranslations();
    const {addToCart, isAddedCart, removeFromCart, cart} = useCart();

  return (
    <div dir={`${router.locale === 'ar' && `rtl`}`} className={`${router.locale === 'ar' && `font-Tajawal`}`}>
      <Head>
        <title>المتجر الالكتروني | المنتجات</title>
        <meta name="description" content="المتجر الالكتروني" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-24">
        <div className="container mx-auto">
            <div className="px-4 py-4">
                {loading &&
                    <div className="flex justify-center h-screen pt-24 text-[#8089ba]">
                        <FontAwesomeIcon icon={faSpinner} size="3x" className="spinner"/>
                    </div>
                }
                {(products.length && !loading) &&
                    <div className="grid grid-cols-6 gap-10" key={cart}>
                        {products.map(product =>
                            <div key={product.id} className="col-span-6 sm:col-span-3 xl:col-span-2">
                                <div className="rounded w-full overflow-hidden relative">
                                    <a  href={`${router.locale}/products/${product.id}`}>
                                        <div className="w-full h-[240px]">
                                            <img src={product.thumbnail} className="h-full w-full object-fill" alt={product.title}/>
                                        </div>
                                    </a>

                                    {product?.discountPercentage > 0 &&
                                        <div className="absolute top-0 left-0 bg-[#d3cddb] text-[#202020] h-24 flex flex-col items-center justify-center gap-4 w-20 rounded-br-[8px] text-xl">
                                            <FontAwesomeIcon icon={faBoltLightning} size="xl"/>

                                            {Math.floor(product.discountPercentage)}%
                                        </div>
                                    }

                                    <div className="border border-t-0 p-7 border-[#eaeaea] bg-white rounded-b">
                                        <a href={`${router.locale}/products/${product.id}`}>
                                            <h3 className="text-lg">{product.title}</h3>
                                        </a>

                                        <div className="flex justify-between mt-5 text-sm">
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

                                            <span className="text-green-600">{t('stock')} {product.stock}</span>
                                        </div>

                                        <div className="mt-5 text-sm">
                                            <span className="inline-block ml-1">{Math.round(product.rating * 10)/10} / 5</span>
                                            <span className="text-yellow-400"><FontAwesomeIcon icon={faStar} /></span>
                                        </div>

                                        <div className="mt-5">
                                            {isAddedCart(product.id)
                                                ?
                                                <>
                                                    <button onClick={() => removeFromCart(product.id)} className="w-full border bg-[#8089ba] text-white rounded-[8px] px-3 py-2 hover:bg-[#666e95] flex justify-center items-center gap-4">
                                                        {t('remove-from-cart')}
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button onClick={() => addToCart(product.id)} className="w-full border border-[#8089ba] text-[#8089ba] rounded-[8px] px-3 py-2 hover:bg-[#f2f3f8] flex justify-center items-center gap-4">
                                                        <FontAwesomeIcon icon={faBagShopping} />

                                                        {t('add-to-card')}
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
      </main>
    </div>
  )
}
