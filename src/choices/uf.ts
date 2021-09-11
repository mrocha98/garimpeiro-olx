const ufs = [
  'ac',
  'al',
  'am',
  'ap',
  'ba',
  'ce',
  'df',
  'es',
  'go',
  'ma',
  'mg',
  'ms',
  'mt',
  'pa',
  'pb',
  'pe',
  'pi',
  'pr',
  'rj',
  'rn',
  'ro',
  'rr',
  'rs',
  'sc',
  'se',
  'sp',
  'to',
] as const

export type UF = typeof ufs[number]

export default ufs
