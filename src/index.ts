import puppeteer from 'puppeteer'

import { getArgs } from './get-args'
import { UrlParser } from './url-parser'

async function bootstrap() {
  const { produto, uf, regiao, cidade, ordem } = await getArgs().parseAsync()

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(
    new UrlParser(uf, produto).getParsedUrl({ regiao, cidade, ordem })
  )

  const evaluated = await page.evaluate(() => {
    const adsList = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('ul#ad-list li a')
    )
    const ads = adsList
      .map((ad) => {
        const children = Array.from(ad.children)[0]

        const title = children.querySelector('h2')?.textContent
        if (!title) return

        const priceArray = Array.from(
          children.querySelectorAll('div div div div p')
        ).filter((element) => element.textContent?.startsWith('R$'))
        if (!priceArray.length) return
        const price = priceArray[0].textContent

        const link = ad.href

        return { link, title, price }
      })
      .filter(Boolean)

    const nextPageLink = document.querySelector<HTMLAnchorElement>(
      'a[data-lurker-detail="next_page"]'
    )?.href

    return JSON.stringify({ nextPageLink, ads }, null, 2)
  })

  console.log(evaluated)

  await browser.close()
}

bootstrap()
