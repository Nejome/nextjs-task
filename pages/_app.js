import {useMemo} from "react";
import {useRouter} from "next/router";
import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import {NextIntlProvider} from 'next-intl';
import English from "../lang/en.json"
import Arabic from "../lang/ar.json";
import NavBar from "../components/navbar";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
    const {locale} = useRouter();
    const messages = useMemo(() => {
        switch (locale) {
            case 'en':
                return English
            case 'ar':
                return Arabic
            default:
                return English
        }
    }, [locale]);

  return (
      <NextIntlProvider messages={messages} locale={locale}>
          <NavBar />
        <Component {...pageProps} />
      </NextIntlProvider>
  )
}

export default MyApp
