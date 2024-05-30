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

const AllPlans: IPlan[] = [
  {
    name: 'Plan de Perdida de Peso',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Principiante',
    goal: GoalEnum.LoseWeight,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Crunches',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 3,
            repetitions: null,
            duration: 20,
          },
          {
            name: 'Mountain climbers',
            sets: 3,
            repetitions: 20,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Sentadillas con salto',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Flexiones',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Peso muerto',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Fondos',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha con elevación de pierna',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 20,
          },
          {
            name: 'Russian twists',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Levantamiento de piernas acostada',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Superman',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Zancadas',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevación lateral con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Abdominales bicicleta',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Tonificación',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Principiante',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Abdominales en V',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Estocadas',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevación de talones',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Flexiones inclinadas',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con mancuerna',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 3,
            repetitions: null,
            duration: 45,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Sentadillas con peso',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Crunches cruzados',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Press de hombros con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Zancadas con mancuernas',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 20,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Ganancia de Masa Muscular Personalizado',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Principiante',
    goal: GoalEnum.MuscleMass,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Sentadillas',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Press de banca',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 3,
            repetitions: null,
            duration: 45,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Press militar con mancuernas',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevación lateral con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Press de piernas',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Fondos en máquina',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Curl de bíceps con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Zancadas con mancuernas',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Press de hombros con barra',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Curl de bíceps alterno',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Extensiones de tríceps con mancuerna',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Definición Personalizado',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Principiante',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Correr',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Sentadillas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 3,
            repetitions: null,
            duration: 45,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Zancadas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Crunches',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Extensiones de tríceps en polea alta',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Definición Muscular para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Principiante',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Correr',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Sentadillas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 3,
            repetitions: null,
            duration: 45,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Zancadas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Crunches',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Extensiones de tríceps en polea alta',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Ganancia de Masa Muscular para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Principiante',
    goal: GoalEnum.MuscleMass,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Sentadillas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Press de banca',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 3,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 3,
            repetitions: null,
            duration: 60,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Press militar con mancuernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 3,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Elevación lateral con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Press de piernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Fondos en máquina',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Curl de bíceps con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Crunches',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Zancadas con mancuernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Curl de bíceps alterno',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Extensiones de tríceps con mancuerna',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Tonificación para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Principiante',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Correr',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Sentadillas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 3,
            repetitions: null,
            duration: 45,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Zancadas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Peso muerto',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Crunches',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Extensiones de tríceps en polea alta',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Pérdida de Peso para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Principiante',
    goal: GoalEnum.LoseWeight,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Correr',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Sentadillas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 3,
            repetitions: null,
            duration: 45,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Zancadas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Peso muerto',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Crunches',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Extensiones de tríceps en polea alta',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Pérdida de Peso para Mujeres',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Intermedio',
    goal: GoalEnum.LoseWeight,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 40,
          },
          {
            name: 'Sentadillas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de rodillas',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 3,
            repetitions: null,
            duration: 30,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 40,
          },
          {
            name: 'Zancadas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps en banco',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con mancuerna',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 40,
          },
          {
            name: 'Peso muerto con barra',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Abdominales bicicleta',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Levantamiento de piernas colgando',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 40,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de brazos',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Tonificación para Mujeres',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Intermedio',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Sentadillas con peso',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 3,
            repetitions: null,
            duration: 30,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Zancadas con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de pecho',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con mancuerna',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Peso muerto rumano',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Abdominales bicicleta',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Levantamiento de piernas colgando',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de pecho',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Ganancia de Masa Muscular para Mujeres',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Intermedio',
    goal: GoalEnum.MuscleMass,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Sentadillas con barra',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Press de banca',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Pull-ups',
            sets: 4,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Press militar con mancuernas',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Press de piernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 4,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Hip Thrust',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Press de hombros con barra',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan de Definición Muscular para Mujeres',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Intermedio',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Correr',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Sentadillas con peso',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Press de banca con mancuernas',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 3,
            repetitions: null,
            duration: 30,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Zancadas con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps en banco',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con mancuerna',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Peso muerto rumano',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Abdominales bicicleta',
            sets: 3,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Levantamiento de piernas colgando',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 3,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de pecho',
            sets: 3,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Avanzado de Definición Muscular para Mujeres',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Avanzado',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Trote',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Sentadillas con peso',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Press de banca con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 4,
            repetitions: null,
            duration: 40,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Zancadas con mancuernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps en banco',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Trote',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Abdominales bicicleta',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Levantamiento de piernas colgando',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de pecho',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Avanzado de Ganancia de Masa Muscular para Mujeres',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Avanzado',
    goal: GoalEnum.MuscleMass,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Sentadillas con barra',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Press de banca con barra',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Peso muerto',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Pull-ups',
            sets: 5,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Press militar con barra',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Press de piernas',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 5,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Hip Thrust',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Avanzado de Tonificación para Mujeres',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Avanzado',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Sentadillas con peso',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Press de banca con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 4,
            repetitions: null,
            duration: 40,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Zancadas con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps en banco',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Abdominales bicicleta',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Levantamiento de piernas colgando',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Trote',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de pecho',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Avanzado para Perder Peso en Mujeres',
    sex: 'Mujer',
    ageRange: '18-24',
    level: 'Avanzado',
    goal: GoalEnum.LoseWeight,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Sentadillas con peso',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Press de banca con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 4,
            repetitions: null,
            duration: 40,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Trote',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Zancadas con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps en banco',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Abdominales bicicleta',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Levantamiento de piernas colgando',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Trote',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Press de hombros con mancuernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de pecho',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Intermedio para Perder Peso en Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Intermedio',
    goal: GoalEnum.LoseWeight,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 50,
          },
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Flexiones',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Sentadillas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Trote',
            sets: 1,
            repetitions: null,
            duration: 40,
          },
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Levantamiento de piernas acostado',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 4,
            repetitions: 45,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 50,
          },
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Burpees',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 4,
            repetitions: 45,
            duration: null,
          },
        ],
      },
    ],
  },

  {
    name: 'Plan Intermedio de Tonificación para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Intermedio',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Press de banca',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Sentadillas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps en banco',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 4,
            repetitions: 45,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Remo con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Fondos en paralelas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Curl de martillo',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Elevación frontal con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Press militar con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Crunches',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Hip Thrust',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Elevación de talones',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Intermedio de Ganancia de Masa Muscular para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Intermedio',
    goal: GoalEnum.MuscleMass,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Press de banca',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 4,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Sentadillas',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Press militar con barra',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps en banco',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Fondos en paralelas',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Sentadillas con peso',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Peso muerto rumano',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Press de banca inclinado',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Press militar sentado con mancuernas',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Curl de bíceps martillo',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Intermedio de Definición Muscular para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Intermedio',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Press de banca',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Sentadillas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Crunches',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps en banco',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 4,
            repetitions: 45,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Fondos en paralelas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 4,
            repetitions: 45,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Press militar con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Crunches inversos',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Elevación de talones',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Burpees',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Avanzado de Definición Muscular para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Avanzado',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Press de banca con mancuernas',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Sentadillas',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha ponderada',
            sets: 5,
            repetitions: 45,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Peso muerto rumano',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Dips con lastre',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Press militar con barra',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Flexiones de pecho',
            sets: 5,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Remo con barra T',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra Z',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Fondos en paralelas',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 5,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Press de piernas',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Crunches con peso',
            sets: 5,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Hip Thrust con barra',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevación de talones con peso',
            sets: 5,
            repetitions: 15,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Avanzado de Ganancia de Masa Muscular para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Avanzado',
    goal: GoalEnum.MuscleMass,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Press de banca',
            sets: 5,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 5,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Sentadillas pesadas',
            sets: 5,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Peso muerto',
            sets: 5,
            repetitions: 6,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Press militar',
            sets: 5,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 5,
            repetitions: 6,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Extensión de tríceps en polea alta',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Press de piernas',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Fondos en paralelas',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevaciones de gemelos en máquina',
            sets: 5,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Peso muerto rumano',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Curl de bíceps con mancuernas',
            sets: 5,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Extensiones de tríceps en polea alta',
            sets: 5,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Encogimientos de hombros con mancuernas',
            sets: 5,
            repetitions: 12,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Avanzado de Tonificación para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Avanzado',
    goal: GoalEnum.MuscleDefinition,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Press de banca',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Pull-ups',
            sets: 4,
            repetitions: 8,
            duration: null,
          },
          {
            name: 'Sentadillas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 4,
            repetitions: 45,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps en banco',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevaciones laterales con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Fondos en paralelas',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Curl de bíceps con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevaciones de gemelos con peso',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 4,
            repetitions: 45,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Press militar con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Crunches',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
          {
            name: 'Hip Thrust con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Elevaciones laterales de pierna',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
        ],
      },
    ],
  },
  {
    name: 'Plan Avanzado para Perder Peso para Hombres',
    sex: 'Hombre',
    ageRange: '18-24',
    level: 'Avanzado',
    goal: GoalEnum.LoseWeight,
    days: [
      {
        day: 'Lunes',
        exercises: [
          {
            name: 'Trote',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Sentadillas con peso',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Saltos de cuerda',
            sets: 4,
            repetitions: 50,
            duration: null,
          },
        ],
      },
      {
        day: 'Martes',
        exercises: [
          {
            name: 'Ciclismo',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Press de banca',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Remo con barra',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha',
            sets: 4,
            repetitions: 45,
            duration: null,
          },
        ],
      },
      {
        day: 'Jueves',
        exercises: [
          {
            name: 'Caminata',
            sets: 1,
            repetitions: null,
            duration: 45,
          },
          {
            name: 'Peso muerto',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones de tríceps',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Crunches',
            sets: 4,
            repetitions: 15,
            duration: null,
          },
        ],
      },
      {
        day: 'Viernes',
        exercises: [
          {
            name: 'Trote',
            sets: 1,
            repetitions: null,
            duration: 30,
          },
          {
            name: 'Zancadas con mancuernas',
            sets: 4,
            repetitions: 12,
            duration: null,
          },
          {
            name: 'Flexiones en barra fija',
            sets: 4,
            repetitions: 10,
            duration: null,
          },
          {
            name: 'Plancha lateral',
            sets: 4,
            repetitions: 45,
            duration: null,
          },
        ],
      },
    ],
  },
];

