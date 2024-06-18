import 'dotenv/config';
import { v4 as uuid } from 'uuid';
import {
  BodyPartTargetedEnum,
  Exercise,
} from '../exercise/entities/exercise.entity';
import { GoalEnum, Plan } from '../plan/entities/plan.entity';
import { PlanDay } from '../plan_day/entities/plan_day.entity';
import { PlanDayExercise } from '../plan_day_exercise/entities/plan_day_exercise.entity';
import { User } from '../user/entities/user.entity';
import { sequelize } from './database.providers';

interface IExercise {
  name: string;
  sets: number | null;
  repetitions: number | null;
  duration: number | null;
}

interface IDay {
  day: string;
  exercises: IExercise[];
}

interface IPlan {
  name: string;
  sex: string;
  ageRange: string;
  level: string;
  goal: GoalEnum;
  days: IDay[];
}

const gymExercises = [
  {
    name: 'Bench press',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.SHOULDERS,
    ],
  },
  {
    name: 'Incline bench press',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.SHOULDERS,
    ],
  },
  {
    name: 'Decline bench press',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.SHOULDERS,
    ],
  },
  {
    name: 'Dumbbell chest press',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.SHOULDERS,
    ],
  },
  {
    name: 'Dumbbell flyes',
    bodyPartTargeted: [BodyPartTargetedEnum.CHEST],
  },
  {
    name: 'Dumbbell pullover',
    bodyPartTargeted: [BodyPartTargetedEnum.CHEST, BodyPartTargetedEnum.BACK],
  },
  {
    name: 'Dips',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Push-ups',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.CORE,
    ],
  },
  {
    name: 'Barbell row',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Dumbbell row',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'T-bar row',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Seated row machine',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Lat pulldown',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Behind the neck pulldown',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Pull-ups',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Barbell bicep curl',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Dumbbell bicep curl',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Preacher curl',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Concentration curl',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Machine bicep curl',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Tricep pushdown',
    bodyPartTargeted: [BodyPartTargetedEnum.TRICEPS],
  },
  {
    name: 'Rope tricep pushdown',
    bodyPartTargeted: [BodyPartTargetedEnum.TRICEPS],
  },
  {
    name: 'EZ bar tricep extension',
    bodyPartTargeted: [BodyPartTargetedEnum.TRICEPS],
  },
  {
    name: 'One-arm tricep extension',
    bodyPartTargeted: [BodyPartTargetedEnum.TRICEPS],
  },
  {
    name: 'Skull crushers',
    bodyPartTargeted: [BodyPartTargetedEnum.TRICEPS],
  },
  {
    name: 'Military press',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Dumbbell shoulder press',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Lateral raises',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Front raises',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Rear delt raises',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Barbell shrugs',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Dumbbell shrugs',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Face pulls',
    bodyPartTargeted: [
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.BACK,
    ],
  },
  {
    name: 'Machine shoulder press',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Arnold press',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Close grip pulldown',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Upright row',
    bodyPartTargeted: [
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.BICEPS,
    ],
  },
  {
    name: 'External rotations with dumbbell',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Internal rotations with dumbbell',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Side plank',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CORE,
      BodyPartTargetedEnum.OBLIQUES,
    ],
  },
  {
    name: 'Barbell squats',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Dumbbell squats',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Bulgarian split squats',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Front squats',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Sumo squats',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Deadlift',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.GLUTES,
      BodyPartTargetedEnum.BACK,
    ],
  },
  {
    name: 'Romanian deadlift',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.HAMSTRINGS,
      BodyPartTargetedEnum.GLUTES,
    ],
  },
  {
    name: 'Sumo deadlift',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.GLUTES,
      BodyPartTargetedEnum.BACK,
    ],
  },
  {
    name: 'Single-leg deadlift',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.HAMSTRINGS,
      BodyPartTargetedEnum.GLUTES,
    ],
  },
  {
    name: 'Barbell lunges',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Dumbbell lunges',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Reverse lunges',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Leg press',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Leg extensions',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS],
  },
  {
    name: 'Leg curl machine',
    bodyPartTargeted: [BodyPartTargetedEnum.HAMSTRINGS],
  },
  {
    name: 'Seated leg curl',
    bodyPartTargeted: [BodyPartTargetedEnum.HAMSTRINGS],
  },
  {
    name: 'Lying leg curl',
    bodyPartTargeted: [BodyPartTargetedEnum.HAMSTRINGS],
  },
  {
    name: 'Standing calf raises',
    bodyPartTargeted: [BodyPartTargetedEnum.CALVES],
  },
  {
    name: 'Seated calf raises',
    bodyPartTargeted: [BodyPartTargetedEnum.CALVES],
  },
  {
    name: 'Calf raises on leg press',
    bodyPartTargeted: [BodyPartTargetedEnum.CALVES],
  },
  {
    name: 'Hack squats',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Hip abduction machine',
    bodyPartTargeted: [BodyPartTargetedEnum.HIP],
  },
  {
    name: 'Hip adduction machine',
    bodyPartTargeted: [BodyPartTargetedEnum.HIP],
  },
  {
    name: 'Trap bar deadlift',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.GLUTES,
      BodyPartTargetedEnum.BACK,
    ],
  },
  {
    name: 'Step-ups with dumbbells',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: "Farmer's walk",
    bodyPartTargeted: [BodyPartTargetedEnum.FULL_BODY],
  },
  {
    name: 'Decline bench sit-ups',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Ab wheel rollouts',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Bicycle crunches',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS, BodyPartTargetedEnum.OBLIQUES],
  },
  {
    name: 'Hanging leg raises',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Leg raises on bench',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Hanging knee raises',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Machine crunches',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Cable crunches',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Plank',
    bodyPartTargeted: [BodyPartTargetedEnum.CORE],
  },
  {
    name: 'Plank with leg lift',
    bodyPartTargeted: [BodyPartTargetedEnum.CORE],
  },
  {
    name: 'Side plank with hip lift',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CORE,
      BodyPartTargetedEnum.OBLIQUES,
    ],
  },
  {
    name: 'Russian twists',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CORE,
      BodyPartTargetedEnum.OBLIQUES,
    ],
  },
  {
    name: 'Heel touches',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS, BodyPartTargetedEnum.OBLIQUES],
  },
  {
    name: 'Dumbbell side bends',
    bodyPartTargeted: [BodyPartTargetedEnum.OBLIQUES],
  },
  {
    name: 'Medicine ball crunches',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Reverse crunches',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Ab wheel rollout',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Mountain climbers',
    bodyPartTargeted: [BodyPartTargetedEnum.CORE],
  },
  {
    name: 'Burpees',
    bodyPartTargeted: [BodyPartTargetedEnum.FULL_BODY],
  },
  {
    name: 'Kettlebell swings',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.GLUTES,
      BodyPartTargetedEnum.BACK,
    ],
  },
  {
    name: 'Clean and press',
    bodyPartTargeted: [
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.BACK,
    ],
  },
  {
    name: 'Snatch',
    bodyPartTargeted: [
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.BACK,
    ],
  },
  {
    name: 'Thrusters',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Turkish get-up',
    bodyPartTargeted: [BodyPartTargetedEnum.FULL_BODY],
  },
  {
    name: 'Battle ropes',
    bodyPartTargeted: [BodyPartTargetedEnum.ARMS, BodyPartTargetedEnum.CORE],
  },
  {
    name: 'Bear crawl',
    bodyPartTargeted: [BodyPartTargetedEnum.FULL_BODY],
  },
  {
    name: 'Box jumps',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS],
  },
  {
    name: 'Wall balls',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.SHOULDERS,
    ],
  },
  {
    name: 'Dumbbell clean',
    bodyPartTargeted: [
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.BACK,
    ],
  },
  {
    name: 'Dumbbell snatch',
    bodyPartTargeted: [
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.BACK,
    ],
  },
  {
    name: 'Press with rotation',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CORE,
      BodyPartTargetedEnum.SHOULDERS,
    ],
  },
  {
    name: 'Sprints on treadmill',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.CARDIO],
  },
  {
    name: 'Jump rope',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.ARMS,
      BodyPartTargetedEnum.CARDIO,
    ],
  },
  {
    name: 'Crab walk',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.CORE],
  },
];

async function syncDatabase() {
  try {
    sequelize.addModels([User, Exercise, Plan, PlanDay, PlanDayExercise]);
    await sequelize.sync({ force: true }).then(async () => {
      await Exercise.bulkCreate(gymExercises);
      console.log('Database synced successfully');
    });
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

syncDatabase();
