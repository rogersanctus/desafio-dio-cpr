/**
 * Mapa de Níveis por faixa de Saldo de Vitórias
**/
const VitoriasNivel = {
  'Ferro': { max: 10 },
  'Bronze': { min: 11, max: 20 },
  'Prata': { min: 21, max: 50 },
  'Ouro': { min: 51, max: 80 },
  'Diamante': { min: 81, max: 90 },
  'Lendário': { min: 91, max: 100 },
  'Imortal': { min: 101 },
}

function computeRank(vitorias, derrotas) {
  const saldoVitorias = vitorias - derrotas;

  const niveis = Object.keys(VitoriasNivel);
  let nivelRank = null

  for (let i = 0; i < niveis.length; i++) {
    const nivel = niveis[i];
    const limites = VitoriasNivel[nivel];

    let condition = !!limites.min || !!limites.max // Um limite precisa ter ao menos uma das bordas
    condition = condition && !limites.min || saldoVitorias >= limites.min // Se tem um mínimo, a condição deve respeitá-lo
    condition = condition && (!limites.max || saldoVitorias <= limites.max) // O mesmo pro caso de ter um máximo

    // O saldoVitorias está no limite do nivel atual
    if (condition) {
      nivelRank = nivel
      break
    }
  }

  return { saldoVitorias, nivel: nivelRank }
}

if (process.argv.length !== 4) {
  console.error('Favor passar os argumentos de comando: <vitorias> <derrotas>.\nExemplo: npm start 120 15')
  process.exit(1)
}

const [vitorias, derrotas] = process
  .argv
  .slice(2)
  .map(Number)

const { saldoVitorias, nivel } = computeRank(vitorias, derrotas)

if (nivel === null) {
  console.error(`Nível não encontrado no mapa de Níveis por Saldo de Vitórias para o saldo de: ${saldoVitorias}.`)
  process.exit(2)
}

console.log(`O Herói que tem saldo de ${saldoVitorias} está no nível de ${nivel}`)
