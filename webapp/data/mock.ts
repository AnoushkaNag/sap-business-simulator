export function mockTransactions(){
  // Use a fixed base timestamp so SSR and client rendering match exactly
  const base = new Date('2026-04-16T22:55:34').getTime()
  const day = 24 * 60 * 60 * 1000
  const hour = 60 * 60 * 1000

  const tx = [
    { type: 'Purchase', amount: 500, ts: base - 6 * day },
    { type: 'Purchase', amount: 300, ts: base - 5 * day },
    { type: 'Sale', amount: 400, ts: base - 4 * day },
    { type: 'Sale', amount: 200, ts: base - 3 * day },
    { type: 'Purchase', amount: 150, ts: base - 2 * day },
    { type: 'Sale', amount: 600, ts: base - 1 * day },
    { type: 'Sale', amount: 250, ts: base - 12 * hour },
    { type: 'Purchase', amount: 100, ts: base - 6 * hour },
    { type: 'Sale', amount: 350, ts: base - 2 * hour },
  ]
  return tx.reverse()
}

export function mockSummary(){
  const tx = mockTransactions()
  const revenue = tx.filter(t=>t.type==='Sale').reduce((s,n)=>s+n.amount,0)
  const expenses = tx.filter(t=>t.type==='Purchase').reduce((s,n)=>s+n.amount,0)
  const profit = revenue - expenses
  return {
    revenue: `₹${revenue}`,
    expenses: `₹${expenses}`,
    profit: `₹${profit}`,
    revenueDelta: 12,
    expensesDelta: -4,
    profitDelta: 18,
    raw: 1200,
    finished: 450
  }
}
