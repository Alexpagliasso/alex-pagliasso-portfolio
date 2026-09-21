import {
  education,
  experiences,
  profile,
  projects,
  techGroups,
} from "../data/portfolio";
import type {
  Experience as ExperienceData,
  Project,
  TechGroup as TechGroupData,
} from "../data/portfolio";
import { Card } from "./layout/Card";
import { Section } from "./layout/Section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid">
        <Card className="about-main">
          <span className="tag">// PROFILE</span>
          <h3>{profile.aboutTitle}</h3>
          <p>{profile.about}</p>
        </Card>
        {profile.stats.map((stat) => (
          <Card className="about-stat" key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ExperienceCard({ experience }: { experience: ExperienceData }) {
  return (
    <Card>
      <div className="job-head">
        <div>
          <h3>{experience.title}</h3>
          <div className="company">{experience.company}</div>
        </div>
        <span className="date">{experience.date}</span>
      </div>
      <ul>
        {experience.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </Card>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Esperienza">
      <div className="timeline">
        <span className="timeline-line" aria-hidden="true" />
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </Section>
  );
}

function TechGroup({ group }: { group: TechGroupData }) {
  return (
    <Card className="skill-card">
      <h3>{group.title}</h3>
      <div className="stack">
        {group.technologies.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </Card>
  );
}

export function TechStack() {
  return (
    <Section id="stack" title="Tech stack">
      <div className="grid">
        {techGroups.map((group) => (
          <TechGroup key={group.title} group={group} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="project">
      <div className="project-top">
        <span className="tag">{project.tag}</span>
        <span className="commit">{project.branch}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="mini-stack">
        {project.technologies.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="project-foot">
        <span>{project.workflow}</span>
        <b aria-hidden="true">{project.number}</b>
      </div>
    </Card>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Build. Test. Iterate.">
      <div className="grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" title="Formazione">
      <div className="grid">
        {education.map((item) => (
          <Card className="edu" key={item.title}>
            <span className="date">{item.date}</span>
            <h3>{item.title}</h3>
            <p>{item.institution}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
