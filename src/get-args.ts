import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import ufs from './choices/uf'
import ddds from './choices/ddd'
import ordems from './choices/ordem'

export function getArgs() {
  return yargs(hideBin(process.argv)).options({
    uf: { choices: ufs, demandOption: true, alias: 'estado' },
    ddd: { choices: ddds },
    regiao: { type: 'string' },
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
    },
    ordem: {
      choices: ordems,
      default: 'mais relevantes' as const,
      alias: 'ordernarPor',
    },
    intervalo: {
      type: 'number',
      default: 60,
      description: 'Intervalo de tempo em minutos entre cada busca.',
      alias: 'delay',
    },
    notificar: { type: 'boolean', default: true, alias: 'enviarNotificacao' },
  })
}
