
export interface OracleScore {
  potential: number;
  catalyst_freshness: number;
  market_attention: number;
  risk_level: number;
}

export interface OracleOutput {
  stock_ticker: string;
  recommendation: 'BUY' | 'HOLD' | 'SELL' | 'MONITOR';
  scores: OracleScore;
  reasoning: string;
  risks: string[];
}
