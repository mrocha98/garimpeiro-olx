import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import ufs from '../choices/uf'
import ddds from '../choices/ddd'
import ordems from '../choices/ordem'

export function getArgv() {
  return yargs(hideBin(process.argv)).options({
    uf: { choices: ufs, demandOption: true, alias: 'estado' },
    ddd: { choices: ddds },
    zona: { type: 'string' },
    cidade: { type: 'string' },
    produto: { type: 'string', demandOption: true },
    preco: { type: 'number', demandOption: true },
    percentual: {
      type: 'number',
      default: 10,
      description:
        'Variação percentual em relação ao preço. ' +
        'Ex: preço R$100, percentual de 10%, ' +
        'o programa notificará quando o preço estiver entre R$90 e R$110. ' +
        'Use 0 caso queira monitorar com o preço exato.',
      alias: 'porcentagem',
    },
    ordem: {
      choices: ordems,
      default: 'mais relevantes',
      alias: 'ordernar-por',
    },
    intervalo: {
      type: 'number',
      default: 60,
      description: 'Intervalo de tempo em minutos entre cada busca.',
      alias: 'delay',
    },
    paginas: {
      type: 'number',
      default: 1,
      description: 'Número de páginas para verificar.',
      alias: 'pags',
    },
    pararAoEncontrarOfertas: {
      type: 'boolean',
      default: true,
      description: 'Finaliza a execução do programa ao encontrar ofertas.',
      alias: 'parar-ao-encontrar-ofertas',
    },
    notificarViaLog: {
      type: 'boolean',
      default: true,
      description: 'Loga no console quando encontra uma oferta.',
      alias: 'notificar-via-log',
    },
    notificarViaDesktop: {
      type: 'boolean',
      default: true,
      description:
        'Emite uma notificação de desktop quando encontra uma oferta',
      alias: 'notificar-via-desktop',
    },
  })
}
