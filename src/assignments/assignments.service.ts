import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { User } from '../users/entities/user.entity';
import { Shift } from '../shifts/entities/shift.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private assignmentModel: typeof Assignment,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Shift)
    private shiftModel: typeof Shift,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    // Verify user exists
    const user = await this.userModel.findByPk(createAssignmentDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createAssignmentDto.userId} not found`,
      );
    }

    // Verify shift exists
    const shift = await this.shiftModel.findByPk(createAssignmentDto.shiftId);
    if (!shift) {
      throw new NotFoundException(
        `Shift with ID ${createAssignmentDto.shiftId} not found`,
      );
    }

    // Check if assignment already exists
    const existingAssignment = await this.assignmentModel.findOne({
      where: {
        userId: createAssignmentDto.userId,
        shiftId: createAssignmentDto.shiftId,
      },
    });

    if (existingAssignment) {
      throw new ConflictException('Assignment already exists');
    }

    return await this.assignmentModel.create(createAssignmentDto as any);
  }
}
