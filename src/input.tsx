type Props = {
  id: string;
  value: number | null;
  disabled?: boolean;
  onChange?: (value: number) => void;
  symbol: string;
  isBold?: boolean;
};

const formatter = new Intl.NumberFormat("it-IT", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function Input(props: Props) {
  const getFormattedValue = () => {
    if (props.value === null) {
      return "-";
    } else {
      return formatter.format(props.value);
    }
  };

  let ref: HTMLInputElement | undefined = undefined;

  return (
    <div>
      <div class="relative flex items-center rounded-md shadow-sm overflow-hidden">
        <span class="absolute pl-1 ml-1">{props.symbol}</span>
        <input
          id={props.id}
          class={"border w-full block focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300 text-right p-1 disabled:bg-gray-200".concat(
            props.isBold ? " font-bold" : "",
          )}
          ref={(node) => (ref = node)}
          onFocus={() => {
            ref?.select();
            ref?.setAttribute(
              "value",
              typeof props.value === "number" ? props.value.toString() : "0",
            );
          }}
          onChange={(e) => {
            if (props.onChange) {
              const value = parseFloat(e.currentTarget.value);
              if (!isNaN(value)) {
                props.onChange(value);
              }
            }
          }}
          disabled={props.disabled}
          type="text"
          value={getFormattedValue()}
          placeholder="0"
        />
      </div>
    </div>
  );
}
