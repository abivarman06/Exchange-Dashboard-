import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Cell
} from "recharts";
import { Plus, TrendingUp, TrendingDown, Scissors, X, ChevronDown, ChevronUp } from "lucide-react";

const SEED_LOG = [{"tournament": "Major League Cricket", "date": "2026-07-19", "match": "LAKR vs WF", "exchange": "Smarkets", "stake": 116.35, "lossCut": "Yes", "gross": 83.65, "net": 81.98, "roi": 0.7045724108, "cumulative": 81.98, "note": "Did trade without prediction. Just guessed that this will be see-saw. So did unmatched losscut on bothsides when the match is on equal strength and when one of them is matched then i did the bet in other side like my intention is to make more that \u00a320 cause my i did losscut for \u00a319. If its \u00a31 profit then its fine. I have just waited for the perfect odd and placed the bet on 1.95 with the liability of \u00a397.34. This match last until last ball 3runs needed for 1 ball and its runout. LAKR won."}, {"tournament": "Pondichery Premier League", "date": "2026-07-21", "match": "KAK vs MMS", "exchange": "Smarkets", "stake": 23.99, "lossCut": "No", "gross": -23.99, "net": -23.99, "roi": -1.0, "cumulative": 57.99, "note": "Try to trade without prediction. Cause of last match profit. "}, {"tournament": "The Hundred", "date": "2026-07-21", "match": "MIL vs SRL", "exchange": "Betfair", "stake": 15.0, "lossCut": "No", "gross": -15.0, "net": -15.0, "roi": -1.0, "cumulative": 42.99, "note": "Try to trade without prediction. Cause I can make new strategy. But its the usual bettors mindset. No more selfshit."}, {"tournament": "The Hundred", "date": "2026-07-22", "match": "SB vs WF", "exchange": "Smarkets", "stake": 84.58, "lossCut": "Yes", "gross": 2.81, "net": 2.75, "roi": 0.03255852447387089, "cumulative": 45.74, "note": "Same same. I am just loosing my own prediction made money. Thats it. Odds moved and i protected my capital."}, {"tournament": "Lanka Premier League", "date": "2026-07-25", "match": "KR vs GM", "exchange": "Betfair", "stake": 100.0, "lossCut": "No", "gross": 50.0, "net": 47.5, "roi": 0.475, "cumulative": 93.24, "note": "Anna said today no prediction cause of coimbatore journey. But gut wont stop me."}, {"tournament": "The Hundred", "date": "2026-07-25", "match": "SRL vs SB", "exchange": "Betfair", "stake": 120.0, "lossCut": "Yes", "gross": -13.0, "net": -13.0, "roi": -0.10833333333333334, "cumulative": 80.24, "note": "Again"}, {"tournament": "Lanka Premier League", "date": "2026-07-25", "match": "CK vs DS", "exchange": "Betfair", "stake": 139.02, "lossCut": "Yes", "gross": 28.16, "net": 26.75, "roi": 0.19243274349014527, "cumulative": 106.99, "note": "Again"}, {"tournament": "The Hundred", "date": "2026-07-25", "match": "WF vs MIL", "exchange": "Betfair", "stake": 112.05, "lossCut": "Yes", "gross": 20.1, "net": 19.09, "roi": 0.17041499330655957, "cumulative": 126.09, "note": "Again.Today without getting prediction and traded on 4 matches with \u00a3120 each gives me \u00a380.35"}, {"tournament": "Global Super League", "date": "2026-07-26", "match": "DV vs GAW", "exchange": "Betfair", "stake": 109.0, "lossCut": "Yes", "gross": 0.0, "net": 0.0, "roi": 0.0, "cumulative": 126.09, "note": "Losscut matched first. Then i entered."}, {"tournament": "Global Super League", "date": "2026-07-26", "match": "DV vs GAW", "exchange": "Smarkets", "stake": 119.0, "lossCut": "Yes", "gross": -0.28, "net": -0.28, "roi": -0.0023529411764705885, "cumulative": 125.81, "note": "Losscut matched first. Then i entered."}, {"tournament": "Maharani T20 Trophy", "date": "2026-07-26", "match": "MW vs HT", "exchange": "Betfair", "stake": 19.0, "lossCut": "No", "gross": -19.0, "net": -19.0, "roi": -1.0, "cumulative": 106.81, "note": "Did the bet at 3.3overs. And waited for the odds. But won't rise up even to protect my capital."}, {"tournament": "Global Super League", "date": "2026-07-27", "match": "GAW vs LQ", "exchange": "Betfair", "stake": 19.0, "lossCut": "No", "gross": -19.0, "net": -19.0, "roi": -1.0, "cumulative": 87.81, "note": "I forget that i placed the ummatched bet and slept at night . Morning i realized by saw the account balance in the morning."}, {"tournament": "Global Super League", "date": "2026-07-28", "match": "DV vs SFU", "exchange": "Betfair", "stake": 114.0, "lossCut": "Yes", "gross": 1.0, "net": 0.95, "roi": 0.008333333333333333, "cumulative": 88.76, "note": null}, {"tournament": "The Hundred", "date": "2026-07-28", "match": "MSG vs SL", "exchange": "Betfair", "stake": 371.98, "lossCut": "Yes", "gross": 0.02, "net": 0.02, "roi": 5.107801494704016e-05, "cumulative": 88.78, "note": null}, {"tournament": "Europian cricket", "date": "2026-07-29", "match": "EL vs AC", "exchange": "Betfair", "stake": 4.0, "lossCut": "No", "gross": -4.0, "net": -4.0, "roi": -1.0, "cumulative": 84.78, "note": null}, {"tournament": "Lanka Premier League", "date": "2026-07-29", "match": "KR vs GG", "exchange": "Betfair", "stake": 13.0, "lossCut": "Yes", "gross": 25.0, "net": 23.75, "roi": 1.8269230769230769, "cumulative": 108.53, "note": "It went well like roller Coaster"}, {"tournament": "Global Super League", "date": "2026-07-30", "match": "PS vs GAW", "exchange": "Smarkets", "stake": 18.0, "lossCut": "Yes", "gross": 0.41, "net": 0.4, "roi": 0.022322222222222222, "cumulative": 108.93, "note": "Did someunmatched bets and slept"}, {"tournament": "The Hundred Women", "date": "2026-07-31", "match": "TR vs MSG", "exchange": "Smarkets", "stake": 17.99, "lossCut": "Yes", "gross": 0.73, "net": 0.72, "roi": 0.039766536964980545, "cumulative": 109.64, "note": "I protected my capital. Just that. I can made profit on that point but i have waited for better odds. Thats fine."}, {"tournament": "The Hundred", "date": "2026-07-31", "match": "TR vs MSG", "exchange": "Smarkets", "stake": 17.99, "lossCut": "No", "gross": -17.99, "net": -17.99, "roi": -1.0, "cumulative": 91.65, "note": null}, {"tournament": "Global Super League", "date": "2026-08-01", "match": "SFU vs DV", "exchange": "Betfair", "stake": 57.0, "lossCut": "Yes", "gross": 8.0, "net": 7.6, "roi": 0.13333333333333333, "cumulative": 99.25, "note": "Got the money back at the edge. Iam playing for money and my mind is going on like you dont have to lose the money. You dont have to lose the money. My mind is in fear of losing the money. This way im not for this game now."}, {"tournament": "Lanka Premier League", "date": "2026-08-05", "match": "JK vs GG", "exchange": "Betfair", "stake": 30.0, "lossCut": "Yes", "gross": 12.49, "net": 11.87, "roi": 0.3955166666666666, "cumulative": 111.12, "note": null}, {"tournament": "The Hundred", "date": "2026-08-06", "match": "LS vs MIL", "exchange": "Betfair", "stake": 360.0, "lossCut": "No", "gross": 66.6, "net": 63.27, "roi": 0.17574999999999996, "cumulative": 174.39, "note": "Blind betting won."}, {"tournament": "International Twenty20 Matches", "date": "2026-08-06", "match": "Maxico vs Panama", "exchange": "Betfair", "stake": 359.35, "lossCut": "No", "gross": 12.53, "net": 11.9, "roi": 0.033125086962571305, "cumulative": 186.29, "note": "Bet at last"}, {"tournament": "International Twenty20 Matches", "date": "2026-08-06", "match": "Maxico vs Panama", "exchange": "Smarkets", "stake": 1.74, "lossCut": "No", "gross": -1.74, "net": -1.74, "roi": -1.0, "cumulative": 184.55, "note": null}, {"tournament": "Metro cup", "date": "2026-08-07", "match": "Essex vs Glamorgan", "exchange": "Betfair", "stake": 360.0, "lossCut": "No", "gross": 1.5, "net": 1.42, "roi": 0.003958333333333333, "cumulative": 185.98, "note": "Chaos happened"}, {"tournament": "Caribbean Premier League", "date": "2026-08-08", "match": "ABF vs JKM", "exchange": "Betfair", "stake": 361.0, "lossCut": "No", "gross": 121.84, "net": 115.75, "roi": 0.32063157894736843, "cumulative": 301.73, "note": "No losscut. 1ball, 2 runs needed. Did 2. Match ended. Perfect."}, {"tournament": "The Hundred Women", "date": "2026-08-08", "match": "TR vs MIL", "exchange": "Betfair", "stake": 360.0, "lossCut": "No", "gross": 55.25, "net": 52.49, "roi": 0.14579861111111111, "cumulative": 354.21, "note": "Did trade at a end"}, {"tournament": "TamilNadu Premier League ", "date": "2026-08-08", "match": "MP vs LKK", "exchange": "Betfair", "stake": 360.0, "lossCut": "No", "gross": -289.67, "net": -289.67, "roi": -0.8046388888888889, "cumulative": 64.54, "note": "Did 18trades and lost these much. By not doing the losscut."}, {"tournament": "Caribbean Premier League ", "date": "2026-08-09", "match": "SKNP vs TKR", "exchange": "Betfair", "stake": 21.0, "lossCut": "No", "gross": -21.0, "net": -21.0, "roi": -1.0, "cumulative": 43.54, "note": "One side match. I an sure by the analytics that TKR is much more stornger even though i did the losscut. I want to know this is good or bad"}, {"tournament": "The Hundred women", "date": "2026-08-10", "match": "TR W vs SB W", "exchange": "Betfair", "stake": 25.6, "lossCut": "Yes", "gross": 14.4, "net": 13.68, "roi": 0.5343749999999999, "cumulative": 57.22, "note": "Did proper los ut and got the profit."}, {"tournament": "The Hundred", "date": "2026-08-10", "match": "SB vs TR", "exchange": "Betfair", "stake": 296.0, "lossCut": "Yes", "gross": 114.0, "net": 108.3, "roi": 0.3658783783783784, "cumulative": 165.52, "note": "Got the profit by the the middle of the match. It was a high favourable matches for TR then odds came and i did losscut and bet against them. "}, {"tournament": "Caribbean Premier League ", "date": "2026-08-14", "match": "JKM vs GAW", "exchange": "Betfair", "stake": 60.0, "lossCut": "No", "gross": -60.0, "net": -60.0, "roi": -1.0, "cumulative": 105.52, "note": "Try to do the losscut. Then the odds goes one side."}, {"tournament": "The Hundred Women", "date": "2026-08-14", "match": "SRL W vs SB W", "exchange": "Betfair", "stake": 315.0, "lossCut": "No", "gross": 45.0, "net": 42.75, "roi": 0.1357142857142857, "cumulative": 148.27, "note": "49 run needed in 51 balls. Match won."}];

