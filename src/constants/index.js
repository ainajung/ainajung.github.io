import { southern, udemy, dl } from "../assets/images";
import {
    contact,
    css,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    pricewise,
    react,
    tailwindcss,
    threads,
    car,
    threejs,
    figma
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: threejs,
        name: "ThreeJS",
        type: "Frontend",
    },
    {
        imageUrl: figma,
        name: "Figma",
        type: "UX design",
    }
];

export const experiences = [
    {
        title: "Start to learn",
        company_name: "Southern Cross University",
        icon: southern,
        iconBg: "#FBF8EF",
        date: "July 2021",
        points: [
            "Following a degree in civil engineering from a university in Korea, I embarked on a journey into an entirely new field.",
            "I had to learn everything from scratch—every concept was uncharted territory.",
            "Gradually, I began to understand what coding is and how I could apply it.",
            "And then, the endless stream of assessments.",
        ],
    },
    {
        title: "Web develop bootcamp course",
        company_name: "U-demy",
        icon: udemy,
        iconBg: "#EBEAFF",
        date: "Aug 2023 - Jan 2024",
        points: [
            "Noticed a shortage of learning resources at the university.",
            "Wanted to focus more on specific subjects that sparked my interest.",
            "This experience gave me the confidence to pursue a career as a front-end developer."
        ],
    },
    {
        title: "Group project; Front-end develop",
        company_name: "DL Aus Group",
        icon: dl,
        iconBg: "#FDDBBB",
        date: "Jan 2024 - June 2024",
        points: [
            "Final university assessments completed with my team.",
            "Collaborated with the team to build a web application for DL Aus Group.",
            "Contributed to application design, coding, and maintained communication with the team.",
            "Using tools like Jira and team conferences, the project gave me a solid understanding of project workflows.",
        ],
    },
    {
        title: "Graduate the bachelor of Information Technology",
        company_name: "Southern Cross University",
        icon: southern,
        iconBg: "#FBF8EF",
        date: "July 2024",
        points: [
            "Earned a Bachelor’s degree in Information Technology, majoring in Software Development.",
            "Excited to begin my journey in the IT industry.",
            "Continuing to work on projects that showcase my skills and results."
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/ainajung',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'http://www.linkedin.com/in/eunbin-jung-872b7818b',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'DL Aus Group',
        description: 'Developed a web application that tracks and notifies users of price changes for products on Amazon, helping users find the best deals.',
        link: 'https://github.com/adrianhajdin/pricewise',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Sushi Place',
        description: 'Created a full-stack replica of the popular discussion platform "Threads," enabling users to post and engage in threaded conversations.',
        link: 'https://github.com/ainajung/Sushi-Place',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Portfolio site',
        description: 'Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.',
        link: 'https://github.com/adrianhajdin/project_next13_car_showcase',
    }
];