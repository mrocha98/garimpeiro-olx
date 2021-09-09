import path from 'path'
import puppeteer from 'puppeteer'
;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(
    'https://sp.olx.com.br/vale-do-paraiba-e-litoral-norte/vale-do-paraiba/sao-jose-dos-campos?q=playstation%204'
  )

  await page.screenshot({
    path: path.resolve(__dirname, '..', 'teste.png'),
  })

  await browser.close()
})()
