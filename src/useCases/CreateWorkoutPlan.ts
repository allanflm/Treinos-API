import { NotFoundError } from "../errors/index.js";
import { WeekDay } from "../generated/prisma/enums.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
  name: string;
  workoutDays: Array<{
    name: string;
    weekDay: WeekDay;
    isRest: boolean;
    estimatedDurationInSeconds: number;
    exercises: Array<{
      order: number;
      name: string;
      sets: number;
      reps: number;
      restTimeInSeconds: number;
    }>;
  }>;
}

export class CreateWorkoutPlan {
  async execute(dto: InputDto) {
    return prisma.$transaction(async (tx) => {
      const existingActiveWorkoutPlan = await tx.workoutPlan.findFirst({
        where: { userId: dto.userId, isActive: true },
      });

      if (existingActiveWorkoutPlan) {
        await tx.workoutPlan.update({
          where: { id: existingActiveWorkoutPlan.id },
          data: { isActive: false },
        });
      }
      const workoutPlan = await tx.workoutPlan.create({
        data: {
          id: crypto.randomUUID(),
          name: dto.name,
          userId: dto.userId,
          isActive: true,
          workoutDays: {
            create: dto.workoutDays.map((day) => ({
              name: day.name,
              weekDay: day.weekDay,
              isRest: day.isRest,
              estimatedDurationInSeconds: day.estimatedDurationInSeconds,
              exercises: {
                create: day.exercises.map((ex) => ({
                  name: ex.name,
                  order: ex.order,
                  sets: ex.sets,
                  reps: ex.reps,
                  restTimeInSeconds: ex.restTimeInSeconds,
                })),
              },
            })),
          },
        },
      });

      const result = await tx.workoutPlan.findUnique({
        where: { id: workoutPlan.id },
        include: {
          workoutDays: {
            include: {
              exercises: true,
            },
          },
        },
      });

      if (!result) throw new NotFoundError("Workout plan not found");
      return result;
    });
  }
}
