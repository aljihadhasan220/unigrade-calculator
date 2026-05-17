export type GradingSystem = 'USA' | 'UK' | 'EUROPE' | 'INDIA' | 'BANGLADESH' | 'CUSTOM';

export interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string;
  marks: number;
}

export interface CalculationResult {
  gpa: number;
  cgpa: number;
  percentage: number;
  gradeBadge: string;
  status: string;
}

export const GRADING_SYSTEMS: Record<GradingSystem, { name: string; max: number; steps: Record<string, number> }> = {
  USA: {
    name: 'USA (4.0 Scale)',
    max: 4.0,
    steps: {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    }
  },
  UK: {
    name: 'UK (Classification)',
    max: 100,
    steps: {
      '1st': 70,
      '2:1': 60,
      '2:2': 50,
      '3rd': 40,
      'F': 0
    }
  },
  EUROPE: {
    name: 'Europe (ECTS)',
    max: 5.0,
    steps: {
      'A': 5.0, 'B': 4.0, 'C': 3.0, 'D': 2.0, 'E': 1.0, 'F': 0.0
    }
  },
  INDIA: {
    name: 'India (10.0 CGPA)',
    max: 10.0,
    steps: {
      'O': 10.0, 'A+': 9.0, 'A': 8.0, 'B+': 7.0, 'B': 6.0, 'C': 5.0, 'P': 4.0, 'F': 0.0
    }
  },
  BANGLADESH: {
    name: 'Bangladesh (5.0 Scale)',
    max: 5.0,
    steps: {
      'A+': 5.0, 'A': 4.0, 'A-': 3.5, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0
    }
  },
  CUSTOM: {
    name: 'Custom (100% Scale)',
    max: 100,
    steps: {}
  }
};
