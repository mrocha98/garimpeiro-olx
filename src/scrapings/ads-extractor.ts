import isEmpty from 'lodash.isempty'

export type Ad = {
  title: string
  link: string
  price: number
}

export type Ads = Ad[]

export class AdsExtractor {
  extractFromHTML(document: Document): Ads {
    const adsList = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('ul#ad-list li a')
    )

    const ads = adsList.map((ad) => {
      const children = Array.from(ad.children)[0]

      const title = children.querySelector('h2')?.textContent
      if (isEmpty(title)) return

      const priceArray = Array.from(
        children.querySelectorAll('div div div div p')
      ).filter((element) => element.textContent?.startsWith('R$'))
      if (isEmpty(priceArray)) return

      const priceString = priceArray[0].textContent
      if (isEmpty(priceString)) return

      let price = Number(priceString!.replace(/\D+/g, ''))
      if (priceString!.includes(',')) price /= 100

      const link = ad.href

      return { link, title, price }
    })

    return ads.filter(Boolean) as Ads
  }
}
