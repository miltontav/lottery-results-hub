import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching lottery results from external sources...');
    
    // Simulamos datos de API externa por ahora
    // En producción, aquí se harían llamadas a APIs oficiales
    const currentDate = new Date().toLocaleDateString('es-DO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    const results = [
      // 12:00 PM: La Primera
      {
        id: "la-primera",
        name: "La Primera",
        color: "rojo",
        numbers: ["23", "45", "67"],
        date: currentDate,
        time: "12:00 PM",
        logo: "/logos/la-primera.png"
      },
      
      // 12:30 PM: La Suerte Dominicana
      {
        id: "la-suerte",
        name: "La Suerte Dominicana",
        color: "naranja",
        numbers: ["34", "56", "78"],
        date: currentDate,
        time: "12:30 PM",
        logo: "/logos/la-suerte.png"
      },
      
      // 12:55 PM: Lotería Real (Tu Fecha, Pega 4, Loto Pool y Quiniela)
      {
        id: "real-quiniela",
        name: "Quiniela Real",
        color: "azul-oscuro",
        numbers: ["34", "67", "12"],
        date: currentDate,
        time: "12:55 PM",
        logo: "/logos/loteria-real.png"
      },
      {
        id: "real-tu-fecha",
        name: "Tu Fecha Real",
        color: "azul-oscuro",
        numbers: ["15", "08", "95"],
        date: currentDate,
        time: "12:55 PM",
        logo: "/logos/loteria-real.png"
      },
      {
        id: "real-pega-4",
        name: "Pega 4 Real",
        color: "azul-oscuro",
        numbers: ["1234"],
        date: currentDate,
        time: "12:55 PM",
        logo: "/logos/loteria-real.png"
      },
      {
        id: "real-loto-pool",
        name: "Loto Pool Real",
        color: "azul-oscuro",
        numbers: ["07", "15", "23", "31", "42"],
        date: currentDate,
        time: "12:55 PM",
        logo: "/logos/loteria-real.png"
      },
      
      // 2:30 PM: Lotería Nacional, Juega+ Pega+, Gana Más
      {
        id: "nacional-tarde",
        name: "Lotería Nacional",
        color: "verde",
        numbers: ["97", "79", "36"],
        date: currentDate,
        time: "02:30 PM",
        logo: "/logos/loteria-nacional.png"
      },
      {
        id: "juega-pega",
        name: "Juega+ Pega+",
        color: "verde",
        numbers: ["45", "87", "22", "13", "99"],
        date: currentDate,
        time: "02:30 PM",
        logo: "/logos/juega-pega.png"
      },
      {
        id: "gana-mas",
        name: "Gana Más",
        color: "verde",
        numbers: ["95", "31", "57"],
        date: currentDate,
        time: "02:30 PM",
        logo: "/logos/gana-mas.png"
      },
      
      // 2:55 PM: LoteDom (Quiniela, Quemaito)
      {
        id: "lotedom-quiniela",
        name: "Quiniela LoteDom",
        color: "celeste",
        numbers: ["45", "67", "89"],
        date: currentDate,
        time: "02:55 PM",
        logo: "/logos/lotedom.png"
      },
      {
        id: "lotedom-quemaito",
        name: "Quemaito LoteDom",
        color: "celeste",
        numbers: ["23", "45"],
        date: currentDate,
        time: "02:55 PM",
        logo: "/logos/lotedom.png"
      },
      
      // 7:55 PM: Loteka (MegaLotto, Quiniela Loteka, Mega Chances, MC Repartidera, El Extra, Toca 3)
      {
        id: "loteka-megalotto",
        name: "MegaLotto",
        color: "azul-claro",
        numbers: ["07", "11", "21", "27", "33", "42"],
        date: currentDate,
        time: "07:55 PM",
        logo: "/logos/loteka.png"
      },
      {
        id: "loteka-quiniela",
        name: "Quiniela Loteka",
        color: "azul-claro",
        numbers: ["89", "34", "12"],
        date: currentDate,
        time: "07:55 PM",
        logo: "/logos/loteka.png"
      },
      {
        id: "mega-chances",
        name: "Mega Chances",
        color: "azul-claro",
        numbers: ["45", "67", "89", "12"],
        date: currentDate,
        time: "07:55 PM",
        logo: "/logos/loteka.png"
      },
      {
        id: "mc-repartidera",
        name: "MC Repartidera",
        color: "azul-claro",
        numbers: ["23", "56"],
        date: currentDate,
        time: "07:55 PM",
        logo: "/logos/loteka.png"
      },
      {
        id: "el-extra",
        name: "El Extra",
        color: "azul-claro",
        numbers: ["78"],
        date: currentDate,
        time: "07:55 PM",
        logo: "/logos/loteka.png"
      },
      {
        id: "toca-3",
        name: "Toca 3",
        color: "azul-claro",
        numbers: ["45", "67", "12"],
        date: currentDate,
        time: "07:55 PM",
        logo: "/logos/loteka.png"
      },
      
      // 8:55 PM: Leidsa (Pega 3 Más, Quiniela Leidsa, Loto Pool, Super Kinito TV)
      {
        id: "leidsa-pega-3",
        name: "Pega 3 Más",
        color: "amarillo",
        numbers: ["23", "56", "89"],
        date: currentDate,
        time: "08:55 PM",
        logo: "/logos/leidsa.png"
      },
      {
        id: "quiniela-leidsa",
        name: "Quiniela Leidsa",
        color: "amarillo",
        numbers: ["12", "45", "78"],
        date: currentDate,
        time: "08:55 PM",
        logo: "/logos/leidsa.png"
      },
      {
        id: "loto-pool",
        name: "Loto Pool",
        color: "amarillo",
        numbers: ["03", "15", "28", "34", "42"],
        date: currentDate,
        time: "08:55 PM",
        logo: "/logos/leidsa.png"
      },
      {
        id: "super-kino",
        name: "Super Kino TV",
        color: "amarillo",
        numbers: ["01", "02", "03", "04", "14", "20", "23", "24", "26", "27", "29", "43", "52", "53", "57", "62", "63", "68", "77", "78"],
        date: currentDate,
        time: "08:55 PM",
        logo: "/logos/leidsa.png"
      },
      
      // 9:00 PM: Lotería Nacional
      {
        id: "nacional-noche",
        name: "Lotería Nacional Noche",
        color: "verde",
        numbers: ["97", "79", "36"],
        date: currentDate,
        time: "09:00 PM",
        logo: "/logos/loteria-nacional.png"
      },
    ];

    console.log(`Successfully fetched ${results.length} lottery results`);

    return new Response(
      JSON.stringify({ results }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error fetching lottery results:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        results: [] 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});
