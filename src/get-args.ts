import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import ufs from './choices/uf'
import ddds from './choices/ddd'

export function getArgs() {
  return yargs(hideBin(process.argv)).options({
    uf: { choices: ufs, demandOption: true, alias: 'estado' },
    ddd: { choices: ddds },
    regiao: { type: 'string' },
    zona: { type: 'string' },
    cidade: { type: 'string' },
    produto: { type: 'string', demandOption: true },
    preco: { type: 'number', demandOption: true },
    percentual: {
      type: 'number',
      default: 10,
      description:
        'variação percentual em relação ao preço. ' +
        'Ex: preço R$100, percentual de 10%, ' +
        'o programa notificará quando o preço estiver entre R$90 e R$110. ' +
        'Use 0 caso queira monitorar com o preço exato.',
    },
    notificar: { type: 'boolean', default: true, alias: 'enviarNotificacao' },
  })
}
