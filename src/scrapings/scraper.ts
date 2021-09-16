import { AdsExtractor, Ads } from './ads-extractor'

export class Scraper {
  constructor(private readonly extractor: AdsExtractor) {}

  scrapeAdsFromSinglePage(page: Document): Ads {
    return this.extractor.extractFromHTML(page)
  }

  scrapeAdsFromPages(pages: Document[]) {
    const adsMap = new Map<number, Ads>()

    pages.forEach((page, index) => {
      const pageNumber = index + 1
      const ads = this.scrapeAdsFromSinglePage(page)
      adsMap.set(pageNumber, ads)
    })

    return adsMap
  }
}
