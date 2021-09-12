import path from 'path'
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

  await page.screenshot({
    path: path.resolve(__dirname, '..', 'teste.png'),
  })

  await browser.close()
}

bootstrap()
