import path from 'path'
import puppeteer from 'puppeteer'

import { getArgs } from './get-args'
import { mountUrl } from './mount-url'

async function bootstrap() {
  const args = await getArgs().parseAsync()

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(mountUrl({ uf: args.uf, produto: args.produto }))

  await page.screenshot({
    path: path.resolve(__dirname, '..', 'teste.png'),
  })

  await browser.close()
}

bootstrap()