const exercisesSync = [
  {
    name: 'Caminata',
    description:
      'Realiza una caminata a un ritmo moderado o rápido, según tu nivel de condición física. Mantén una postura erguida y balancea los brazos naturalmente mientras caminas.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.CARDIO],
  },
  {
    name: 'Crunches',
    description:
      'Acuéstate boca arriba con las rodillas dobladas y los pies apoyados en el suelo. Coloca las manos detrás de la cabeza o cruzadas sobre el pecho y levanta el torso hacia las rodillas, contrayendo los abdominales. Baja lentamente hacia atrás y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Plancha lateral',
    description:
      'Acuéstate de lado con el antebrazo en el suelo y el codo bajo el hombro. Levanta las caderas del suelo, manteniendo el cuerpo en línea recta desde la cabeza hasta los pies. Mantén esta posición durante el tiempo deseado y luego cambia de lado.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS, BodyPartTargetedEnum.OBLIQUES],
  },
  {
    name: 'Mountain climbers',
    description:
      'Adopta una posición de plancha con los brazos extendidos y las manos debajo de los hombros. Lleva una rodilla hacia el pecho y luego alterna rápidamente las piernas, como si estuvieras corriendo en el lugar mientras te apoyas en los brazos. Mantén el core contraído durante todo el movimiento.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CARDIO,
      BodyPartTargetedEnum.ABS,
      BodyPartTargetedEnum.LEGS,
    ],
  },
  {
    name: 'Sentadillas con salto',
    description:
      'De pie con los pies separados al ancho de los hombros, realiza una sentadilla descendiendo hasta que los muslos estén paralelos al suelo. Luego, explota hacia arriba con fuerza, extendiendo las caderas y saltando en el aire. Aterriza suavemente y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.CARDIO],
  },
  {
    name: 'Flexiones',
    description:
      'Colócate en posición de plancha con las manos ligeramente más anchas que los hombros. Baja el cuerpo hacia el suelo flexionando los codos, manteniendo el cuerpo en línea recta desde la cabeza hasta los pies. Empuja el cuerpo hacia arriba hasta que los brazos estén extendidos, evitando bloquear los codos al final del movimiento.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.CORE,
    ],
  },
  {
    name: 'Peso muerto',
    description:
      'De pie con los pies separados al ancho de los hombros y una barra frente a ti, baja el torso hacia adelante manteniendo la espalda recta y flexionando las caderas. Agarra la barra con las manos separadas al ancho de los hombros y levántala hacia arriba manteniendo las piernas extendidas. Luego, baja la barra controladamente hacia el suelo y repite el movimiento.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.BACK,
      BodyPartTargetedEnum.HAMSTRINGS,
      BodyPartTargetedEnum.GLUTES,
    ],
  },
  {
    name: 'Fondos',
    description:
      'Colócate en paralelas con las manos apoyadas en las barras y los brazos extendidos. Baja el cuerpo flexionando los codos hasta que los hombros estén por debajo de los codos, manteniendo los codos cerca del cuerpo. Luego, empuja hacia arriba hasta que los brazos estén completamente extendidos, evitando bloquear los codos al final del movimiento.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.CORE,
    ],
  },
  {
    name: 'Plancha con elevación de pierna',
    description:
      'Adopta una posición de plancha con los antebrazos en el suelo y el cuerpo en línea recta desde la cabeza hasta los pies. Levanta una pierna hacia arriba manteniendo el cuerpo estable y la cadera nivelada. Mantén la pierna elevada durante unos segundos y luego baja controladamente. Alterna con la otra pierna.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Ciclismo',
    description:
      'Realiza ciclismo en una bicicleta estática o al aire libre para mejorar la resistencia cardiovascular, fortalecer las piernas y quemar calorías. Ajusta la resistencia según tu nivel de condición física y pedalea a un ritmo constante o en intervalos de alta intensidad.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.LEGS,
      BodyPartTargetedEnum.GLUTES,
      BodyPartTargetedEnum.CARDIO,
    ],
  },
  {
    name: 'Russian twists',
    description:
      'Siéntate en el suelo con las rodillas flexionadas y los pies apoyados en el suelo. Inclina el torso ligeramente hacia atrás y junta las manos frente al pecho. Gira el torso hacia un lado y luego hacia el otro, tocando el suelo al lado de tu cuerpo con las manos en cada repetición.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.OBLIQUES,
      BodyPartTargetedEnum.CORE,
    ],
  },
  {
    name: 'Levantamiento de piernas acostada',
    description:
      'Acuéstate boca arriba con las manos debajo de los glúteos para mayor apoyo. Levanta las piernas lentamente hacia arriba, manteniendo los abdominales contraídos y evitando arquear la espalda. Baja las piernas lentamente sin tocar el suelo y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS, BodyPartTargetedEnum.HIP],
  },
  {
    name: 'Superman',
    description:
      'Acuéstate boca abajo con los brazos extendidos frente a ti y las piernas estiradas. Levanta simultáneamente los brazos, el pecho y las piernas del suelo, manteniendo la cabeza en posición neutral. Mantén la contracción en la espalda baja y los glúteos durante unos segundos antes de bajar suavemente.',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Zancadas',
    description:
      'De pie, da un paso hacia adelante con una pierna y flexiona ambas rodillas hasta que formen ángulos de 90 grados. Asegúrate de que la rodilla delantera no se extienda más allá de los dedos de los pies. Empuja hacia arriba con la pierna delantera para volver a la posición inicial y repite con la otra pierna.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Flexiones de tríceps',
    description:
      'Colócate en posición de plancha con las manos colocadas debajo de los hombros y los codos apuntando hacia atrás. Baja el cuerpo hacia el suelo flexionando los codos, manteniendo los codos cerca del cuerpo. Luego, empuja hacia arriba hasta que los brazos estén extendidos completamente.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.CHEST,
    ],
  },
  {
    name: 'Remo con barra',
    description:
      'De pie con las piernas separadas al ancho de los hombros y la barra en frente de ti, inclina el torso hacia adelante manteniendo la espalda recta. Agarra la barra con las manos separadas al ancho de los hombros y los brazos extendidos. Lleva la barra hacia arriba hacia el abdomen manteniendo los codos cerca del cuerpo. Luego, baja la barra controladamente hacia abajo y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Elevación lateral con mancuernas',
    description:
      'De pie con una mancuerna en cada mano a los costados, levanta los brazos hacia los lados hasta que estén paralelos al suelo, manteniendo los codos ligeramente flexionados. Baja los brazos controladamente y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Abdominales bicicleta',
    description:
      'Acuéstate boca arriba con las manos detrás de la cabeza y las piernas levantadas en un ángulo de 90 grados. Extiende una pierna hacia afuera mientras giras el torso llevando el codo opuesto hacia la rodilla contraria. Alterna los lados como si estuvieras pedaleando en una bicicleta.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Abdominales en V',
    description:
      'Acuéstate boca arriba con las piernas extendidas y los brazos extendidos por encima de la cabeza. Levanta simultáneamente el torso y las piernas hacia el centro del cuerpo, formando una "V" con el cuerpo. Mantén la contracción en los abdominales durante un segundo y luego baja controladamente.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Estocadas',
    description:
      'De pie con los pies separados al ancho de los hombros, da un paso hacia adelante con una pierna y flexiona ambas rodillas hasta que formen ángulos de 90 grados. Asegúrate de que la rodilla delantera no se extienda más allá de los dedos de los pies. Empuja hacia arriba con la pierna delantera para volver a la posición inicial y repite con la otra pierna.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Elevación de talones',
    description:
      'De pie con los pies separados al ancho de los hombros, levanta los talones del suelo manteniendo el resto del pie en contacto con el suelo. Mantén la posición elevada durante un segundo y luego baja controladamente los talones de vuelta al suelo.',
    bodyPartTargeted: [BodyPartTargetedEnum.TWINS],
  },
  {
    name: 'Flexiones inclinadas',
    description:
      'Colócate en posición de plancha con las manos apoyadas en una superficie elevada, como una silla o un banco. Baja el cuerpo hacia el suelo flexionando los codos, manteniendo el cuerpo en línea recta desde la cabeza hasta los pies. Empuja el cuerpo hacia arriba hasta que los brazos estén extendidos completamente.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Remo con mancuerna',
    description:
      'De pie con una mancuerna en cada mano, inclina el torso hacia adelante manteniendo la espalda recta. Con los brazos extendidos, lleva las mancuernas hacia arriba hacia el abdomen manteniendo los codos cerca del cuerpo. Luego, baja las mancuernas controladamente hacia abajo y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Plancha',
    description:
      'Colócate en posición de plancha con los antebrazos en el suelo y el cuerpo en línea recta desde la cabeza hasta los pies. Mantén la contracción en los abdominales y los glúteos, evitando que las caderas se hundan o se levanten.',
    bodyPartTargeted: [BodyPartTargetedEnum.CORE],
  },
  {
    name: 'Sentadillas con peso',
    description:
      'De pie con los pies separados al ancho de los hombros y una barra o mancuernas sostenidas en los hombros, baja el cuerpo flexionando las rodillas y las caderas hasta que los muslos estén paralelos al suelo. Empuja hacia arriba con los talones para volver a la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Crunches cruzados',
    description:
      'Acuéstate boca arriba con las manos detrás de la cabeza y las piernas levantadas en un ángulo de 90 grados. Levanta el torso y lleva el codo derecho hacia la rodilla izquierda mientras extiendes la pierna derecha. Alterna los lados en cada repetición, llevando el codo izquierdo hacia la rodilla derecha.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Press de hombros con mancuernas',
    description:
      'De pie con una mancuerna en cada mano a la altura de los hombros, levanta las mancuernas hacia arriba sobre la cabeza manteniendo los codos ligeramente flexionados. Extiende completamente los brazos por encima de la cabeza y luego baja controladamente las mancuernas a la posición inicial.',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Zancadas con mancuernas',
    description:
      'De pie con una mancuerna en cada mano a los costados, da un paso hacia adelante con una pierna y flexiona ambas rodillas hasta que formen ángulos de 90 grados. Asegúrate de que la rodilla delantera no se extienda más allá de los dedos de los pies. Empuja hacia arriba con la pierna delantera para volver a la posición inicial y repite con la otra pierna.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Sentadillas',
    description:
      'De pie con los pies separados al ancho de los hombros, baja el cuerpo flexionando las rodillas y las caderas hasta que los muslos estén paralelos al suelo. Mantén la espalda recta y el peso en los talones. Empuja hacia arriba con los talones para volver a la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Press de banca',
    description:
      'Acuéstate en un banco con la barra sobre el pecho, los pies apoyados en el suelo y los glúteos y la espalda en contacto con el banco. Agarra la barra con las manos separadas al ancho de los hombros y baja la barra hacia el pecho controladamente. Empuja la barra hacia arriba hasta que los brazos estén extendidos completamente y repite el movimiento.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Pull-ups',
    description:
      'Agarra la barra de dominadas con las manos separadas al ancho de los hombros y las palmas hacia afuera. Cuelga del barra con los brazos completamente extendidos. Luego, lleva el cuerpo hacia arriba hasta que el mentón pase por encima de la barra, manteniendo los codos cerca del cuerpo. Baja controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Curl de bíceps con barra',
    description:
      'De pie con los pies separados al ancho de los hombros, sujeta una barra con las manos separadas al ancho de los hombros y las palmas hacia afuera. Flexiona los codos para levantar la barra hacia los hombros, manteniendo los codos cerca del cuerpo. Baja la barra controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Press militar con mancuernas',
    description:
      'Sentado en un banco con respaldo vertical, sujeta una mancuerna en cada mano a la altura de los hombros con las palmas mirando hacia adelante. Extiende los brazos hacia arriba para levantar las mancuernas sobre la cabeza, manteniendo los codos ligeramente flexionados. Baja las mancuernas controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Press de piernas',
    description:
      'Sentado en una máquina de press de piernas, coloca los pies en la plataforma a la altura de los hombros. Empuja la plataforma hacia arriba extendiendo las piernas completamente. Baja la plataforma controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS],
  },
  {
    name: 'Fondos en máquina',
    description:
      'Sujétate de las asas de una máquina de fondos con los brazos extendidos y el cuerpo en posición vertical. Flexiona los codos para bajar el cuerpo hacia abajo, manteniendo los codos cerca del cuerpo. Empuja hacia arriba con los brazos para volver a la posición inicial y repite el movimiento.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Curl de bíceps con mancuernas',
    description:
      'De pie con los pies separados al ancho de los hombros, sujeta una mancuerna en cada mano con los brazos extendidos a los costados y las palmas mirando hacia adelante. Flexiona los codos para levantar las mancuernas hacia los hombros, manteniendo los codos cerca del cuerpo. Baja las mancuernas controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Press de hombros con barra',
    description:
      'De pie con los pies separados al ancho de los hombros, sujeta una barra con las manos separadas al ancho de los hombros y las palmas hacia adelante. Levanta la barra hacia arriba sobre la cabeza extendiendo los brazos completamente. Baja la barra controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Curl de bíceps alterno',
    description:
      'De pie con los pies separados al ancho de los hombros, sujeta una mancuerna en cada mano con los brazos extendidos a los costados y las palmas mirando hacia adelante. Flexiona un codo para levantar la mancuerna hacia el hombro mientras mantienes el otro brazo extendido. Baja la mancuerna controladamente y repite el movimiento con el otro brazo.',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Extensiones de tríceps con mancuerna',
    description:
      'De pie con los pies separados al ancho de los hombros, sujeta una mancuerna con ambas manos por encima de la cabeza con los brazos extendidos. Flexiona los codos para bajar la mancuerna detrás de la cabeza, manteniendo los codos apuntando hacia adelante. Extiende los brazos para levantar la mancuerna hacia arriba y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.TRICEPS],
  },
  {
    name: 'Trote',
    description:
      'Corre a un ritmo moderado o intenso durante un período de tiempo determinado, como parte de un ejercicio cardiovascular para mejorar la resistencia y quemar calorías.',
    bodyPartTargeted: [BodyPartTargetedEnum.CARDIO],
  },
  {
    name: 'Elevaciones laterales con mancuernas',
    description:
      'De pie con una mancuerna en cada mano a los costados con las palmas mirando hacia el cuerpo, levanta las mancuernas hacia los lados hasta que los brazos estén paralelos al suelo. Mantén los codos ligeramente flexionados durante el movimiento. Baja las mancuernas controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Extensiones de tríceps en polea alta',
    description:
      'De pie frente a una polea alta con una cuerda o barra fija, agarra la cuerda o la barra con las manos separadas al ancho de los hombros y las palmas hacia abajo. Extiende los brazos hacia abajo frente a ti manteniendo los codos cerca del cuerpo. Flexiona los codos para volver a la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.TRICEPS],
  },
  {
    name: 'Flexiones de rodillas',
    description:
      'Acuéstate boca arriba con las rodillas dobladas y los pies apoyados en el suelo. Levanta las caderas hacia arriba formando una línea recta desde los hombros hasta las rodillas. Mantén la posición durante unos segundos y luego baja las caderas controladamente hasta la posición inicial. Repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS],
  },
  {
    name: 'Flexiones de tríceps en banco',
    description:
      'Siéntate en un banco con las manos apoyadas en el borde y los dedos apuntando hacia adelante. Levanta las caderas hacia adelante y baja el cuerpo flexionando los codos hasta que los brazos formen un ángulo de 90 grados. Extiende los brazos para volver a la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.TRICEPS],
  },
  {
    name: 'Peso muerto con barra',
    description:
      'De pie con los pies separados al ancho de los hombros y la barra frente a ti, inclínate hacia adelante desde la cintura manteniendo la espalda recta y agarra la barra con las manos separadas al ancho de los hombros. Levanta la barra hacia arriba manteniendo la espalda recta hasta que estés de pie completamente erguido. Baja la barra controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.LEGS],
  },
  {
    name: 'Levantamiento de piernas colgando',
    description:
      'Sujétate de una barra fija con las manos separadas al ancho de los hombros y las palmas mirando hacia adelante. Levanta las piernas flexionando las caderas y las rodillas hasta que los muslos estén paralelos al suelo o más altos. Baja las piernas controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Flexiones de brazos',
    description:
      'Acuéstate boca abajo con las manos apoyadas en el suelo a la altura de los hombros y los pies juntos. Extiende los brazos para levantar el cuerpo del suelo, manteniendo el cuerpo en línea recta desde los hombros hasta los pies. Baja el cuerpo controladamente hasta que el pecho casi toque el suelo y luego vuelve a subir.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Flexiones de pecho',
    description:
      'Acuéstate boca abajo con las manos apoyadas en el suelo a la altura de los hombros y los pies juntos. Extiende los brazos para levantar el cuerpo del suelo, manteniendo el cuerpo en línea recta desde los hombros hasta los pies. Baja el cuerpo controladamente hasta que el pecho casi toque el suelo y luego vuelve a subir.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Peso muerto rumano',
    description:
      'De pie con los pies separados al ancho de los hombros, sujeta una barra con las manos separadas al ancho de los hombros y las palmas mirando hacia el cuerpo. Mantén las piernas rectas con una ligera flexión en las rodillas y baja la barra hacia abajo manteniendo la espalda recta. Levanta la barra hacia arriba llevando las caderas hacia adelante hasta que estés de pie erguido. Baja la barra controladamente hasta la posición inicial y repite el movimiento.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.BACK,
      BodyPartTargetedEnum.HAMSTRINGS,
    ],
  },
  {
    name: 'Sentadillas con barra',
    description:
      'De pie con los pies separados al ancho de los hombros, coloca la barra sobre la parte superior de la espalda y los hombros. Flexiona las rodillas y las caderas para bajar el cuerpo hacia abajo como si te fueras a sentar en una silla, manteniendo la espalda recta. Empuja hacia arriba con las piernas para volver a la posición inicial y repite el movimiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS],
  },
  {
    name: 'Hip Thrust',
    description:
      'Siéntate en el suelo con la espalda apoyada en un banco y una barra colocada sobre tus caderas. Dobla las rodillas y apoya los pies en el suelo cerca de tus glúteos. Levanta las caderas hacia arriba extendiendo las caderas, manteniendo los hombros, la espalda y los pies alineados. Baja las caderas controladamente hasta que estén casi tocando el suelo y luego vuelve a subir.',
    bodyPartTargeted: [BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Press de banca con mancuernas',
    description:
      'Acuéstate sobre un banco plano con una mancuerna en cada mano, los pies apoyados en el suelo y las rodillas flexionadas. Extiende los brazos verticalmente hacia arriba con las mancuernas, manteniendo los codos ligeramente flexionados. Baja las mancuernas controladamente hacia los lados del pecho, manteniendo los codos cerca del cuerpo, y luego vuelve a subir a la posición inicial.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Correr',
    description:
      'Corre a un ritmo moderado o rápido durante un período de tiempo continuo. Ajusta la velocidad y la distancia según tu nivel de condición física y objetivos de entrenamiento.',
    bodyPartTargeted: [BodyPartTargetedEnum.CARDIO],
  },
  {
    name: 'Press de banca con barra',
    description:
      'Acuéstate sobre un banco plano con los pies apoyados en el suelo y las rodillas flexionadas. Agarra la barra con las manos separadas al ancho de los hombros y los codos doblados. Extiende los brazos verticalmente hacia arriba con la barra, manteniendo los codos ligeramente flexionados. Baja la barra controladamente hacia el pecho y luego vuelve a subir a la posición inicial.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Press militar con barra',
    description:
      'De pie con los pies separados al ancho de los hombros, agarra la barra con las manos separadas al ancho de los hombros y las palmas mirando hacia adelante. Levanta la barra hacia arriba sobre la cabeza, extendiendo los brazos completamente. Baja la barra controladamente hacia los hombros y luego vuelve a subir a la posición inicial.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Levantamiento de piernas acostado',
    description:
      'Acuéstate boca arriba con las piernas extendidas y los brazos a los lados. Levanta las piernas rectas hacia arriba, manteniendo la parte baja de la espalda pegada al suelo. Baja las piernas controladamente hacia abajo sin tocar el suelo y luego vuelve a subirlas.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Burpees',
    description:
      'Comienza de pie, luego agáchate y coloca las manos en el suelo. Salta con los pies hacia atrás para quedar en posición de plancha. Haz una flexión de brazos, luego salta los pies hacia adelante para regresar a la posición de cuclillas. Finalmente, salta hacia arriba con los brazos extendidos por encima de la cabeza.',
    bodyPartTargeted: [BodyPartTargetedEnum.FULL_BODY],
  },
  {
    name: 'Fondos en paralelas',
    description:
      'Sujétate de dos barras paralelas con los brazos extendidos y el cuerpo suspendido en el aire. Baja el cuerpo flexionando los codos hasta que los hombros estén por debajo de los codos. Luego, extiende los brazos para volver a la posición inicial.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.CHEST,
    ],
  },
  {
    name: 'Curl de martillo',
    description:
      'De pie con una mancuerna en cada mano, los brazos a los lados del cuerpo y las palmas mirando hacia los muslos. Flexiona los codos para levantar las mancuernas hacia los hombros manteniendo las palmas en posición neutral. Baja las mancuernas controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Elevación frontal con mancuernas',
    description:
      'De pie con una mancuerna en cada mano, los brazos extendidos y las palmas mirando hacia el cuerpo. Levanta las mancuernas hacia adelante hasta que estén a la altura de los hombros, manteniendo los brazos rectos. Baja las mancuernas controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Press de banca inclinado',
    description:
      'Acuéstate sobre un banco inclinado con los pies apoyados en el suelo y las rodillas flexionadas. Agarra la barra con las manos separadas al ancho de los hombros y los codos doblados. Extiende los brazos verticalmente hacia arriba con la barra, manteniendo los codos ligeramente flexionados. Baja la barra controladamente hacia el pecho y luego vuelve a subir a la posición inicial.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Press militar sentado con mancuernas',
    description:
      'Siéntate en un banco con respaldo vertical con una mancuerna en cada mano, los pies apoyados en el suelo y las rodillas flexionadas. Levanta las mancuernas hacia arriba sobre la cabeza, extendiendo los brazos completamente. Baja las mancuernas controladamente hacia los hombros y luego vuelve a subir a la posición inicial.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Curl de bíceps martillo',
    description:
      'De pie con una mancuerna en cada mano, los brazos a los lados del cuerpo y las palmas mirando hacia los muslos. Flexiona los codos para levantar las mancuernas hacia los hombros manteniendo las palmas en posición neutra. Baja las mancuernas controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Crunches inversos',
    description:
      'Acuéstate boca arriba con las piernas flexionadas y los pies levantados del suelo. Coloca las manos detrás de la cabeza o a los lados del cuerpo. Levanta los hombros del suelo mientras contraes los abdominales, elevando las piernas hacia el techo. Baja controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Pull-Ups',
    description:
      'Agarra una barra con las manos separadas al ancho de los hombros y las palmas mirando hacia adelante. Levántate con los brazos extendidos hasta que tu barbilla esté por encima de la barra. Baja controladamente hasta la posición inicial y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK, BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Plancha ponderada',
    description:
      'Adopta la posición de plancha con los antebrazos apoyados en el suelo y el cuerpo en línea recta desde la cabeza hasta los talones. Coloca un peso sobre la espalda y mantén la posición el mayor tiempo posible, asegurándote de mantener el núcleo contraído y la espalda recta.',
    bodyPartTargeted: [BodyPartTargetedEnum.CORE],
  },
  {
    name: 'Dips con lastre',
    description:
      'Sujétate de dos barras paralelas con los brazos extendidos y el cuerpo suspendido en el aire. Coloca peso adicional en un cinturón de lastre o una mochila. Baja el cuerpo flexionando los codos hasta que los hombros estén por debajo de los codos. Luego, extiende los brazos para volver a la posición inicial.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.TRICEPS,
      BodyPartTargetedEnum.CHEST,
    ],
  },
  {
    name: 'Remo con barra T',
    description:
      'De pie con las rodillas ligeramente flexionadas y la espalda recta, inclínate hacia adelante desde la cintura. Agarra una barra con las manos separadas al ancho de los hombros y las palmas mirando hacia abajo. Levanta la barra hacia el pecho manteniendo los codos cerca del cuerpo. Baja la barra controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.BACK],
  },
  {
    name: 'Curl de bíceps con barra Z',
    description:
      'De pie con los pies separados al ancho de los hombros y agarra una barra Z con las manos en pronación. Flexiona los codos para levantar la barra hacia los hombros manteniendo los codos pegados al cuerpo. Baja la barra controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.BICEPS],
  },
  {
    name: 'Crunches con peso',
    description:
      'Acuéstate boca arriba con las piernas flexionadas y los pies apoyados en el suelo. Sujeta un peso cerca del pecho o detrás de la cabeza. Levanta los hombros del suelo mientras contraes los abdominales, elevando la parte superior del torso hacia las rodillas. Baja controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.ABS],
  },
  {
    name: 'Hip Thrust con barra',
    description:
      'Siéntate en el suelo con la espalda apoyada en un banco horizontal y una barra sobre las caderas. Coloca una almohadilla o toalla doblada sobre las caderas para mayor comodidad. Flexiona las rodillas y lleva los pies hacia el cuerpo. Levanta las caderas hacia arriba hasta que el cuerpo esté en una línea recta desde las rodillas hasta los hombros. Baja controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.GLUTES, BodyPartTargetedEnum.HIP],
  },
  {
    name: 'Elevación de talones con peso',
    description:
      'De pie con los pies separados al ancho de los hombros y sostén una pesa en cada mano con los brazos a los lados del cuerpo. Levanta los talones del suelo para elevar los talones lo más alto posible. Baja controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.CALVES],
  },
  {
    name: 'Sentadillas pesadas',
    description:
      'De pie con los pies separados al ancho de los hombros y la barra apoyada sobre los hombros. Flexiona las rodillas y baja el cuerpo hacia abajo como si te sentaras en una silla. Mantén la espalda recta y los talones apoyados en el suelo. Empuja a través de los talones para volver a la posición inicial.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS, BodyPartTargetedEnum.GLUTES],
  },
  {
    name: 'Press militar',
    description:
      'Siéntate en un banco con respaldo vertical con una barra sobre los hombros. Agarra la barra con las manos separadas al ancho de los hombros y los codos hacia afuera. Presiona la barra hacia arriba hasta que los brazos estén completamente extendidos. Baja la barra controladamente hasta la altura de los hombros y repite.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.SHOULDERS,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
  {
    name: 'Extensión de tríceps en polea alta',
    description:
      'De pie frente a una máquina de polea alta con una cuerda o barra de tríceps enganchada. Agarra la cuerda o la barra con las manos separadas al ancho de los hombros y los codos hacia arriba. Extiende los codos para bajar la cuerda o la barra hacia abajo hasta que los brazos estén completamente extendidos. Luego, flexiona los codos para volver a la posición inicial.',
    bodyPartTargeted: [BodyPartTargetedEnum.TRICEPS],
  },
  {
    name: 'Elevaciones de gemelos en máquina',
    description:
      'Siéntate en la máquina de elevación de gemelos con los hombros bajo los cojines de los hombros y las bolas de los pies en el borde inferior de la plataforma. Levanta los talones lo más alto posible contrayendo los músculos de los gemelos. Baja controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.CALVES],
  },
  {
    name: 'Encogimientos de hombros con mancuernas',
    description:
      'De pie con los pies separados al ancho de los hombros y una mancuerna en cada mano a los costados del cuerpo. Eleva los hombros hacia las orejas lo más alto posible mientras mantienes los brazos rectos. Baja los hombros controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.SHOULDERS],
  },
  {
    name: 'Elevaciones de gemelos con peso',
    description:
      'De pie con los pies separados al ancho de los hombros y sostén un peso en cada mano con los brazos a los lados del cuerpo. Levanta los talones lo más alto posible contrayendo los músculos de los gemelos. Baja controladamente y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.CALVES],
  },
  {
    name: 'Elevaciones laterales de pierna',
    description:
      'De pie con los pies juntos y las manos en las caderas o sujetas a un soporte para mayor equilibrio. Levanta una pierna hacia el lado lo más alto posible mientras mantienes la pierna extendida. Baja controladamente y repite con la otra pierna.',
    bodyPartTargeted: [BodyPartTargetedEnum.LEGS],
  },
  {
    name: 'Saltos de cuerda',
    description:
      'Sostén una cuerda de saltar con ambas manos y colócala detrás de ti. Salta sobre la cuerda, manteniendo las muñecas ligeramente giradas para girar la cuerda. Aterriza suavemente en la parte delantera de los pies y repite.',
    bodyPartTargeted: [BodyPartTargetedEnum.CARDIO],
  },
  {
    name: 'Flexiones en barra fija',
    description:
      'Agarra una barra fija con las manos separadas al ancho de los hombros y las palmas hacia afuera. Extiende los brazos para levantar el cuerpo del suelo hasta que los brazos estén completamente extendidos. Baja el cuerpo controladamente hasta que los codos estén a 90 grados y repite.',
    bodyPartTargeted: [
      BodyPartTargetedEnum.CHEST,
      BodyPartTargetedEnum.TRICEPS,
    ],
  },
];

