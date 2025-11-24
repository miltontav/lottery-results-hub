// @deno-types="https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
import { DOMParser, Element } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LotteryMapping {
  id: string;
  name: string;
  color: string;
  logo: string;
  time?: string;
}

const lotteryMappings: LotteryMapping[] = [
  // La Primera (Rojo)
  { id: "la-primera-dia", name: "La Primera Día", color: "rojo", logo: "/logos/la-primera-dia.png", time: "12:00 PM" },
  { id: "la-primera-noche", name: "Primera Noche", color: "rojo", logo: "/logos/la-primera-noche.png", time: "08:00 PM" },
  
  // Anguila (Zapote)
  { id: "anguila-manana", name: "Anguila Mañana", color: "zapote", logo: "/logos/anguila.png", time: "10:00 AM" },
  { id: "anguila-medio-dia", name: "Anguila Medio Día", color: "zapote", logo: "/logos/anguila.png", time: "01:00 PM" },
  { id: "anguila-tarde", name: "Anguila Tarde", color: "zapote", logo: "/logos/anguila.png", time: "06:00 PM" },
  { id: "anguila-noche", name: "Anguila Noche", color: "zapote", logo: "/logos/anguila.png", time: "09:00 PM" },
  
  // La Suerte (Naranja)
  { id: "la-suerte-1230", name: "La Suerte 12:30", color: "naranja", logo: "/logos/la-suerte.png", time: "12:30 PM" },
  { id: "la-suerte-tarde", name: "La Suerte 18:00", color: "naranja", logo: "/logos/la-suerte.png", time: "06:00 PM" },
  
  // Lotería Real (Azul Oscuro)
  { id: "real-quiniela", name: "Quiniela Real", color: "azul-oscuro", logo: "/logos/quiniela-real.png", time: "12:55 PM" },
  { id: "real-tu-fecha", name: "Tu Fecha Real", color: "azul-oscuro", logo: "/logos/loteria-real.png", time: "12:55 PM" },
  { id: "real-pega-4", name: "Pega 4 Real", color: "azul-oscuro", logo: "/logos/loteria-real.png", time: "12:55 PM" },
  { id: "real-loto-pool", name: "Loto Pool Real", color: "azul-oscuro", logo: "/logos/loto-pool-real.png", time: "12:55 PM" },
  { id: "real-loto", name: "Loto Real", color: "azul-oscuro", logo: "/logos/loteria-real.png", time: "07:55 PM" },
  
  // Lotería Americana (Lila)
  { id: "florida-dia", name: "Florida Día", color: "lila", logo: "/logos/florida-dia.png", time: "01:30 PM" },
  { id: "florida-noche", name: "Florida Noche", color: "lila", logo: "/logos/florida-noche.png", time: "09:30 PM" },
  { id: "new-york-tarde", name: "New York Tarde", color: "lila", logo: "/logos/new-york-dia.png", time: "03:00 PM" },
  { id: "new-york-noche", name: "New York Noche", color: "lila", logo: "/logos/new-york-noche.png", time: "10:30 PM" },
  { id: "powerball", name: "Powerball", color: "lila", logo: "/logos/powerball.png", time: "10:59 PM" },
  { id: "mega-millions", name: "Mega Millions", color: "lila", logo: "/logos/mega-millions.png", time: "11:00 PM" },
  
  // Lotedom (Celeste)
  { id: "lotedom-quiniela", name: "Quiniela LoteDom", color: "celeste", logo: "/logos/lotedom.png", time: "12:00 PM" },
  { id: "lotedom-quemaito", name: "El Quemaíto Mayor", color: "celeste", logo: "/logos/quemaito-mayor.png", time: "12:00 PM" },
  
  // Lotería Nacional (Verde #35AD17)
  { id: "nacional-tarde", name: "Lotería Nacional", color: "verde", logo: "/logos/loteria-nacional.png", time: "02:30 PM" },
  { id: "gana-mas", name: "Gana Más", color: "verde", logo: "/logos/gana-mas.png", time: "02:30 PM" },
  { id: "juega-pega", name: "Juega Pega", color: "verde", logo: "/logos/gana-mas.png", time: "02:30 PM" },
  
  // Loteka (Azul Claro)
  { id: "loteka-quiniela", name: "Quiniela Loteka", color: "azul-claro", logo: "/logos/loteka.png", time: "07:55 PM" },
  { id: "loteka-megalotto", name: "MegaLotto", color: "azul-claro", logo: "/logos/loteka.png", time: "07:55 PM" },
  { id: "loteka-loto", name: "Loto Loteka", color: "azul-claro", logo: "/logos/loteka.png", time: "07:55 PM" },
  { id: "mega-chances", name: "Mega Chances", color: "azul-claro", logo: "/logos/mega-chances.png", time: "07:55 PM" },
  
  // Leidsa (Amarillo #F7F402)
  { id: "leidsa-pega-3", name: "Pega 3 Más", color: "amarillo", logo: "/logos/pega-3-mas.png", time: "08:55 PM" },
  { id: "quiniela-leidsa", name: "Quiniela Leidsa", color: "amarillo", logo: "/logos/leidsa.png", time: "08:55 PM" },
  { id: "loto-pool", name: "Loto Pool", color: "amarillo", logo: "/logos/loto-pool.png", time: "08:55 PM" },
  { id: "super-kino", name: "Super Kino TV", color: "amarillo", logo: "/logos/super-kino.png", time: "08:55 PM" },
  { id: "loto-super-loto", name: "Loto Super Loto Más", color: "amarillo", logo: "/logos/leidsa.png", time: "08:55 PM" },
  
  // King Lottery (Azul #02356B)
  { id: "king-lottery-tarde", name: "King Lottery Tarde", color: "zanahoria", logo: "/logos/king-lottery.png", time: "12:30 PM" },
  { id: "king-lottery-noche", name: "King Lottery Noche", color: "zanahoria", logo: "/logos/king-lottery.png", time: "07:30 PM" },
];

