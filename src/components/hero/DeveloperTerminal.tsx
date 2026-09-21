import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { terminalSteps } from "../../data/portfolio";

export function DeveloperTerminal() {
  const [step, setStep] = useState(0);
  const [command, setCommand] = useState(terminalSteps[0].command);
  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    const animations: ReturnType<typeof animate>[] = [];
    const next = () => {
      index = (index + 1) % terminalSteps.length;
      const fullCommand = terminalSteps[index].command;
      let length = 1;
      animations.splice(0).forEach((animation) => animation.cancel());
      if (terminalRef.current)
        animations.push(
          animate(
            terminalRef.current,
            {
              borderColor: [
                "rgba(56,232,255,.22)",
                "rgba(56,232,255,.42)",
                "rgba(56,232,255,.22)",
              ],
            },
            { duration: 0.7 },
          ),
        );
      const type = () => {
        setCommand(fullCommand.slice(0, length));
        if (length++ < fullCommand.length) timer = setTimeout(type, 48);
        else {
          timer = setTimeout(() => {
            setStep(index);
            if (outputRef.current)
              animations.push(
                animate(
                  outputRef.current,
                  { opacity: [0.25, 1], y: [3, 0] },
                  { duration: 0.22 },
                ),
              );
            timer = setTimeout(next, 1900);
          }, 240);
        }
      };
      type();
    };
    const reset = () => {
      clearTimeout(timer);
      animations.splice(0).forEach((animation) => animation.cancel());
      index = 0;
      setStep(0);
      setCommand(terminalSteps[0].command);
      if (!preference.matches) timer = setTimeout(next, 2400);
    };
    reset();
    preference.addEventListener("change", reset);
    return () => {
      clearTimeout(timer);
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", reset);
    };
  }, []);
  return (
    <div
      ref={terminalRef}
      className="terminal"
      role="region"
      aria-label="Developer profile terminal"
    >
      <div className="terminal-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <b>alex@frontend:~</b>
      </div>
      <div className="terminal-body" aria-hidden="true">
        <div>
          <i>$</i> <span>{command}</span>
          <span className="terminal-cursor">▋</span>
        </div>
        <div ref={outputRef} className="terminal-output">
          <strong>{terminalSteps[step].highlight}</strong>
          {terminalSteps[step].output}
        </div>
      </div>
      <div className="sr-only">
        {terminalSteps.map((item) => (
          <p key={item.command}>
            {item.command}: {item.highlight}
            {item.output}
          </p>
        ))}
      </div>
    </div>
  );
}
