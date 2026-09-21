import { Activity, Cpu, Goal } from "lucide-react";
import { beyondCode, beyondCodeItems } from "../../data/portfolio";
import { Card } from "../layout/Card";
import { Section } from "../layout/Section";
import { PixelWorkspace } from "./PixelWorkspace";

const icons = { activity: Activity, goal: Goal, cpu: Cpu };

export function BeyondCode() {
  return (
    <Section id="beyond" title={beyondCode.title}>
      <div className="beyond-layout">
        <PixelWorkspace />
        <div className="beyond-activities">
          {beyondCodeItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <Card className="activity-card" key={item.id}>
                <div className="activity-heading">
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
