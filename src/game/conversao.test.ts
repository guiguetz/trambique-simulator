import { describe, it, expect } from 'vitest'
import { converterVotosParaDinheiro, converterDinheiroParaVotos, calcularTick } from './conversao'

describe('converterVotosParaDinheiro', () => {
  it('converte 10% dos votos em dinheiro', () => {
    expect(converterVotosParaDinheiro(100, 0.1)).toBe(10)
  })

  it('retorna 0 com 0 votos', () => {
    expect(converterVotosParaDinheiro(0, 0.1)).toBe(0)
  })

  it('arredonda para inteiro', () => {
    expect(converterVotosParaDinheiro(15, 0.1)).toBe(1)
  })
})

describe('converterDinheiroParaVotos', () => {
  it('converte 10% do dinheiro em votos', () => {
    expect(converterDinheiroParaVotos(100, 0.1)).toBe(10)
  })

  it('retorna 0 com 0 dinheiro', () => {
    expect(converterDinheiroParaVotos(0, 0.1)).toBe(0)
  })

  it('arredonda para inteiro', () => {
    expect(converterDinheiroParaVotos(15, 0.1)).toBe(1)
  })
})

describe('calcularTick', () => {
  it('converte votos para dinheiro e vice-versa', () => {
    const resultado = calcularTick({
      votos: 100,
      dinheiro: 100,
      taxaVotosParaDinheiro: 0.1,
      taxaDinheiroParaVotos: 0.1,
      producaoVotos: 0,
      producaoDinheiro: 0,
    })
    expect(resultado.votos).toBe(110)    // 100 - 10 (convertido) + 10 (de dinheiro) + 0 (produção)
    expect(resultado.dinheiro).toBe(110) // 100 - 10 (convertido) + 10 (de votos) + 0 (produção)
  })

  it('inclui produção de geradores', () => {
    const resultado = calcularTick({
      votos: 0,
      dinheiro: 0,
      taxaVotosParaDinheiro: 0.1,
      taxaDinheiroParaVotos: 0.1,
      producaoVotos: 5,
      producaoDinheiro: 3,
    })
    expect(resultado.votos).toBe(5)
    expect(resultado.dinheiro).toBe(3)
  })

  it('não permite valores negativos', () => {
    const resultado = calcularTick({
      votos: 5,
      dinheiro: 5,
      taxaVotosParaDinheiro: 0.5,
      taxaDinheiroParaVotos: 0.5,
      producaoVotos: 0,
      producaoDinheiro: 0,
    })
    expect(resultado.votos).toBeGreaterThanOrEqual(0)
    expect(resultado.dinheiro).toBeGreaterThanOrEqual(0)
  })
})