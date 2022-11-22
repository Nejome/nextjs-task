import Link from "next/link";
import {useTranslations} from "next-intl";
import {useRouter} from "next/router";

export default function NavBar(){
    const {pathname, locales, locale, asPath} = useRouter();
    const t = useTranslations();

    return (
        <header dir={`${locale === 'ar' && `rtl`}`}  className={`fixed top-0 left-0 w-full z-10 bg-white border-b border-[#eaeaea] ${locale === 'ar' && `font-Tajawal`}`}>
            <div className="container mx-auto">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <h1 className="text-2xl text-[#8089ba] font-extrabold">{t('title')}</h1>
                        </Link>

                        {locales.filter(l => l !== locale).map(l => (
                            <Link key={l} href={pathname} as={asPath} locale={l}  className="hover:underline">{l}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}