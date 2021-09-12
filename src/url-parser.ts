import kebabCase from 'lodash.kebabcase'
import isEmpty from 'lodash.isempty'

import { UF } from './choices/uf'
import { Ordem } from './choices/ordem'

type getPasedUrlParams = {
  regiao?: string
  cidade?: string
  ordem?: Ordem
}

export class UrlParser {
  constructor(private readonly uf: UF, private readonly produto: string) {
    this.produto = encodeURI(produto)
  }

  getParsedUrl({ regiao, cidade, ordem }: getPasedUrlParams) {
    const IS_REGIAO_EMPTY = isEmpty(regiao)
    const parsedRegiao = IS_REGIAO_EMPTY ? '' : `/${kebabCase(regiao)}`

    const IS_CIDADE_EMPTY = isEmpty(cidade)
    const parsedCidade =
      IS_REGIAO_EMPTY || IS_CIDADE_EMPTY ? '' : `/${kebabCase(cidade)}`

    const url = new URL(
      `https://${this.uf}.olx.com.br/vale-do-paraiba-e-litoral-norte${parsedRegiao}${parsedCidade}`
    )

    url.searchParams.append('q', this.produto)
    if (ordem === 'mais recentes') url.searchParams.append('sf', '1')
    else if (ordem === 'menor preco') url.searchParams.append('sp', '2')

    return url.href
  }
}
