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
        href={dataStr()}
        download={
          state.building.description.trim() === ""
            ? "costo-casa.json"
            : state.building.description.toLocaleLowerCase() + ".json"
        }
        class="btn btn-outline btn-sm gap-2"
      >
        <Save class="h-4 w-4" />
        <span>Salva</span>
      </a>
      <label
        for="loadButton"
        class="btn btn-outline btn-sm cursor-pointer gap-2"
      >
        <Upload class="h-4 w-4" />
        <span>Carica</span>
        <input
          type="file"
          name="loadButton"
          id="loadButton"
          accept="text/json"
          role="button"
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
        class="btn btn-primary btn-sm gap-2"
      >
        <Share2 class="h-4 w-4" />
        <span>Share</span>
      </button>
    </>
  );
};
