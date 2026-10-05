/* ------------------------------------------------------------------ */
/*  Typdefinitionen für dianadigital.de v3                              */
/* ------------------------------------------------------------------ */

export type ServiceItem = {
  number: string;
  title: string;
  description: string;
  action: string;
  targetAudience?: string;
  keyTopics?: string[];
  formats?: string[];
};

export type ProjectItem = {
  id?: string;
  label: string;
  category?: "ki" | "medien" | "vr" | "schulentwicklung";
  title: string;
  copy: string;
  note: string;
  href?: string;
  linkLabel?: string;
  statusBadge?: string;
  fullDescription?: string;
  highlights?: string[];
};

export type QualificationItem = [string, string];

export type HeroSlide = {
  id: string;
  badge: string;
  type: string;
  title: string;
  teaser: string;
  date: string;
  location: string;
  ctaLabel: string;
  ctaLink: string;
  active: boolean;
  image?: string;
  imageAlt?: string;
};

export type CvStation = {
  period: string;
  role: string;
  institution: string;
  description: string;
};

export type EducationStation = {
  period: string;
  title: string;
  institution: string;
  details: string;
};

export type CertificateItem = {
  year: string;
  title: string;
  details: string;
};

export type CurriculumVitae = {
  career: CvStation[];
  education: EducationStation[];
  qualifications: CertificateItem[];
};

export type ProcessStep = {
  step: string;
  title: string;
  text: string;
};

export type DetailedServices = {
  didacticStatement?: string;
  processSteps: ProcessStep[];
};

export type Content = {
  meta: {
    brand: string;
    brandSubtitle: string;
    navLabelLeistungen: string;
    navLabelProjekte: string;
    navLabelUeberMich: string;
    navLabelKontakt: string;
    cvDownloadUrl?: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
    imageAlt: string;
  };
  heroSlides?: HeroSlide[];
  philosophy: {
    label: string;
    quote: string;
    body: string;
  };
  services: {
    label: string;
    headline: string;
    subheadline: string;
    items: ServiceItem[];
    focus: {
      label: string;
      title: string;
      description: string;
    };
  };
  detailedServices?: DetailedServices;
  projects: {
    label: string;
    headline: string;
    items: ProjectItem[];
  };
  qualifications: {
    label: string;
    headline: string;
    items: QualificationItem[];
  };
  about: {
    label: string;
    name: string;
    surname: string;
    role: string;
    headline: string;
    paragraphs: string[];
    quote: string;
  };
  curriculumVitae?: CurriculumVitae;
  contact: {
    label: string;
    headline: string;
    body: string;
    topics: string[];
    successMessageContact: string;
    successMessageFeedback: string;
  };
};