const EXCHANGES = ["Betfair", "Smarkets", "Matchbook"];
const COMMISSION = { Betfair: 0.05, Smarkets: 0.02, Matchbook: 0.02 };
const EXCHANGE_COLOR = { Betfair: "#F2B705", Smarkets: "#3FB68B", Matchbook: "#8C97AF" };

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function fmtGBP(n) {
  const v = Number(n) || 0;
  const sign = v < 0 ? "-" : "";
  return `${sign}£${Math.abs(v).toFixed(2)}`;
}

function fmtPct(n) {
  return `${((Number(n) || 0) * 100).toFixed(1)}%`;
}

function normalizeSeed(seed) {
  return seed.map((r) => ({
    id: uid(),
    tournament: r.tournament || "",
    date: r.date || "",
    match: r.match || "",
    exchange: r.exchange || "Betfair",
    betType: "Back",
    stake: r.stake ?? 0,
    odds: "",
    liability: r.stake ?? 0,
    lossCut: r.lossCut === "Yes",
    gross: r.gross ?? 0,
    net: r.net ?? 0,
    note: r.note || "",
    historic: true,
  }));
}

function computeNet(gross, exchange) {
  const g = Number(gross) || 0;
  if (g <= 0) return g;
  const c = COMMISSION[exchange] ?? 0.03;
  return g * (1 - c);
}

