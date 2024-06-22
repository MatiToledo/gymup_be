import { OpenAI } from 'openai';
import {
  AgeRangeEnum,
  ExperienceLevelEnum,
  GenderEnum,
  GoalEnum,
} from 'src/resources/plan/entities/plan.entity';
import { DayEnum } from 'src/resources/plan_day/entities/plan_day.entity';
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

type PrompData = {
  goal: string;
  ageRange: string;
  gender: string;
  experienceLevel: string;
  daysPerWeek: number;
  hoursPerDay: number;
  allExercises: string[];
};

export function generatePlanPrompt({
  goal,
  ageRange,
  gender,
  experienceLevel,
  daysPerWeek,
  hoursPerDay,
  allExercises,
}: PrompData) {
  return `
    You are tasked with generating a high-level gym plan from the provided information in JSON format. Your task is to generate a personalized gym plan as a personal trainer for a person with this information.
  The list of possible exercises is ${allExercises.join(', ')}.
  The person is a ${gender}.
  The person is ${ageRange}.
  The experience level of the person is ${experienceLevel}.
  The goal of the person is ${goal}.
  The person wants to train ${daysPerWeek} days a week.
  The person wants to train ${hoursPerDay} hours each day.
  The person wants to warm up every day with one exercise from the list of possible exercises that is focused on cardio.
  
  Considerations:
  1. The plan should be in JSON format.
  2. The exercise names should be in the list of possible exercises.
  2. Exercises that are not warm-ups have rest time in seconds, repetitions, and sets in numbers, and duration should be null.
  3. The rest time should be in seconds.
  4. For warm-up exercises, add the duration in minutes and rest, repetitions, and sets should be null.
  5. Each strength exercise takes approximately 15 minutes including rest.
  6. Each cardio warm-up takes 10 minutes.
  7. Fill the remaining training time (to make up a total of ${hoursPerDay} hours per day) with sufficient strength exercises. Assume each strength exercise takes approximately 15 minutes.
  8. Ensure the total duration of exercises (including rest) meets the required ${hoursPerDay} hours of training each day.
  9. The quantity of repetitions and sets should be in number considering the goal of training and the time of training for each day.
  10. Choose between PPL, Upper/Lower and FullBody depending on the person's information to structure the plan.
  
  Examples of Proper Formatting:
  {
    "name": "Name of the plan",
    "gender": "gender of the person",
    "ageRange": "age range of the person",
    "experienceLevel": "experience level of the person",
    "goal": "goal of the person",
    "daysPerWeek": "days of training",
    "planStructure: "the structure of the plan (PPL - Upper/Lower - FullBody)",
    "hoursPerDay": "hours of training per day",
    "days": [
      {
        "day": "day of the week (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)",
        "exercises": [
          {
            "name": "name of the exercise",
            "sets": "number of sets",
            "repetitions": "number of repetitions",
            "duration": "duration of the exercise in minutes",
            "rest": "rest time in seconds"
          }
        ]
      }
    ]
  }
    `;
}

export async function generateValidPlanWithAI(
  data: PrompData,
): Promise<PlanAI> {
  let plan: PlanAI;
  const maxAttempts = 5;
  let attempts = 0;

  do {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: generatePlanPrompt(data),
        },
      ],
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
    });

    plan = JSON.parse(chatCompletion.choices[0].message.content);

    attempts += 1;

    if (attempts >= maxAttempts) {
      throw new Error(
        'Failed to generate a valid plan after multiple attempts.',
      );
    }
  } while (!validatePlan(plan));

  return plan;
}

function validatePlan(plan: any): plan is PlanAI {
  if (
    typeof plan.name !== 'string' ||
    typeof plan.gender !== 'string' ||
    // !Object.values(GenderEnum).includes(plan.gender) ||
    typeof plan.ageRange !== 'string' ||
    // !Object.values(AgeRangeEnum).includes(plan.ageRange) ||
    typeof plan.experienceLevel !== 'string' ||
    // !Object.values(ExperienceLevelEnum).includes(plan.experienceLevel) ||
    typeof plan.goal !== 'string' ||
    // !Object.values(GoalEnum).includes(plan.goal) ||
    typeof plan.daysPerWeek !== 'number' ||
    typeof plan.planStructure !== 'string' ||
    typeof plan.hoursPerDay !== 'number' ||
    !Array.isArray(plan.days)
  ) {
    return false;
  }

  for (const day of plan.days) {
    if (
      typeof day.day !== 'string' ||
      !Object.values(DayEnum).includes(day.day) ||
      !Array.isArray(day.exercises)
    ) {
      return false;
    }

    for (const exercise of day.exercises) {
      if (
        typeof exercise.name !== 'string' ||
        (exercise.sets !== null && typeof exercise.sets !== 'number') ||
        (exercise.repetitions !== null &&
          typeof exercise.repetitions !== 'number') ||
        (exercise.duration !== null && typeof exercise.duration !== 'number') ||
        (exercise.rest !== null && typeof exercise.rest !== 'number')
      ) {
        return false;
      }
    }
  }

  return true;
}

export interface PlanAI {
  name: string;
  gender: string;
  ageRange: string;
  experienceLevel: string;
  goal: string;
  daysPerWeek: number;
  planStructure: string;
  hoursPerDay: number;
  days: DayPlanAI[];
}

export interface DayPlanAI {
  day: string;
  exercises: {
    name: string;
    sets: number;
    repetitions: number;
    duration: number;
    rest: number;
  }[];
}
