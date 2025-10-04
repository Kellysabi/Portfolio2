import { meta, shopify, starbucks, tesla } from "../assets/images";
import {
    python,
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    java
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
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
        imageUrl: motion,
        name: "Motion",
        type: "Animation",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },

    {
        imageUrl: java,
        name: "Java",
        type: "Backend",
    },

    {
        imageUrl: python,
        name: "python`",
        type: "Backend & AI/ML",
    }
];

export const experiences = [
    {
        title: "Computer Science Undergraduate",
        company_name: "Veritas University Abuja",
        icon: meta,
        iconBg: "#a2d2ff",
        date: "Ongoing",
        points: [
            "Earned a Bachelor of Science in Computer Science with a strong technical foundation and academic excellence at Veritas University, Abuja.",
            "Specialized in Data Science and Data Engineering, focusing on data analysis, predictive modeling, and advanced analytics.",
            "Obtained Cisco Certified Professional certifications, enhancing skills in data analysis, machine learning, and generating actionable insights.",
            "Gained proficiency in data pipeline optimization, database architecture, ETL processes, and data warehouse management.",
            "Developed expertise in enterprise network design, security protocols, threat mitigation, and infrastructure performance optimization.",
            "Led innovative data science and engineering projects, building scalable infrastructure and predictive models to drive business insights.",
            "Pursued continuous professional development through extracurricular technical courses and practical application of knowledge.",
        ],
    },
    {
        title: "Full Stack Developer Intern",
        company_name: "Programmer City",
        icon: shopify,
        iconBg: "#b7e4c7",
        date: "2022 - Present",
        points: [
            "Developed 7 responsive web and cross-platform mobile applications using React, React Native, and Flutter.",
            "Enhanced user engagement by 32% through responsive design and accessibility compliance.",
            "Integrated 14 RESTful APIs and third-party SDKs, improving application functionality and data efficiency by 28%.",
            "Optimized app performance with code refactoring, reducing load times by 35%.",
            "Implemented unit, integration, and automated testing within CI/CD pipelines, increasing deployment reliability by 45%.",
        ],
    },
    {
        title: "Software Engineering Intern",
        company_name: "Harvoxx Tech Hub",
        icon: starbucks,
        iconBg: "#accbe1",
        date: "2023 - Present",
        points: [
            "Engineered and deployed 8 secure, scalable full-stack web applications leveraging React, Node.js, Python, and AWS, serving 1000+ users.",
            "Performed 15 vulnerability assessments and penetration tests, resolving 23 critical security issues and reducing incidents by 85%.",
            "Orchestrated automation of 12 CI/CD pipelines with Jenkins, Docker, and Kubernetes, accelerating deployment cycles by 40%.",
            "Designed and managed cloud infrastructure on AWS for 6 enterprise projects, achieving 99.5% uptime.",
            "Developed and fine-tuned 5 ML models with TensorFlow for predictive analytics, improving forecasting accuracy by 18%.",
        ],
    },


    {
        title: "Freelance Software Engineer",
        company_name: "Self-Employed",
        icon: tesla,
        iconBg: "#fbc3bc",
        date: "2022 - Present",
        points: [
            "Built and deployed 5+ production-grade web and mobile applications for clients using React, Next.js, and Flutter.",
            "Delivered a decentralized freelance marketplace (DappWorks) using Solidity and Web3.js, ensuring secure payments via smart contracts.",
            "Developed AI-powered applications such as ResumePro AI, an intelligent resume builder leveraging OpenAI GPT APIs.",
            "Created e-commerce platforms (ShopSwift) with Stripe integration, enabling small businesses to generate revenue online.",
            "Managed cloud deployment pipelines and hosting for client projects on AWS, Vercel, and Firebase.",
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
        link: 'https://github.com/Kellysabi',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/kelechi-akwara-8a7862248',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Amazon Price Tracker',
        description: 'Developed a web application that tracks and notifies users of price changes for products on Amazon, helping users find the best deals.',
        link: 'https://your-live-site.com', // Add your live deployment URL
        github: 'https://github.com/adrianhajdin/pricewise',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Full Stack Threads Clone',
        description: 'Created a full-stack replica of the popular discussion platform "Threads," enabling users to post and engage in threaded conversations.',
        link: 'https://your-threads-live.com', // Add your live deployment URL
        github: 'https://github.com/adrianhajdin/threads',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Car Finding App',
        description: 'Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.',
        link: 'https://your-car-app-live.com', // Add your live deployment URL
        github: 'https://github.com/adrianhajdin/project_next13_car_showcase',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Full Stack Instagram Clone',
        description: 'Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.',
        link: 'https://your-snapgram-live.com', // Add your live deployment URL
        github: 'https://github.com/adrianhajdin/social_media_app',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Real-Estate Application',
        description: 'Developed a web application for real estate listings, facilitating property searches and connecting buyers with sellers.',
        link: 'https://your-estate-live.com', // Add your live deployment URL
        github: 'https://github.com/adrianhajdin/projects_realestate',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'AI Summarizer Application',
        description: 'App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs.',
        link: 'https://your-summiz-live.com', // Add your live deployment URL
        github: 'https://github.com/adrianhajdin/project_ai_summarizer',
    }
];