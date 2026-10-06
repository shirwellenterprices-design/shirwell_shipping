import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full rounded-xl border border-border bg-surface-elevated px-4 py-3.5 text-foreground placeholder:text-muted/70 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20";

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: ReactNode;
};

export function AppInput({ label, icon, className = "", id, ...props }: AppInputProps) {
  const inputId = id ?? props.name;

  return (
    <div>
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-muted">
          {label}
        </label>
      ) : null}
      <div className={icon ? "relative" : undefined}>
        <input
          id={inputId}
          className={`${fieldClass} ${icon ? "pr-12" : ""} ${className}`.trim()}
          {...props}
        />
        {icon ? (
          <span className="pointer-events-none absolute bottom-3.5 right-3 text-gold">{icon}</span>
        ) : null}
      </div>
    </div>
  );
}

type AppSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
  icon?: ReactNode;
};

export function AppSelect({
  label,
  options,
  icon,
  className = "",
  id,
  name,
  ...props
}: AppSelectProps) {
  const selectId = id ?? name;

  return (
    <div>
      <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-muted">
        {label}
      </label>
      <div className={icon ? "relative" : undefined}>
        <select
          id={selectId}
          name={name}
          className={`${fieldClass} appearance-none ${icon ? "pr-12" : ""} ${className}`.trim()}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {icon ? (
          <span className="pointer-events-none absolute bottom-3.5 right-3 text-gold">{icon}</span>
        ) : null}
      </div>
    </div>
  );
}

type AppTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function AppTextarea({ label, className = "", id, name, ...props }: AppTextareaProps) {
  const textareaId = id ?? name;

  return (
    <div>
      <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-muted">
        {label}
      </label>
      <textarea
        id={textareaId}
        name={name}
        className={`${fieldClass} min-h-[120px] resize-y ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
