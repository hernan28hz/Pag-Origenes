import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Retardo base en ms. */
  delay?: number;
  id?: string;
};

/**
 * Divide un texto por "\n" en líneas enmascaradas que suben al entrar en
 * pantalla (la clase .is-in la añade MotionProvider vía [data-reveal-lines]).
 */
export function SplitLines({ text, as: Tag = "h2", className, delay = 0, id }: Props) {
  const lines = text.split("\n");
  return (
    <Tag className={className} data-reveal-lines="" id={id} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, i) => (
        <span className="line" key={i} aria-hidden="true">
          <span className="line__inner" style={{ ["--i" as string]: i, ["--d" as string]: `${delay}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
