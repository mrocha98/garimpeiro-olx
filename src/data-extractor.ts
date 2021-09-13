export type ExtractedData = {
  ads: Array<{
    title: string
    link: string
    price: number
  }>
  nextPageLink: string
}

export class DataExtractor {
  extractFromPage() {
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

        const priceString = priceArray[0].textContent
        if (!priceString?.length) return

        let price = Number(priceString.replace(/\D+/g, ''))
        if (priceString.includes(',')) price /= 100

        const link = ad.href

        return { link, title, price }
      })
      .filter(Boolean)

    const nextPageLink = document.querySelector<HTMLAnchorElement>(
      'a[data-lurker-detail="next_page"]'
    )?.href

    return JSON.stringify({ nextPageLink, ads })
  }
}
