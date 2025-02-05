export const SAMPLE_TAGS = ['Web Dev', 'Architecture', 'Backend', 'Frontend', 'AI', 'ML', 'DevOps', 'Cloud'] as const;

export const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;

export type Difficulty = typeof DIFFICULTIES[number];
export type Tag = typeof SAMPLE_TAGS[number]; 