async function generateAllPlan(plan: IPlan) {
  const createdPlan = await Plan.create({
    name: plan.name,
    sex: plan.sex,
    ageRange: plan.ageRange,
    level: plan.level,
    goal: plan.goal,
  });
  for (const day of plan.days) {
    const createdDay = await PlanDay.create({
      planId: createdPlan.id,
      day: day.day,
    });
    for (const exercise of day.exercises) {
      const createdExercise = await Exercise.findOrCreate({
        where: { name: exercise.name },
        defaults: exercisesSync.find((e) => e.name === exercise.name) as any,
      });
      await PlanDayExercise.create({
        planDayId: createdDay.id,
        exerciseId: createdExercise[0].id,
        sets: exercise.sets,
        repetitions: exercise.repetitions,
        duration: exercise.duration,
      });
    }
  }
}

async function syncDatabase() {
  try {
    sequelize.addModels([User, Exercise, Plan, PlanDay, PlanDayExercise]);
    sequelize.sync({ force: true }).then(async (res) => {
      // const exercises = [];
      // for (const plan of AllPlans) {
      //   for (const days of plan.days) {
      //     for (const exercise of days.exercises) {
      //       exercises.push(exercise.name);
      //     }
      //   }
      // }
      // console.log(
      //   exercises.filter((item, index) => exercises.indexOf(item) === index),
      // );

      for (const plan of AllPlans) {
        generateAllPlan(plan);
      }
      // const exercises = await Exercise.bulkCreate(exercisesSync as any);
      // const plans = await Plan.bulkCreate(plansSync as any);
      // const plansDays = await PlanDay.bulkCreate([
      //   {
      //     planId: plans.find((plan) => plan.name === 'Plan de Perdida de Peso')
      //       .id,
      //     day: DayEnum.Monday,
      //   },
      //   {
      //     planId: plans.find((plan) => plan.name === 'Plan de Perdida de Peso')
      //       .id,
      //     day: DayEnum.Wednesday,
      //   },
      //   {
      //     planId: plans.find((plan) => plan.name === 'Plan de Perdida de Peso')
      //       .id,
      //     day: DayEnum.Friday,
      //   },
      // ]);
      // const planDayExercises = await PlanDayExercise.bulkCreate([
      //   {
      //     planDayId: plansDays.find((planDay) => planDay.day === DayEnum.Monday)
      //       .id,
      //     exerciseId: exercises.find((exercise) => exercise.name === 'Trote')
      //       .id,
      //     sets: null,
      //     repetitions: null,
      //     duration: 30,
      //   },
      //   {
      //     planDayId: plansDays.find((planDay) => planDay.day === DayEnum.Monday)
      //       .id,
      //     exerciseId: exercises.find((exercise) => exercise.name === 'Caminata')
      //       .id,
      //     sets: null,
      //     repetitions: null,
      //     duration: 5,
      //   },
      // ]);
      console.log('Database synced', res);
    });
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

syncDatabase();
