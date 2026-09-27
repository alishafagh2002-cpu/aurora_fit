export interface TrainingProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  intensity: string;
  level: string;
  features: string[];
  schedule: {
    day: string;
    focus: string;
    exercises: string[];
  }[];
}

export interface WorkoutCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  calories: string;
  level: string;
  iconName: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
    tip: string;
  }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  currency: string;
  period: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  ctaText: string;
}
