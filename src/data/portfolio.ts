export type SocialLink = {
  label: string
  url: string
}

export type Project = {
  name: string
  summary: string
  tools: string[]
  link?: string
}

export type Milestone = {
  title: string
  organization: string
  detail: string
  period?: string
}

export type PortfolioData = {
  name: string
  role: string
  location: string
  focus: string[]
  intro: string
  about: string
  availability: string
  skills: Record<string, string[]>
  projects: Project[]
  education: Milestone[]
  experience: Milestone[]
  certifications: string[]
  socials: SocialLink[]
}

export const portfolioData: PortfolioData = {
  name: 'Sarthak Walke',
  role: 'Mechanical Engineering Student',
  location: 'AISSMS College of Engineering, Pune',
  focus: [
    'Predictive maintenance',
    'CFD & aerodynamics',
    'Robotics',
    'Automation',
    'Intelligent manufacturing',
  ],
  intro:
    'I design and build engineering systems where mechanical fundamentals meet AI/ML-driven decision making.',
  about:
    'I am a mechanical engineering student focused on building practical, data-informed solutions for manufacturing and energy systems. My work combines CAD/CFD analysis, experimental engineering, and machine learning to improve reliability and efficiency.',
  availability: 'Open to internships and collaborative engineering projects.',
  skills: {
    Languages: ['Python', 'C', 'SQL', 'MATLAB'],
    'Engineering & Simulation': ['CAD', 'CFD', 'Aerodynamics', 'Mechanical Design'],
    'Data & ML': ['Scikit-learn', 'Predictive Modeling', 'Data Analysis'],
    Tools: ['Git', 'GitHub', 'Jupyter', 'Excel'],
  },
  projects: [
    {
      name: 'AI-Assisted Airfoil Design',
      summary:
        'Explored aerodynamic profile optimization workflows using simulation-informed ML iteration loops.',
      tools: ['Python', 'CFD', 'Optimization'],
    },
    {
      name: 'ML-Based Predictive Maintenance',
      summary:
        'Built data-driven maintenance prediction pipelines to identify early machine-failure patterns.',
      tools: ['Python', 'Scikit-learn', 'SQL'],
    },
    {
      name: 'Wheel Rim Structural Analysis',
      summary:
        'Performed mechanical analysis and stress evaluation of wheel rim designs for durability insights.',
      tools: ['CAD', 'FEA', 'Mechanical Analysis'],
    },
    {
      name: 'Data-Shift Accounting Automation',
      summary:
        'Automated repetitive accounting-oriented data workflows to reduce manual processing effort.',
      tools: ['Python', 'Excel', 'Automation'],
    },
    {
      name: 'EEG-Based Smart Helmet',
      summary:
        'Prototyped an EEG-assisted helmet concept for responsive safety and intelligent sensing use cases.',
      tools: ['Sensors', 'Embedded Systems', 'Data Processing'],
    },
    {
      name: 'Engine Fuel-Efficiency Prediction',
      summary:
        'Developed prediction models to estimate fuel efficiency based on engine and operating parameters.',
      tools: ['Python', 'Machine Learning', 'Data Visualization'],
    },
    {
      name: 'Robot CAD Assembly',
      summary:
        'Created a robot assembly model with mechanical constraints for design and integration review.',
      tools: ['CAD', 'Assembly Design', 'Kinematics'],
    },
  ],
  education: [
    {
      title: 'B.E. in Mechanical Engineering',
      organization: 'AISSMS College of Engineering, Pune',
      detail: 'Undergraduate studies focused on design, manufacturing, thermal systems, and computational engineering applications.',
    },
  ],
  experience: [
    {
      title: 'Engineering Projects & Leadership',
      organization: 'Academic and independent initiatives',
      detail: 'Led and contributed to interdisciplinary technical projects spanning mechanical design, simulation, and data-driven automation.',
    },
  ],
  certifications: [
    'Mechanical engineering and technical learning certifications (details editable in this module)',
  ],
  socials: [
    { label: 'Website', url: 'https://www.sarthakwalke.tech' },
    { label: 'GitHub', url: 'https://github.com/Sarthakwalke' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sarthakwalke' },
  ],
}
