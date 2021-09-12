const ordens = ['mais recentes', 'mais relevantes', 'menor preco'] as const

export type Ordem = typeof ordens[number]

export default ordens
