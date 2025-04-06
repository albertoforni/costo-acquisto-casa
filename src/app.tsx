import { Actions } from "@app/actions";
import { Agency } from "@app/agency";
import { Input } from "@app/input";
import { Mortgage } from "@app/mortgage";
import { Notary } from "@app/notary";
import { StoreContext } from "@app/store-context";
import { Taxes } from "@app/taxes";
import { Total } from "@app/total";
import { Calculator, Home } from "lucide-solid";
import { Component, useContext } from "solid-js";

export const App: Component = () => {
  const [state, setState] = useContext(StoreContext)!;

  return (
    <div class="min-h-screen bg-background">
      <main class="max-w-3xl m-auto p-6 space-y-6">
        <div class="bg-card rounded-lg border shadow-sm p-6 space-y-4">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-card-foreground flex items-center gap-2">
                <Home class="h-8 w-8" />
                Costo Acquisto Casa
              </h1>
              <p class="text-muted-foreground mt-1">
                Calcola quanto costa veramente comprare casa
              </p>
            </div>
            <div class="flex gap-4">
              <Actions />
            </div>
          </div>

          <section class="space-y-4">
            <div class="grid grid-cols-3 gap-4 items-center">
              <label
                class="col-span-2 text-lg font-semibold text-card-foreground flex items-center gap-2"
                for="price"
              >
                <Calculator class="h-5 w-5" />
                Prezzo di acquisto
              </label>
              <Input
                id="price"
                onChange={(value) => setState("building", "price", value)}
                value={state.building.price}
                symbol="€"
              />
            </div>

            <input
              class="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
              id="description"
              placeholder="Inserisci una descrizione della proprietà..."
              onChange={(e) =>
                setState("building", "description", e.currentTarget.value)
              }
              value={state.building.description}
            />
          </section>
        </div>

        <div class="grid gap-6">
          <Agency />
          <Taxes />
          <Mortgage />
          <Notary />
          <Total />
        </div>
      </main>
    </div>
  );
};
