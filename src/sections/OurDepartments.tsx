import ESCC from "@/components/ESCC";
import DepartmentCard from "@/components/DepartmentCard";
import { departmentGroups } from "@/data/departments";
import AOS from "@/components/AOS";

export default function OurDepartments() {
  return (
    <AOS
      as="section"
      className="relative w-screen h-full md:screen pt-12 md:py-16 center my-4 md:my-10"
      id="departments"
      animation="fade-up"
      offset={160}
    >
      <AOS as="div" animation="zoom-in" className="absolute inset-0">
        <ESCC />
      </AOS>

      <div className="container mx-auto">
        <AOS as="h2" animation="fade-up" className="text-5xl md:text-7xl font-bold font-permanent text-center mb-12 text-black">
          Our Departments
        </AOS>

        <div className="mx-auto w-[86vw] max-w-6xl space-y-14">
          {departmentGroups.map((group, groupIndex) => (
            <section
              key={group.title}
              aria-labelledby={`department-group-${groupIndex}`}
              className="flex w-full flex-col items-center"
            >
              <AOS
                as="h3"
                animation="fade-up"
                id={`department-group-${groupIndex}`}
                className="mb-8 w-full text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-green-400 md:mb-10 md:text-4xl"
              >
                {group.title}
              </AOS>
              <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.departments.map((department, index) => (
                  <AOS
                    as="div"
                    animation="fade-up"
                    delay={(groupIndex * 4 + index) * 80}
                    key={department.title}
                  >
                    <DepartmentCard
                      title={department.title}
                      description={department.description}
                      image={department.image}
                      icon={department.icon}
                    />
                  </AOS>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AOS>
  );
}
