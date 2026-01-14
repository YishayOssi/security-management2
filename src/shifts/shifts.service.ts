import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './entities/shift.entity';
import { UserRole } from '../users/dto/create-user.dto';
import { Assignment } from '../assignments/entities/assignment.entity';
import { Op } from 'sequelize';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift)
    private shiftModel: typeof Shift,
    @InjectModel(Assignment)
    private assignmentModel: typeof Assignment,
  ) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    return await this.shiftModel.create({
      startTime: new Date(createShiftDto.startTime),
      endTime: new Date(createShiftDto.endTime),
      location: createShiftDto.location,
    } as any);
  }

  async findAll(userId: number, role: UserRole): Promise<Shift[]> {
    if (role === UserRole.COMMANDER) {
      // Commanders see all shifts
      return await this.shiftModel.findAll({
        order: [['startTime', 'ASC']],
      });
    } else {
      // Soldiers see only their assigned shifts
      // Get shift IDs from assignments
      const assignments = await this.assignmentModel.findAll({
        where: { userId },
        attributes: ['shiftId'],
      });

      const shiftIds = assignments.map((a) => a.shiftId);

      if (shiftIds.length === 0) {
        return [];
      }

      // Get the actual shifts
      return await this.shiftModel.findAll({
        where: {
          id: {
            [Op.in]: shiftIds,
          },
        },
        order: [['startTime', 'ASC']],
      });
    }
  }
}