function computeLiability(betType, stake, odds) {
  const s = Number(stake) || 0;
  const o = Number(odds) || 0;
  if (betType === "Lay" && o > 1) return s * (o - 1);
  return s;
}

const STORAGE_KEY = "exchange-ledger:entries";

export default function App() {
  const [entries, setEntries] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [exchangeFilter, setExchangeFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [expandedNote, setExpandedNote] = useState(null);
  const [saveState, setSaveState] = useState("idle");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEntries(JSON.parse(raw));
      } else {
        setEntries(normalizeSeed(SEED_LOG));
      }
    } catch (e) {
      setEntries(normalizeSeed(SEED_LOG));
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next) => {
    setEntries(next);
    setSaveState("saving");
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1200);
    } catch (e) {
      setSaveState("error");
    }
  }, []);

  const addEntry = useCallback((entry) => {
    setEntries((prev) => {
      const next = [entry, ...(prev || [])];
      persist(next);
      return next;
    });
  }, [persist]);

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => {
      const next = (prev || []).filter((e) => e.id !== id);
      persist(next);
      return next;
    });
  }, [persist]);

  const filtered = useMemo(() => {
    if (!entries) return [];
    const sorted = [...entries].sort((a, b) => (a.date < b.date ? 1 : -1));
    if (exchangeFilter === "All") return sorted;
    return sorted.filter((e) => e.exchange === exchangeFilter);
  }, [entries, exchangeFilter]);

  const stats = useMemo(() => {
    const list = filtered;
    const totalStake = list.reduce((s, e) => s + (Number(e.stake) || 0), 0);
    const totalNet = list.reduce((s, e) => s + (Number(e.net) || 0), 0);
    const lossCutCount = list.filter((e) => e.lossCut).length;
    const lossCutRate = list.length ? lossCutCount / list.length : 0;
    const avgRoi = totalStake ? totalNet / totalStake : 0;
    const wins = list.filter((e) => (Number(e.net) || 0) > 0).length;
    const winRate = list.length ? wins / list.length : 0;
    const matches = new Set(list.map((e) => e.date + "|" + e.match)).size;
    return { totalStake, totalNet, lossCutRate, avgRoi, winRate, matches };
  }, [filtered]);

  const tournamentAgg = useMemo(() => {
    const map = {};
    filtered.forEach((e) => {
      if (!e.tournament) return;
      map[e.tournament] = (map[e.tournament] || 0) + (Number(e.net) || 0);
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [filtered]);

  const cumulativeSeries = useMemo(() => {
    const asc = [...filtered].sort((a, b) => (a.date > b.date ? 1 : -1));
    let running = 0;
    return asc.map((e, i) => {
      running += Number(e.net) || 0;
      return { idx: i + 1, cum: Math.round(running * 100) / 100, date: e.date };
    });
  }, [filtered]);

  if (!loaded) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingDigits}>LOADING LEDGER…</div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <FontLoader />
      <div style={styles.scanlines} />

      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.brandRow}>
            <div style={styles.brandMark}>◧</div>
            <div>
              <div style={styles.brandTitle}>EXCHANGE LEDGER</div>
              <div style={styles.brandSub}>Personal cricket trading log</div>
            </div>
          </div>
        </div>
        <div style={styles.saveIndicator}>
          {saveState === "saving" && <span style={{ color: "#8C97AF" }}>Saving…</span>}
          {saveState === "saved" && <span style={{ color: "#3FB68B" }}>Saved ✓</span>}
          {saveState === "error" && <span style={{ color: "#E85D5D" }}>Save failed</span>}
        </div>
      </header>

      <nav style={styles.tabBar}>
        {["dashboard", "log"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              ...styles.tabBtn,
              ...(tab === t ? styles.tabBtnActive : {}),
            }}
          >
            {t === "dashboard" ? "Scoreboard" : "Ledger"}
          </button>
        ))}
        <div style={styles.exchangeTabs}>
          {["All", ...EXCHANGES].map((ex) => (
            <button
              key={ex}
              onClick={() => setExchangeFilter(ex)}
              style={{
                ...styles.exBtn,
                ...(exchangeFilter === ex
                  ? { borderColor: ex === "All" ? "#F2B705" : EXCHANGE_COLOR[ex], color: "#EDEFF4" }
                  : {}),
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </nav>

      {tab === "dashboard" && (
        <main style={styles.main}>
          <section style={styles.scoreboardGrid}>
            <KpiCard label="TOTAL STAKED" value={fmtGBP(stats.totalStake)} accent="#8C97AF" />
            <KpiCard
              label="NET P/L"
              value={fmtGBP(stats.totalNet)}
              accent={stats.totalNet >= 0 ? "#3FB68B" : "#E85D5D"}
              icon={stats.totalNet >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            />
            <KpiCard label="AVG ROI" value={fmtPct(stats.avgRoi)} accent={stats.avgRoi >= 0 ? "#3FB68B" : "#E85D5D"} />
            <KpiCard label="LOSS-CUT RATE" value={fmtPct(stats.lossCutRate)} accent="#F2B705" icon={<Scissors size={14} />} />
            <KpiCard label="WIN RATE" value={fmtPct(stats.winRate)} accent="#F2B705" />
            <KpiCard label="MATCHES" value={String(stats.matches)} accent="#8C97AF" />
          </section>

          <section style={styles.chartsRow}>
            <div style={styles.panel}>
              <div style={styles.panelTitle}>TOP TOURNAMENTS · NET P/L</div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={tournamentAgg} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#24314A" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#8C97AF", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }} stroke="#24314A" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    tick={{ fill: "#EDEFF4", fontSize: 11, fontFamily: "Inter, sans-serif" }}
                    stroke="#24314A"
                  />
                  <Tooltip
                    formatter={(v) => fmtGBP(v)}
                    contentStyle={{ background: "#121B2E", border: "1px solid #24314A", borderRadius: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}
                    labelStyle={{ color: "#8C97AF" }}
                  />
                  <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                    {tournamentAgg.map((entry, i) => (
                      <Cell key={i} fill={entry.value >= 0 ? "#3FB68B" : "#E85D5D"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={styles.panel}>
              <div style={styles.panelTitle}>CUMULATIVE P/L OVER TIME</div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={cumulativeSeries} margin={{ left: 0, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#24314A" />
                  <XAxis dataKey="idx" tick={{ fill: "#8C97AF", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }} stroke="#24314A" />
                  <YAxis tick={{ fill: "#8C97AF", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }} stroke="#24314A" />
                  <Tooltip
                    formatter={(v) => fmtGBP(v)}
                    contentStyle={{ background: "#121B2E", border: "1px solid #24314A", borderRadius: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}
                    labelFormatter={(_, p) => (p && p[0] ? p[0].payload.date : "")}
                  />
                  <Line type="monotone" dataKey="cum" stroke="#F2B705" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <ExchangeBreakdown entries={filtered} />
        </main>
      )}

      {tab === "log" && (
        <main style={styles.main}>
          <div style={styles.logHeader}>
            <div style={styles.panelTitle}>LEDGER · {filtered.length} ENTRIES</div>
            <button style={styles.addBtn} onClick={() => setFormOpen(true)}>
              <Plus size={16} /> Log a trade
            </button>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Date", "Match", "Exchange", "Type", "Stake", "Liability", "Loss-cut", "Net P/L", "ROI"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <React.Fragment key={e.id}>
                    <tr
                      style={styles.tr}
                      onClick={() => setExpandedNote(expandedNote === e.id ? null : e.id)}
                    >
                      <td style={styles.tdMono}>{e.date}</td>
                      <td style={styles.td}>
                        <div style={{ fontWeight: 600 }}>{e.match}</div>
                        <div style={styles.subtext}>{e.tournament}</div>
                      </td>
                      <td style={styles.td}>
                        <span style={{ ...styles.pill, borderColor: EXCHANGE_COLOR[e.exchange], color: EXCHANGE_COLOR[e.exchange] }}>
                          {e.exchange}
                        </span>
                      </td>
                      <td style={styles.td}>{e.betType || "—"}</td>
                      <td style={styles.tdMono}>{fmtGBP(e.stake)}</td>
                      <td style={styles.tdMono}>{fmtGBP(e.liability)}</td>
                      <td style={styles.td}>
                        {e.lossCut ? <Scissors size={14} color="#F2B705" /> : <span style={styles.subtext}>—</span>}
                      </td>
                      <td style={{ ...styles.tdMono, color: (Number(e.net) || 0) >= 0 ? "#3FB68B" : "#E85D5D", fontWeight: 700 }}>
                        {fmtGBP(e.net)}
                      </td>
                      <td style={{ ...styles.tdMono, color: (Number(e.net) || 0) >= 0 ? "#3FB68B" : "#E85D5D" }}>
                        {e.stake ? fmtPct(e.net / e.stake) : "—"}
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          {e.note ? (expandedNote === e.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />) : null}
                          {!e.historic && (
                            <button
                              onClick={(ev) => { ev.stopPropagation(); deleteEntry(e.id); }}
                              style={styles.deleteBtn}
                              aria-label="Delete entry"
                            >
                              <X size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedNote === e.id && e.note && (
                      <tr>
                        <td colSpan={10} style={styles.noteRow}>{e.note}</td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {formOpen && <AddTradeForm onClose={() => setFormOpen(false)} onSave={addEntry} />}
    </div>
  );
}

function KpiCard({ label, value, accent, icon }) {
  return (
    <div style={styles.kpiCard}>
      <div style={styles.kpiLabel}>{label}</div>
      <div style={{ ...styles.kpiValue, color: accent }}>
        {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
        {value}
      </div>
    </div>
  );
}

function ExchangeBreakdown({ entries }) {
  const agg = useMemo(() => {
    const map = {};
    EXCHANGES.forEach((ex) => (map[ex] = { stake: 0, net: 0, count: 0 }));
    entries.forEach((e) => {
      if (!map[e.exchange]) map[e.exchange] = { stake: 0, net: 0, count: 0 };
      map[e.exchange].stake += Number(e.stake) || 0;
      map[e.exchange].net += Number(e.net) || 0;
      map[e.exchange].count += 1;
    });
    return map;
  }, [entries]);

  return (
    <section style={styles.panel}>
      <div style={styles.panelTitle}>BY EXCHANGE</div>
      <div style={styles.exGrid}>
        {EXCHANGES.map((ex) => (
          <div key={ex} style={{ ...styles.exCard, borderLeft: `3px solid ${EXCHANGE_COLOR[ex]}` }}>
            <div style={{ color: EXCHANGE_COLOR[ex], fontWeight: 700, fontFamily: "Space Grotesk, sans-serif" }}>{ex}</div>
            <div style={styles.exStatRow}>
              <span style={styles.subtext}>Trades</span>
              <span style={styles.mono}>{agg[ex].count}</span>
            </div>
            <div style={styles.exStatRow}>
              <span style={styles.subtext}>Staked</span>
              <span style={styles.mono}>{fmtGBP(agg[ex].stake)}</span>
            </div>
            <div style={styles.exStatRow}>
              <span style={styles.subtext}>Net P/L</span>
              <span style={{ ...styles.mono, color: agg[ex].net >= 0 ? "#3FB68B" : "#E85D5D", fontWeight: 700 }}>
                {fmtGBP(agg[ex].net)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AddTradeForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    tournament: "",
    date: new Date().toISOString().slice(0, 10),
    match: "",
    exchange: "Betfair",
    betType: "Back",
    stake: "",
    odds: "",
    gross: "",
    lossCut: false,
    note: "",
  });

  const liability = computeLiability(form.betType, form.stake, form.odds);
  const net = computeNet(form.gross, form.exchange);

  const set = (k) => (ev) => {
    const v = ev && ev.target ? (ev.target.type === "checkbox" ? ev.target.checked : ev.target.value) : ev;
    setForm((f) => ({ ...f, [k]: v }));
  };

  const canSave = form.match.trim() && form.stake !== "" && form.date;

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      id: uid(),
      tournament: form.tournament || "Uncategorised",
      date: form.date,
      match: form.match,
      exchange: form.exchange,
      betType: form.betType,
      stake: Number(form.stake) || 0,
      odds: form.odds,
      liability,
      lossCut: !!form.lossCut,
      gross: Number(form.gross) || 0,
      net,
      note: form.note,
      historic: false,
    });
    onClose();
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div style={styles.panelTitle}>LOG A TRADE</div>
          <button style={styles.iconBtn} onClick={onClose}><X size={18} /></button>
        </div>

        <div style={styles.formGrid}>
          <Field label="Tournament / League">
            <input style={styles.input} value={form.tournament} onChange={set("tournament")} placeholder="e.g. The Hundred" />
          </Field>
          <Field label="Date">
            <input type="date" style={styles.input} value={form.date} onChange={set("date")} />
          </Field>
          <Field label="Match">
            <input style={styles.input} value={form.match} onChange={set("match")} placeholder="e.g. LAKR vs WF" />
          </Field>
          <Field label="Exchange">
            <select style={styles.input} value={form.exchange} onChange={set("exchange")}>
              {EXCHANGES.map((ex) => <option key={ex} value={ex}>{ex}</option>)}
            </select>
          </Field>
          <Field label="Bet type">
            <div style={styles.segmented}>
              {["Back", "Lay"].map((bt) => (
                <button
                  key={bt}
                  style={{ ...styles.segBtn, ...(form.betType === bt ? styles.segBtnActive : {}) }}
                  onClick={() => setForm((f) => ({ ...f, betType: bt }))}
                  type="button"
                >
                  {bt}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Odds taken">
            <input type="number" step="0.01" style={styles.input} value={form.odds} onChange={set("odds")} placeholder="1.95" />
          </Field>
          <Field label="Stake (£)">
            <input type="number" step="0.01" style={styles.input} value={form.stake} onChange={set("stake")} placeholder="100.00" />
          </Field>
          <Field label="Liability (auto)">
            <div style={styles.readout}>{fmtGBP(liability)}</div>
          </Field>
          <Field label="Gross P/L (£)">
            <input type="number" step="0.01" style={styles.input} value={form.gross} onChange={set("gross")} placeholder="e.g. -20 or 45.50" />
          </Field>
          <Field label={`Net P/L (auto, ${(COMMISSION[form.exchange] * 100).toFixed(0)}% comm.)`}>
            <div style={{ ...styles.readout, color: net >= 0 ? "#3FB68B" : "#E85D5D" }}>{fmtGBP(net)}</div>
          </Field>
          <Field label="Loss-cut executed?">
            <label style={styles.checkboxRow}>
              <input type="checkbox" checked={form.lossCut} onChange={set("lossCut")} />
              <span>Yes, I cut losses on this trade</span>
            </label>
          </Field>
          <Field label="Notes" full>
            <textarea style={{ ...styles.input, minHeight: 70, resize: "vertical" }} value={form.note} onChange={set("note")} placeholder="Strategy, read, what happened…" />
          </Field>
        </div>

        <div style={styles.modalFooter}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={{ ...styles.addBtn, opacity: canSave ? 1 : 0.5 }} onClick={handleSave} disabled={!canSave}>
            Save trade
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <div style={styles.fieldLabel}>{label}</div>
      {children}
    </div>
  );
}

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
      * { box-sizing: border-box; }
      body { margin: 0; }
      ::selection { background: #F2B70533; }
      input:focus, select:focus, textarea:focus, button:focus-visible {
        outline: 2px solid #F2B705;
        outline-offset: 1px;
      }
    `}</style>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0B1220",
    color: "#EDEFF4",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    paddingBottom: 60,
  },
  loadingScreen: {
    minHeight: "100vh",
    background: "#0B1220",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingDigits: {
    fontFamily: "'JetBrains Mono', monospace",
    color: "#F2B705",
    letterSpacing: 3,
    fontSize: 14,
  },
  scanlines: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)",
    zIndex: 0,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 32px 12px",
  },
  headerLeft: {},
  brandRow: { display: "flex", alignItems: "center", gap: 12 },
  brandMark: {
    fontSize: 24,
    color: "#F2B705",
    fontFamily: "'JetBrains Mono', monospace",
  },
  brandTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: 1,
  },
  brandSub: {
    color: "#8C97AF",
    fontSize: 12,
    marginTop: 2,
  },
  saveIndicator: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    minWidth: 90,
    textAlign: "right",
  },
  tabBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0 32px",
    borderBottom: "1px solid #24314A",
    flexWrap: "wrap",
  },
  tabBtn: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    color: "#8C97AF",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    padding: "12px 4px",
    marginRight: 20,
    cursor: "pointer",
  },
  tabBtnActive: {
    color: "#EDEFF4",
    borderBottom: "2px solid #F2B705",
  },
  exchangeTabs: {
    marginLeft: "auto",
    display: "flex",
    gap: 8,
    paddingBottom: 8,
  },
  exBtn: {
    background: "#121B2E",
    border: "1px solid #24314A",
    color: "#8C97AF",
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 12,
    fontFamily: "'JetBrains Mono', monospace",
    cursor: "pointer",
  },
  main: {
    padding: "24px 32px",
    position: "relative",
    zIndex: 1,
  },
  scoreboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 12,
    marginBottom: 20,
  },
  kpiCard: {
    background: "linear-gradient(180deg, #121B2E 0%, #0F1728 100%)",
    border: "1px solid #24314A",
    borderRadius: 8,
    padding: "16px 18px",
  },
  kpiLabel: {
    fontSize: 10.5,
    letterSpacing: 1.2,
    color: "#8C97AF",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: 8,
  },
  kpiValue: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 24,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
  },
  chartsRow: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 16,
    marginBottom: 16,
  },
  panel: {
    background: "#121B2E",
    border: "1px solid #24314A",
    borderRadius: 8,
    padding: 18,
  },
  panelTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 12.5,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#EDEFF4",
    marginBottom: 14,
  },
  exGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },
  exCard: {
    background: "#0F1728",
    borderRadius: 6,
    padding: "12px 14px",
  },
  exStatRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
    fontSize: 13,
  },
  mono: { fontFamily: "'JetBrains Mono', monospace" },
  subtext: { color: "#8C97AF", fontSize: 11.5 },
  logHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  addBtn: {
    background: "#F2B705",
    color: "#0B1220",
    border: "none",
    borderRadius: 6,
    padding: "9px 16px",
    fontWeight: 700,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
  },
  tableWrap: {
    background: "#121B2E",
    border: "1px solid #24314A",
    borderRadius: 8,
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 820,
  },
  th: {
    textAlign: "left",
    fontSize: 10.5,
    letterSpacing: 0.8,
    color: "#8C97AF",
    fontWeight: 600,
    padding: "12px 14px",
    borderBottom: "1px solid #24314A",
    whiteSpace: "nowrap",
  },
  tr: {
    borderBottom: "1px solid #1a2438",
    cursor: "pointer",
  },
  td: {
    padding: "12px 14px",
    fontSize: 13,
    verticalAlign: "middle",
  },
  tdMono: {
    padding: "12px 14px",
    fontSize: 13,
    fontFamily: "'JetBrains Mono', monospace",
    whiteSpace: "nowrap",
  },
  pill: {
    border: "1px solid",
    borderRadius: 20,
    padding: "2px 10px",
    fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
  },
  noteRow: {
    padding: "10px 20px 18px",
    fontSize: 12.5,
    color: "#8C97AF",
    background: "#0F1728",
    lineHeight: 1.6,
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#8C97AF",
    cursor: "pointer",
    padding: 2,
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(5,8,15,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    padding: 20,
  },
  modal: {
    background: "#121B2E",
    border: "1px solid #24314A",
    borderRadius: 10,
    padding: 24,
    width: "100%",
    maxWidth: 640,
    maxHeight: "88vh",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconBtn: {
    background: "transparent",
    border: "none",
    color: "#8C97AF",
    cursor: "pointer",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  fieldLabel: {
    fontSize: 11,
    color: "#8C97AF",
    marginBottom: 6,
    fontWeight: 600,
  },
  input: {
    width: "100%",
    background: "#0F1728",
    border: "1px solid #24314A",
    borderRadius: 6,
    padding: "9px 10px",
    color: "#EDEFF4",
    fontSize: 13,
    fontFamily: "'Inter', sans-serif",
  },
  readout: {
    background: "#0F1728",
    border: "1px solid #24314A",
    borderRadius: 6,
    padding: "9px 10px",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    color: "#EDEFF4",
  },
  segmented: {
    display: "flex",
    border: "1px solid #24314A",
    borderRadius: 6,
    overflow: "hidden",
  },
  segBtn: {
    flex: 1,
    background: "#0F1728",
    border: "none",
    color: "#8C97AF",
    padding: "9px 10px",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  segBtnActive: {
    background: "#F2B705",
    color: "#0B1220",
    fontWeight: 700,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12.5,
    color: "#8C97AF",
    paddingTop: 8,
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },
  cancelBtn: {
    background: "transparent",
    border: "1px solid #24314A",
    color: "#8C97AF",
    borderRadius: 6,
    padding: "9px 16px",
    fontSize: 13,
    cursor: "pointer",
  },
};
