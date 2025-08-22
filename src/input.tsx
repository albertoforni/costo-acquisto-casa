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
    <div class="relative">
      <div class="relative flex items-center">
        <span class="absolute left-3 text-base-content/70 font-medium">
          {props.symbol}
        </span>
        <input
          id={props.id}
          class={`input input-bordered w-full pl-8 text-right ${
            props.isBold ? "font-bold" : "font-medium"
          }`}
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
              const stringWithoutThousandsSeparator = e.currentTarget.value
                .replace(/\./gi, "")
                .replace(/,/gi, ".");
              const value = parseFloat(stringWithoutThousandsSeparator);
              if (!isNaN(value)) {
                props.onChange(value);
              }

              if (value === props.value) {
                e.currentTarget.value = getFormattedValue();
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
