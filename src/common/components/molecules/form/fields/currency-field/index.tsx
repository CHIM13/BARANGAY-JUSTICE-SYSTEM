import {
  FC,
  InputHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/common/components/atoms/ui/form";
import { Input } from "@/common/components/atoms/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/atoms/ui/select";

export interface CurrencyFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  currencies?: Array<{
    code: string;
    symbol: string;
    name: string;
  }>;
  defaultCurrency?: string;
  showSymbol?: boolean;
  showCode?: boolean;
  symbolPosition?: "left" | "right";
  onCurrencyChange?: (currency: string) => void;
}

const defaultCurrencies = [
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

const CurrencyField: FC<CurrencyFieldProps> = ({
  label,
  description,
  currencies = defaultCurrencies,
  defaultCurrency = "EUR",
  showSymbol = true,
  showCode = true,
  symbolPosition = "left",
  onCurrencyChange,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const form = useFormContext();
  const id = useId();
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencies.find((c) => c.code === defaultCurrency) || currencies[0]
  );

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  const handleCurrencyChange = (code: string) => {
    const currency = currencies.find((c) => c.code === code);
    if (currency) {
      setSelectedCurrency(currency);
      onCurrencyChange?.(code);
    }
  };

  return (
    <FormField
      control={form.control}
      name={props?.name ?? "name"}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="space-y-2" ref={divRef}>
              <div className="relative flex rounded-lg shadow-sm shadow-black/5">
                {showSymbol && symbolPosition === "left" && (
                  <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground">
                    {selectedCurrency.symbol}
                  </span>
                )}
                <Input
                  id={id}
                  className={`${
                    symbolPosition === "left" ? "ps-6" : "pe-6"
                  } shadow-none flex-1`}
                  placeholder="0.00"
                  type="text"
                  {...field}
                />
                {showSymbol && symbolPosition === "right" && (
                  <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground">
                    {selectedCurrency.symbol}
                  </span>
                )}
                <Select
                  value={selectedCurrency.code}
                  onValueChange={handleCurrencyChange}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder={selectedCurrency.code} />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {showSymbol && currency.symbol}{" "}
                        {showCode && currency.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CurrencyField;
