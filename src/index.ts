import got from 'got'
import isEmpty from 'lodash.isempty'
import addMilliseconds from 'date-fns/addMilliseconds'
import { JSDOM } from 'jsdom'

import { ArgsParser } from './args/args-parser'
import { UrlParser } from './urls/url-parser'
import { getUrls } from './urls/get-urls'
import { Ad, AdsExtractor } from './scrapings/ads-extractor'
import { Scraper } from './scrapings/scraper'
import { priceMatches } from './price-matches'
import { logNotification } from './notifications/log'
import { desktopNotification } from './notifications/desktop'
import { formattedHour, formattedDate } from './dates/formatted'

async function bootstrap() {
  const {
    state,
    product,
    region,
    zone,
    city,
    order,
    interval,
    price,
    percentage,
    pages,
    stopOnMatch,
    notifyViaDesktop,
    notifyViaLog,
  } = await new ArgsParser().getParsedArgs()

  const urlParser = new UrlParser(state, product)

  const urls = getUrls(urlParser, pages, {
    region,
    city,
    order,
    zone,
  })

  const handle = async () => {
    const documents = await Promise.all(
      urls.map(async ({ href }) => {
        const { body, statusCode } = await got.get(href)
        if (statusCode === 404) {
          console.error(
            `O endereço ${href} não é válido, tente novamente com outros valores`
          )
          process.exit(0)
        }
        return new JSDOM(body).window.document
      })
    )

    const start = new Date()
    console.log(
      `iniciando garimpo às ${formattedHour(start)} de ${formattedDate(
        start
      )}...`
    )

    const adsExtractor = new AdsExtractor()
    const scraper = new Scraper(adsExtractor)

    const scrapedAdsMap = scraper.scrapeAdsFromPages(documents)
    const matches: Set<Ad> = new Set()
    scrapedAdsMap.forEach((ads) =>
      ads.forEach((ad) => {
        if (priceMatches(price, ad.price, percentage)) matches.add(ad)
      })
    )

    const HAS_MATCHES = !isEmpty(matches)

    if (HAS_MATCHES) {
      notifyViaLog &&
        matches.forEach((ad) => logNotification(ad.title, ad.price, ad.link))

      notifyViaDesktop &&
        matches.forEach((ad) =>
          desktopNotification(ad.title, ad.price, ad.link)
        )

      if (stopOnMatch) {
        console.log('finalizando execução...')
        process.exit(0)
      }
    } else {
      console.log('nenhuma oferta encontrada...')
    }

    const nextIteration = addMilliseconds(new Date(), interval)
    console.log(
      `o próximo garimpo será executado às ${formattedHour(nextIteration)}...`
    )
  }

  if (!stopOnMatch) setInterval(handle, interval)
  process.nextTick(handle)
}

bootstrap()
