import { Router } from "express";
import { readLeaderboard, writeLeaderboard, type LbEntry } from "../data/db.js";

const router = Router();

function checkAndResetPeriods() {
  const db = readLeaderboard();
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const lastDaily = db.lastResetDaily.slice(0, 10);
  if (today !== lastDaily) {
    db.daily = [];
    db.lastResetDaily = now.toISOString();
  }
  const weekStart = getWeekStart(now);
  const lastWeekStart = getWeekStart(new Date(db.lastResetWeekly));
  if (weekStart !== lastWeekStart) {
    db.weekly = [];
    db.lastResetWeekly = now.toISOString();
  }
  writeLeaderboard(db);
  return db;
}

function getWeekStart(d: Date): string {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const mon = new Date(d);
  mon.setDate(diff);
  return mon.toISOString().slice(0, 10);
}

router.get("/leaderboard", (req, res) => {
  const tab = (req.query["tab"] as string) || "daily";
  const db = checkAndResetPeriods();
  const validTabs = ["daily", "weekly", "all", "kills"] as const;
  const key = validTabs.includes(tab as typeof validTabs[number])
    ? (tab as typeof validTabs[number])
    : "daily";

  const entries = db[key]
    .sort((a, b) => (key === "kills" ? b.kills - a.kills : b.score - a.score))
    .slice(0, 50)
    .map((e, i) => ({
      rank: i + 1,
      name: e.username,
      score: key === "kills" ? e.kills : e.score,
      kills: e.kills,
      rankId: e.rankId,
      userId: e.userId,
    }));

  res.json({ entries });
});

export function updateLeaderboardEntry(entry: Omit<LbEntry, "updatedAt">) {
  const db = checkAndResetPeriods();
  const updatedAt = new Date().toISOString();
  const full: LbEntry = { ...entry, updatedAt };

  for (const key of ["daily", "weekly", "all"] as const) {
    const idx = db[key].findIndex((e) => e.userId === entry.userId);
    if (idx >= 0) {
      if (entry.score > db[key][idx].score) db[key][idx] = full;
    } else {
      db[key].push(full);
    }
  }

  const killsIdx = db.kills.findIndex((e) => e.userId === entry.userId);
  if (killsIdx >= 0) {
    if (entry.kills > db.kills[killsIdx].kills) db.kills[killsIdx] = full;
  } else {
    db.kills.push(full);
  }

  writeLeaderboard(db);
}

export default router;
