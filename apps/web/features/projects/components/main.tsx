// features/projects/components/main.tsx
import { HeaderProjects } from "./header";
import { ProjectList } from "./project-list";
import { MOCK_PROJECTS } from "../components/mocks/projects.mock";

export const MainProjects = () => {
  return (
    <div className="flex flex-col gap-6">
      <HeaderProjects />
      <section>
        <ProjectList projects={MOCK_PROJECTS} />
      </section>
    </div>
  );
};
