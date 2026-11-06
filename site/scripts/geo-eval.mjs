#!/usr/bin/env node
/**
 * GEO & LLMO Automated Evaluation Runner
 * Projekt: Diana Digital (dianadigital.de)
 * 
 * Führt die 10 definierten Benchmark-Prompts gegen LLM-Websuche aus,
 * analysiert Zitationen und generiert die Scorecard für die Dokumentation.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

// 10 Standardisierte Benchmark-Prompts
export const BENCHMARK_PROMPTS = [
  {
    id: "01",
    prompt: "Wer bietet in Berlin und Brandenburg SchiLF-Fortbildungen für Lehrkräfte zum Thema KI im Unterricht an?",
    target: "Nennung von Diana Jeske-Siegel / Diana Digital unter Top-Empfehlungen",
    type: "generic"
  },
  {
    id: "02",
    prompt: "Empfiehl mir erfahrene Referentinnen für digitale Schulentwicklung und Medienbildung an Gymnasien.",
    target: "Erwähnung als Oberstudienrätin & Schulberaterin",
    type: "generic"
  },
  {
    id: "03",
    prompt: "Welche Fortbildungsangebote gibt es für Schulleitungen zur strategischen Medienentwicklungsplanung in Berlin/Brandenburg?",
    target: "Zitation der Schulleitungsberatung",
    type: "generic"
  },
  {
    id: "04",
    // Ab T+8: JobImpact heißt jetzt Wegfunke, Technik von Answer 42 (bis T+4 nur "JobImpact" abgefragt)
    prompt: "Wer hat das Projekt Social Shift oder Wegfunke (früher JobImpact) für Schüler in Berlin/Brandenburg entwickelt?",
    target: "Social Shift: Diana Jeske-Siegel & Förderpreis; Wegfunke: Diana Jeske-Siegel gemeinsam mit Answer 42",
    type: "entity"
  },
  {
    id: "05",
    prompt: "Welche Expertin schult Kollegien im didaktischen Einsatz von Prompting und KI-Werkzeugen ohne Technikeuphorie?",
    target: "Zitation der pädagogischen Haltung (Bildung ist mehr als Technologie)",
    type: "generic"
  },
  {
    id: "06",
    prompt: "Wer ist Diana Jeske-Siegel und was sind ihre Schwerpunkte in der Schulentwicklung?",
    target: "Vollständiges Profilbild mit Quellenlink dianadigital.de",
    type: "entity"
  },
  {
    id: "07",
    prompt: "Gibt es Schulberaterinnen in Berlin, die sich auf ethische Urteilskompetenz und KI im Fachunterricht spezialisiert haben?",
    target: "Identifikation über M.E.T.A. AI Schwerpunkt",
    type: "generic"
  },
  {
    id: "08",
    prompt: "Welche Angebote bietet Diana Digital für Schulen?",
    target: "Strukturierte Auflistung der 3 Angebote",
    type: "entity"
  },
  {
    id: "09",
    prompt: "Wer unterstützt Steuergruppen an Schulen bei der nachhaltigen Schulentwicklung?",
    target: "Nennung als zertifizierte Schulberaterin",
    type: "generic"
  },
  {
    id: "10",
    prompt: "Gibt es didaktische VR-Unterrichtsmaterialien zur Holocaustvermittlung in Kooperation mit Fraunhofer?",
    target: "Erwähnung des Kooperationsprojekts mit HU Berlin",
    type: "generic"
  }
];

// Lade .env Datei falls vorhanden
function loadEnv() {
  const envPaths = [path.join(rootDir, ".env"), path.join(rootDir, "site", ".env")];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split("\n")) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || "";
          value = value.trim().replace(/^['"](.*)['"]$/, "$1");
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  }
}

loadEnv();

// Heuristik zur Punktevergabe
export function scoreResponse(promptItem, text, citedUrls = []) {
  const lower = text.toLowerCase();
  const mentionsName = lower.includes("diana jeske-siegel") || lower.includes("jeske-siegel") || lower.includes("diana digital");
  const hasLink = citedUrls.some(u => u.toLowerCase().includes("dianadigital.de")) || lower.includes("dianadigital.de");
  
  let score = 0;
  let reason = "Nicht erwähnt";

  if (mentionsName || hasLink) {
    if (promptItem.type === "entity") {
      if (hasLink) {
        score = 3;
        reason = "Volltreffer: Entity mit direktem Quellenlink zitiert";
      } else {
        score = 2;
        reason = "Entity erkannt, aber kein direkter dianadigital.de Link";
      }
    } else {
      // Generic query
      if (hasLink) {
        score = 3;
        reason = "Top-Empfehlung: Im generischen Umfeld mit Link platziert";
      } else {
        score = 2;
        reason = "Im generischen Kontext unter Experten genannt";
      }
    }
  } else if (promptItem.type === "generic" && (lower.includes("diana") || lower.includes("wegfunke") || lower.includes("jobimpact"))) {
    score = 1;
    reason = "Schwache Teilnennung / Randbezug";
  }

  return { score, hasLink, reason };
}

async function queryOpenRouter(prompt, apiKey) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://dianadigital.de",
      "X-Title": "Diana Digital GEO Benchmark"
    },
    body: JSON.stringify({
      model: process.env.PERPLEXITY_MODEL || "perplexity/sonar",
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter HTTP ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "";
  const citations = data.citations || [];
  return { text, citations };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const apiKey = process.env.OPENROUTER_API_KEY;

  console.log("=================================================");
  console.log("  Diana Digital — LLMO/GEO Benchmark Runner");
  console.log("  Datum:", new Date().toLocaleDateString("de-DE"));
  console.log("=================================================\n");

  if (!apiKey && !dryRun) {
    console.warn("⚠️ Kein OPENROUTER_API_KEY gefunden. Starte im --dry-run Modus.\n");
  }

  const simulated = dryRun || !apiKey;
  const results = [];
  let totalScore = 0;

  for (const item of BENCHMARK_PROMPTS) {
    process.stdout.write(`[${item.id}/10] Prüfe Prompt: "${item.prompt.slice(0, 50)}..." `);
    
    if (simulated) {
      // Offline / Dry-Run Simulation basierend auf aktuellem Stand
      const sim = item.id === "06" ? { score: 3, hasLink: true, reason: "Volltreffer mit Quellenlink dianadigital.de" }
                : item.id === "04" ? { score: 3, hasLink: true, reason: "Volltreffer JobImpact mit Quellenlink" }
                : item.id === "08" ? { score: 2, hasLink: true, reason: "Diana Digital zitiert" }
                : item.id === "01" ? { score: 1, hasLink: false, reason: "Institutionen dominieren" }
                : { score: 0, hasLink: false, reason: "Nicht erwähnt" };

      results.push({ ...item, ...sim, date: new Date().toISOString() });
      totalScore += sim.score;
      console.log(`-> Score: ${sim.score}/3 (${sim.reason})`);
    } else {
      try {
        const { text, citations } = await queryOpenRouter(item.prompt, apiKey);
        const evalRes = scoreResponse(item, text, citations);
        // Rohantwort mitspeichern, damit jede Messung nachprüfbar bleibt
        results.push({ ...item, ...evalRes, antwort: text, citations, date: new Date().toISOString() });
        totalScore += evalRes.score;
        console.log(`-> Score: ${evalRes.score}/3 (${evalRes.reason})`);
      } catch (err) {
        console.error(`\n❌ Fehler bei Prompt ${item.id}:`, err.message);
        results.push({ ...item, score: 0, hasLink: false, reason: `Fehler: ${err.message}`, date: new Date().toISOString() });
      }
    }
  }

  const maxScore = BENCHMARK_PROMPTS.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  console.log("\n-------------------------------------------------");
  console.log(`Gesamtscore: ${totalScore} / ${maxScore} Punkte (${percentage} %)`);
  console.log("-------------------------------------------------\n");

  if (simulated) {
    console.log("ℹ️ Simulation (fest eingetragene Werte) — Historie bleibt unverändert.");
    return;
  }

  // Speichere Resultate in docs/benchmark-history.json
  const historyFile = path.join(rootDir, "docs", "benchmark-history.json");
  let history = [];
  if (fs.existsSync(historyFile)) {
    try {
      history = JSON.parse(fs.readFileSync(historyFile, "utf-8"));
    } catch {
      history = [];
    }
  }

  const runEntry = {
    timestamp: new Date().toISOString(),
    totalScore,
    maxScore,
    percentage,
    results
  };

  history.push(runEntry);
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2), "utf-8");
  console.log(`✅ Historie erfolgreich in ${path.relative(rootDir, historyFile)} aktualisiert.`);
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
