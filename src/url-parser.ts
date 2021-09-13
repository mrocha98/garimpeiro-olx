import kebabCase from 'lodash.kebabcase'
import isEmpty from 'lodash.isempty'

import { UF as State } from './choices/uf'
import { Ordem as Order } from './choices/ordem'

type Params = {
  region: string
  subRegion?: string
  city?: string
  order?: Order
}

export class UrlParser {
  constructor(private readonly uf: State, private readonly product: string) {
    this.product = encodeURI(product)
  }

  getParsedUrl({ region, subRegion, city, order }: Params) {
    const IS_SUBREGION_EMPTY = isEmpty(subRegion)
    const IS_CITY_EMPTY = isEmpty(city)

    const parsedSubRegion = IS_SUBREGION_EMPTY ? '' : `/${kebabCase(subRegion)}`

    const parsedCity =
      IS_SUBREGION_EMPTY || IS_CITY_EMPTY ? '' : `/${kebabCase(city)}`

    const url = new URL(
      `https://${this.uf}.olx.com.br/${region}${parsedSubRegion}${parsedCity}`
    )

    url.searchParams.append('q', this.product)
    if (order === 'mais recentes') url.searchParams.append('sf', '1')
    else if (order === 'menor preco') url.searchParams.append('sp', '2')
    console.log(url.href)
    return url.href
  }
}
