import kebabCase from 'lodash.kebabcase'
import isEmpty from 'lodash.isempty'

import { UF as State } from '../choices/uf'
import { Ordem as Order } from '../choices/ordem'

export type GetParsedUrlParams = {
  region: string
  zone?: string
  city?: string
  order?: Order
  page?: number
}

export class UrlParser {
  constructor(private readonly uf: State, private readonly product: string) {}

  private _appendProductParam(url: URL) {
    url.searchParams.append('q', this.product)
  }

  private _appendOrderParam(url: URL, order: Order) {
    if (order === 'mais recentes') url.searchParams.append('sf', '1')
    else if (order === 'menor preco') url.searchParams.append('sp', '2')
  }

  private _appendPageParam(url: URL, page: number) {
    if (page > 1) url.searchParams.append('o', page.toString())
  }

  getParsedUrl({ region, zone, city, order, page }: GetParsedUrlParams) {
    const IS_ZONE_EMPTY = isEmpty(zone)
    const IS_CITY_EMPTY = isEmpty(city)

    const parsedZone = IS_ZONE_EMPTY ? '' : `/${kebabCase(zone)}`

    const parsedCity =
      IS_ZONE_EMPTY || IS_CITY_EMPTY ? '' : `/${kebabCase(city)}`

    const url = new URL(
      `https://${this.uf}.olx.com.br/${region}${parsedZone}${parsedCity}`
    )

    this._appendProductParam(url)
    if (order) this._appendOrderParam(url, order)
    if (page) this._appendPageParam(url, page)

    return url
  }
}
