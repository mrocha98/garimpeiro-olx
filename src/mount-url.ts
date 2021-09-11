import { DDD } from './choices/ddd'
import { UF } from './choices/uf'

// 'https://sp.olx.com.br/vale-do-paraiba-e-litoral-norte/vale-do-paraiba/sao-jose-dos-campos?q=playstation%204'

type MountUrlParams = {
  uf: UF
  ddd?: DDD
  regiao?: string
  zona?: string
  cidade?: string
  produto: string
}

export function mountUrl({ uf, produto }: MountUrlParams) {
  const baseUrl = `https://${uf}.olx.com.br/?q=${encodeURI(produto)}`
  return baseUrl
}
