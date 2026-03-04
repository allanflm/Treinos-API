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
      // CORRIGIDO
      order: number;
      name: string;
      sets: number;
      reps: number;
      restTimeInSeconds: number; // CORRIGIDO
    }>;
  }>;
}

export class CreateWorkoutPlan {
  async execute(dto: InputDto) {
    // Importante: Mova a busca para dentro da transação para evitar que 2 planos fiquem ativos
    return prisma.$transaction(async (tx) => {
      // 1. Desativa plano ativo do usuário específico
      const existingActiveWorkoutPlan = await tx.workoutPlan.findFirst({
        where: { userId: dto.userId, isActive: true },
      });

      if (existingActiveWorkoutPlan) {
        await tx.workoutPlan.update({
          where: { id: existingActiveWorkoutPlan.id },
          data: { isActive: false },
        });
      }

      // 2. Cria o plano (usando os nomes EXATOS do schema.prisma)
      const workoutPlan = await tx.workoutPlan.create({
        data: {
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
                // Nome da relação no WorkoutDay model
                create: day.exercises.map((ex) => ({
                  name: ex.name,
                  order: ex.order,
                  sets: ex.sets,
                  reps: ex.reps,
                  restTimeInSeconds: ex.restTimeInSeconds, // Nome no WorkoutExercise model
                })),
              },
            })),
          },
        },
      });

      // 3. Busca o resultado completo para retornar ao cliente
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
