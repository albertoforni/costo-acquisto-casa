import { Component, useContext } from "solid-js";
import Ajv from "ajv";
import { StoreContext } from "@app/store-context";

export const Actions = () => {
  const [state, setState] = useContext(StoreContext);
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
        class="flex items-center justify-center border p1 rounded"
      >
        Salva 💾
      </a>
      <label
        htmlFor="loadButton"
        class="flex items-center justify-center border p1 rounded cursor-pointer"
      >
        Carica 📤
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
                    setState(jsonObj);
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
    </>
  );
};
