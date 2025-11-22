import { LotteryCard } from "@/components/LotteryCard";
import { getLotteryResults } from "@/data/lotteryData";
import { useEffect, useState } from "react";
import { LotteryResult } from "@/types/lottery";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [lotteries, setLotteries] = useState<LotteryResult[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const loadResults = () => {
    setIsRefreshing(true);
    // Simular carga de API
    setTimeout(() => {
      setLotteries(getLotteryResults());
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    loadResults();
    
    // Auto-refresh cada 5 minutos
    const interval = setInterval(() => {
      loadResults();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const groupedLotteries = lotteries.reduce((acc, lottery) => {
    const existing = acc.find(g => g.color === lottery.color);
    if (existing) {
      existing.lotteries.push(lottery);
    } else {
      acc.push({
        color: lottery.color,
        lotteries: [lottery],
      });
    }
    return acc;
  }, [] as { color: string; lotteries: LotteryResult[] }[]);

  const colorNames: Record<string, string> = {
    verde: "Lotería Nacional · Gana Más · Juega Pega",
    amarillo: "Leidsa",
    "azul-oscuro": "Lotería Real",
    "azul-claro": "Loteka",
    lila: "Lotería Americana",
    rojo: "La Primera",
    naranja: "La Suerte",
    celeste: "Lotedom",
    zapote: "Lotería Águila",
    zanahoria: "King Lottery",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Resultados de Loterías
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            República Dominicana - Resultados en Tiempo Real
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>
              Última actualización: {lastUpdate.toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={loadResults}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>
        </header>

        {groupedLotteries.map((group) => (
          <div key={group.color} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground border-b-2 pb-2">
              {colorNames[group.color]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.lotteries.map((lottery) => (
                <LotteryCard key={lottery.id} lottery={lottery} />
              ))}
            </div>
          </div>
        ))}

        <footer className="mt-16 pt-8 border-t text-center text-muted-foreground">
          <p className="text-sm">
            Los resultados mostrados son referenciales. 
            Verifique siempre con las fuentes oficiales de cada lotería.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