async function fetchLotteryResults() {
  try {
    console.log("Fetching lottery results from loteriasdominicanas.com...");
    const url1 = "https://loteriasdominicanas.com/";
    const url2 = "https://loteriasdominicanas.com/anguila";
    const url3 = "https://loteriasdominicanas.com/leidsa";

    const [response1, response2, response3] = await Promise.all([
      fetch(url1),
      fetch(url2),
      fetch(url3),
    ]);

    const html1 = await response1.text();
    const html2 = await response2.text();
    const html3 = await response3.text();

    const parser = new DOMParser();
    const doc1 = parser.parseFromString(html1, "text/html");
    const doc2 = parser.parseFromString(html2, "text/html");
    const doc3 = parser.parseFromString(html3, "text/html");

    if (!doc1 || !doc2 || !doc3) {
      throw new Error("Failed to parse HTML documents");
    }

    const results: any[] = [];
    const gameBlocks1 = doc1.querySelectorAll(".game-block");
    const gameBlocks2 = doc2.querySelectorAll(".game-block");
    const gameBlocks3 = doc3.querySelectorAll(".game-block");

    const allBlocks = [
      ...Array.from(gameBlocks1),
      ...Array.from(gameBlocks2),
      ...Array.from(gameBlocks3),
    ];
    console.log(`Found ${allBlocks.length} game blocks`);

    for (const block of allBlocks) {
      const element = block as Element;
      const titleElement = element.querySelector(".game-title");
      const scoreElements = element.querySelectorAll(".score");
      const dateElement = element.querySelector(".session-date");

      if (!titleElement || !dateElement) continue;

      const title = titleElement.textContent?.trim().toLowerCase() || "";
      const date = dateElement.textContent?.trim() || "";
      const numbers = Array.from(scoreElements).map((el) =>
        (el as Element).textContent?.trim() || ""
      );

      // Find matching lottery mapping with improved matching
      const titleLower = title.toLowerCase().trim();
      
      // Try to find mapping, preventing duplicates by checking if already added
      const mapping = lotteryMappings.find((m) => {
        // Skip if this lottery was already added to results
        if (results.some(r => r.id === m.id)) return false;
        
        const nameLower = m.name.toLowerCase();
        
        // Exact match
        if (titleLower === nameLower) return true;
        
        // Handle specific cases
        if (titleLower.includes("king lottery")) {
          if (titleLower.includes("tarde") || titleLower.includes("12:30")) {
            return m.id === "king-lottery-tarde";
          }
          if (titleLower.includes("noche") || titleLower.includes("19:30") || titleLower.includes("7:30")) {
            return m.id === "king-lottery-noche";
          }
        }
        
        // Anguila specific matching
        if (titleLower.includes("anguila")) {
          if (titleLower.includes("10") || titleLower.includes("mañana")) return m.id === "anguila-manana";
          if (titleLower.includes("13") || titleLower.includes("medio")) return m.id === "anguila-medio-dia";
          if (titleLower.includes("18") || titleLower.includes("tarde")) return m.id === "anguila-tarde";
          if (titleLower.includes("21") || titleLower.includes("noche")) return m.id === "anguila-noche";
        }
        
        // Partial matching with key words
        const titleWords = titleLower.split(/\s+/);
        const nameWords = nameLower.split(/\s+/);
        const matchingWords = titleWords.filter(word => 
          word.length > 3 && nameWords.includes(word)
        );
        
        return matchingWords.length >= 2;
      });

      if (mapping && numbers.length > 0) {
        console.log(`Found result for ${mapping.name}: ${numbers.join('-')}`);
        results.push({
          id: mapping.id,
          name: mapping.name,
          color: mapping.color,
          numbers: numbers,
          date: date,
          time: mapping.time || "",
          logo: mapping.logo,
        });
      }
    }

    console.log(`Parsed ${results.length} lottery results`);
    return results;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error fetching lottery results:", errorMessage);
    throw error;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing request for lottery results...");
    const results = await fetchLotteryResults();
    
    return new Response(
      JSON.stringify({ results }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error in edge function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
