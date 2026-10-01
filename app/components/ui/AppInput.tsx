import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldBase =
  "w-full rounded-xl border border-border bg-surface-elevated px-4 py-3.5 text-foreground placeholder:text-muted/70 transition-colors focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20";

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: ReactNode;
};

export function AppInput({ label, icon, className = "", id, ...props }: AppInputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-muted">
          {label}
        </label>
      )}
      <div className="relative">
        <input id={inputId} className={`${fieldBase} ${icon ? "pr-11" : ""} ${className}`} {...props} />
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gold">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

type AppTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function AppTextarea({ label, className = "", id, ...props }: AppTextareaProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-muted">
          {label}
        </label>
      )}
      <textarea id={inputId} className={`${fieldBase} min-h-[100px] resize-y ${className}`} {...props} />
    </div>
  );
}

type AppSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  icon?: ReactNode;
  options: { value: string; label: string }[];
};

export function AppSelect({ label, icon, options, className = "", id, ...props }: AppSelectProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-muted">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={inputId}
          className={`${fieldBase} appearance-none ${icon ? "pr-11" : "pr-10"} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gold">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
