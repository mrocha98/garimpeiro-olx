import puppeteer from 'puppeteer'
import notifier from 'node-notifier'

import { DataExtractor, ExtractedData } from './data-extractor'
import { ArgsParser } from './args/args-parser'
import { UrlParser } from './url-parser'
import { priceMatches } from './price-matches'

async function bootstrap() {
  const {
    state,
    product,
    region,
    subRegion,
    city,
    order,
    interval,
    price,
    percentage,
  } = await new ArgsParser().getParsedArgs()

  const handle = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(
      new UrlParser(state, product).getParsedUrl({
        region,
        subRegion,
        city,
        order,
      })
    )

    const evaluated = await page.evaluate(new DataExtractor().extractFromPage)
    const data = JSON.parse(evaluated) as ExtractedData
    const matches = data.ads.filter((ad) =>
      priceMatches(price, ad.price, percentage)
    )

    console.log(
      `==========================================\t${new Date().toLocaleString()}\t==========================================`
    )
    console.log({ matches })
    matches.forEach((match) => {
      notifier.notify({
        title: '🔥 OLX Tracker: Oferta encontrada!!! 🔥',
        message: `${product} por R$ ${match.price}`,
        open: match.link,
        wait: true,
      })
    })
    console.log(
      '=================================================================================================================='
    )

    await browser.close()
  }

  setInterval(handle, interval) as ReturnType<typeof setInterval>
  process.nextTick(handle)
}

bootstrap()
