import { UrlParser, GetParsedUrlParams } from './url-parser'

export const getUrls = (
  urlParser: UrlParser,
  totalPages: number,
  params: Omit<GetParsedUrlParams, 'page'>
) =>
  Array.from({ length: totalPages })
    .fill('')
    .map((_, index) => urlParser.getParsedUrl({ ...params, page: index + 1 }))
