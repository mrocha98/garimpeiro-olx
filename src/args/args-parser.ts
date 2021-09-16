import kebabCase from 'lodash.kebabcase'
import minutesToMilliseconds from 'date-fns/minutesToMilliseconds'

import { getArgv } from './get-argv'
import { DDD } from '../choices/ddd'
import { Ordem } from '../choices/ordem'

export class ArgsParser {
  async getParsedArgs() {
    const {
      cidade,
      ddd,
      intervalo,
      ordem,
      paginas,
      percentual,
      preco,
      produto,
      zona,
      uf,
      pararAoEncontrarOfertas,
      notificarViaLog,
      notificarViaDesktop,
    } = await getArgv().parseAsync()

    const city = kebabCase(cidade)
    const region = this.findRegion(ddd!)
    const percentage = Math.abs(percentual)
    const pages = paginas === 0 ? 1 : Math.abs(paginas)
    const interval = minutesToMilliseconds(intervalo)
    const price = Math.abs(preco)
    const zone = kebabCase(zona)

    return {
      city,
      region,
      percentage,
      order: ordem as Ordem,
      pages,
      interval,
      price,
      state: uf,
      product: produto,
      zone,
      notifyViaLog: notificarViaLog,
      notifyViaDesktop: notificarViaDesktop,
      stopOnMatch: pararAoEncontrarOfertas,
    }
  }

  findRegion(ddd: DDD) {
    const regions: Record<DDD, string> = {
      '11': 'sao-paulo-e-regiao',
      '12': 'vale-do-paraiba-e-litoral-norte',
      '13': 'baixada-santista-e-litoral-sul',
      '14': 'regiao-de-bauro-e-marilia',
      '15': 'regiao-de-sorocaba',
      '16': 'regiao-de-ribeirao-preto',
      '17': 'regiao-de-sao-jose-do-rio-preto',
      '18': 'regiao-de-presidente-prudente',
      '19': 'grande-campinas',
      '21': 'rio-de-janeiro-e-regiao',
      '22': 'norte-do-estado-do-rio',
      '24': 'serra-angra-dos-reis-e-regiao',
      '27': 'norte-do-espirito-santo',
      '28': 'sul-do-espirito-santo',
      '31': 'belo-horizonte-e-regiao',
      '32': 'regiao-de-juiz-de-fora',
      '33': 'regiao-de-governador-valadares-e-teofilo-otoni',
      '34': 'regiao-de-uberlandia-e-uberaba',
      '35': 'regiao-de-pocos-de-caldas-e-varginha',
      '37': 'regiao-de-divinopolis',
      '38': 'regiao-de-montes-claros-e-diamantina',
      '41': 'regiao-de-curitiba-e-paranagua',
      '42': 'regiao-de-ponta-grossas-e-guarapuava',
      '43': 'regiao-de-londrina',
      '44': 'regiao-de-maringa',
      '45': 'regiao-de-foz-do-iguacu-e-cascavel',
      '46': 'regiao-de-francisco-beltrao-e-pato-branco',
      '47': 'norte-de-santa-catarina',
      '48': 'florianopolis-e-regiao',
      '49': 'oeste-de-santa-catarina',
      '51': 'regioes-de-porto-alegre-torres-e-santa-cruz-do-sul',
      '53': 'regioes-de-pelotas-rio-grande-e-bage',
      '54': 'regioes-de-caxias-do-sul-e-passo-fundo',
      '55': 'regioes-de-santa-maria-uruguaiana-e-cruz-alta',
      '61': 'distrito-federal-e-regiao',
      '62': 'grande-goiania-e-anapolis',
      '64': 'regiao-de-rio-verde-e-caldas-novas',
      '63': 'tocantins',
      '65': 'regiao-de-cuiaba',
      '66': 'regiao-de-rondonopolis-e-sinop',
      '67': 'mato-grosso-do-sul',
      '68': 'acre',
      '69': 'rondonia',
      '71': 'grande-salvador',
      '73': 'sul-da-bahia',
      '74': 'regiao-de-juazeiro-e-jacobina',
      '75': 'regiao-de-feira-de-santana-e-alagoinhas',
      '77': 'regiao-de-vitoria-da-conquista-e-barreiras',
      '79': 'sergipe',
      '81': 'grande-recife',
      '82': 'alagoas',
      '83': 'paraiba',
      '84': 'rio-grande-do-norte',
      '85': 'fortaleza-e-regiao',
      '86': 'regiao-de-teresina-e-parnaiba',
      '87': 'regiao-de-petrolina-e-garanhuns',
      '88': 'regiao-de-juazeiro-do-norte-e-sobral',
      '89': 'regiao-de-picos-e-floriano',
      '91': 'regiao-de-belem',
      '92': 'regiao-de-manaus',
      '93': 'regiao-de-santarem',
      '94': 'regiao-de-maraba',
      '95': 'roraima',
      '96': 'amapa',
      '97': 'leste-do-amazonas',
      '98': 'regiao-de-sao-luis',
      '99': 'regiao-de-imperatriz-e-caxias',
    }
    return regions[ddd]
  }
}
