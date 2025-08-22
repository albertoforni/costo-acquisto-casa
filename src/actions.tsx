import { StoreContext } from "@app/store-context";
import Ajv from "ajv";
import { Save, Upload, Share2 } from "lucide-solid";
import { useContext } from "solid-js";
import type { StoreState } from "./store";

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
              reader.onload = async function (ev: ProgressEvent<FileReader>) {
                const storeSchema = await fetch(
                  "/assets/store/store-schema.json",
                ).then((res) => res.json());
                const ajv = new Ajv();
                const validate = ajv.compile(storeSchema);

                if (ev.target && ev.target.result) {
                  const jsonObj = JSON.parse(ev.target.result.toString());
                  const valid = validate(jsonObj);
                  if (valid) {
                    setState(jsonObj as StoreState);
                  } else {
                    console.error(validate.errors);
                    alert("Errore nel caricamento del file");
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
