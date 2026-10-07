// A small ledger that balances entries by account.

type Currency = "EUR" | "BGN";

interface Entry {
  account: string;
  amount: number;
  currency: Currency;
}

const RATE_BGN_PER_EUR = 1.95583;

export class Ledger {
  private readonly entries: Entry[] = [];

  record(entry: Entry): this {
    if (!Number.isFinite(entry.amount)) {
      throw new RangeError(`Invalid amount for ${entry.account}`);
    }
    this.entries.push(entry);
    return this;
  }

  balance(account: string): number {
    return this.entries
      .filter((e) => e.account === account)
      .reduce((sum, e) => sum + toEuro(e), 0);
  }
}

function toEuro({ amount, currency }: Entry): number {
  return currency === "BGN" ? amount / RATE_BGN_PER_EUR : amount;
}
