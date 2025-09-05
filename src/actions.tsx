import { StoreContext } from "@app/store-context";
import { analytics } from "@app/analytics";
import { Save, Upload, Share2 } from "lucide-solid";
import { useContext } from "solid-js";
import type { StoreState } from "./store";
import { StoreStateSchema } from "./store";

export const Actions = () => {
  const [state, setState] = useContext(StoreContext)!;
  const dataStr = () =>
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(state, null, 2));

  return (
    <>
      <a
        role="button"
        aria-label="Scarica i dati come file JSON"
        href={dataStr()}
        download={
          state.building.description.trim() === ""
            ? "costo-casa.json"
            : state.building.description.toLocaleLowerCase() + ".json"
        }
        class="gap-2 btn btn-outline btn-sm"
        onClick={() => {
          analytics.trackSave();
        }}
      >
        <Save class="w-4 h-4" />
      </a>
      <label
        for="loadButton"
        class="gap-2 cursor-pointer btn btn-outline btn-sm"
        aria-label="Carica dati da file JSON"
      >
        <Upload class="w-4 h-4" />
        <input
          type="file"
          name="loadButton"
          id="loadButton"
          accept="text/json"
          role="button"
          aria-label="Seleziona file JSON da caricare"
          class="hidden"
          onChange={(e) => {
            if (e.currentTarget.files?.length === 1) {
              const reader = new FileReader();
              reader.onload = function (ev: ProgressEvent<FileReader>) {
                if (ev.target && ev.target.result) {
                  try {
                    const jsonObj = JSON.parse(ev.target.result.toString());
                    const validationResult =
                      StoreStateSchema.safeParse(jsonObj);

                    if (validationResult.success) {
                      setState(validationResult.data);
                      analytics.trackLoad();
                    } else {
                      console.error(
                        "Validation errors:",
                        validationResult.error.issues,
                      );
                      alert(
                        "Errore nel caricamento del file: formato non valido",
                      );
                    }
                  } catch (parseError) {
                    console.error("JSON parse error:", parseError);
                    alert("Errore nel caricamento del file: JSON non valido");
                  }
                }
              };
              reader.readAsText(e.currentTarget.files[0]);
            }
          }}
        />
      </label>
      <button
        aria-label="Copia link di condivisione negli appunti"
        onClick={() => {
          navigator.clipboard.writeText(window.location.toString()).then(
            function () {
              alert("Link copiato, incollalo per condividerlo");
              analytics.trackShare();
            },
            function (err) {
              console.error("Async: Could not copy text: ", err);
            },
          );
        }}
        class="gap-2 btn btn-primary btn-sm"
      >
        <Share2 class="w-4 h-4" />
      </button>
    </>
  );
};
