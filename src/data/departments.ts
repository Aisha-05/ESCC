export type Department = {
  title: string;
  description: string;
  image?: string;
  icon?: "handshake" | "planning" | "logistics";
};

export type DepartmentGroup = {
  title: string;
  departments: Department[];
};

export const departmentGroups: DepartmentGroup[] = [
  {
    title: "External Relations",
    departments: [
      {
        title: "External Relations",
        description:
          "Builds partnerships and represents ESCC by connecting the club with students, organizations, and external partners.",
        icon: "handshake",
      },
    ],
  },
  {
    title: "Creative & Media",
    departments: [
      {
        title: "Design",
        description:
          "Creates the visual identity of ESCC through thoughtful graphics, layouts, and creative direction.",
        image: "/svg/icon/department/design.svg",
      },
      {
        title: "Marketing & Content",
        description:
          "Plans campaigns and creates engaging content that shares ESCC's activities with the wider community.",
        image: "/svg/icon/department/marketing.svg",
      },
      {
        title: "Multimedia",
        description:
          "Turns ideas into engaging digital experiences using photography, visual storytelling, and multimedia production.",
        image: "/svg/icon/department/multimedia.svg",
      },
      {
        title: "Production & Video",
        description:
          "Plans, records, and edits video projects that capture the energy and stories of ESCC events.",
        image: "/svg/icon/department/multimedia.svg",
      },
    ],
  },
  {
    title: "Operations",
    departments: [
      {
        title: "Planning",
        description:
          "Organizes timelines, priorities, and workflows to help every ESCC project run smoothly.",
        icon: "planning",
      },
      {
        title: "Logistics",
        description:
          "Coordinates resources, spaces, equipment, and practical details behind successful club activities.",
        icon: "logistics",
      },
      {
        title: "HR",
        description:
          "Supports members, strengthens collaboration, and helps build a welcoming and productive club culture.",
        image: "/svg/icon/department/hr.svg",
      },
      {
        title: "Technical Development",
        description:
          "Develops and maintains digital tools that improve ESCC's communication, organization, and online presence.",
        image: "/svg/icon/department/dev.svg",
      },
    ],
  },
  {
    title: "Activities",
    departments: [
      {
        title: "Sports",
        description:
          "Encourages teamwork and wellbeing through sporting activities, challenges, and inclusive competitions.",
        image: "/svg/icon/department/sport.svg",
      },
      {
        title: "Culture",
        description:
          "Celebrates creativity, heritage, and student expression through cultural events and shared experiences.",
        image: "/svg/icon/department/culture.svg",
      },
    ],
  },
];

export const departments = departmentGroups.flatMap(
  (group) => group.departments,
);
