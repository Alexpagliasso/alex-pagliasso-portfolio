import { useState } from "react";
import { Blocks } from "lucide-react";
import { beyondCode } from "../../data/portfolio";

// An empty glob is valid: adding this exact file enables it on the next build.
const assets = import.meta.glob<string>(
  "../../assets/alex-pixel-front.png",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);
const image = assets["../../assets/alex-pixel-front.png"];

export function PixelWorkspace() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="pixel-workspace">
      {image && !failed ? (
        <img
          src={image}
          alt={beyondCode.imageAlt}
          width={960}
          height={1200}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="pixel-placeholder">
          <Blocks size={56} strokeWidth={1} aria-hidden="true" />
          <p>{beyondCode.placeholder}</p>
          <span aria-hidden="true" className="pixel-placeholder-dots">
            <i />
            <i />
            <i />
          </span>
        </div>
      )}
    </div>
  );
}
