import type { JSX } from "solid-js/jsx-runtime";

type Props = {
  id: string;
  value: string | number;
  disabled?: boolean;
  onInput?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> | undefined;
  symbol: string;
  isBold?: boolean;
};

export function Input(props: Props) {
  const value = () => props.value;
  return (
    <div>
      <div class="relative flex items-center rounded-md shadow-sm overflow-hidden">
        <span class="absolute pl-1 ml-1">{props.symbol}</span>
        <input
          id={props.id}
          class={"border w-full block focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300 text-right p-1 disabled:bg-gray-200".concat(
            props.isBold ? " font-bold" : "",
          )}
          onInput={props.onInput}
          disabled={props.disabled}
          type="text"
          value={value()}
          placeholder="0"
        />
      </div>
    </div>
  );
}
