import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommanderGuard } from '../auth/guards/commander.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('shifts')
@UseGuards(JwtAuthGuard)
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @UseGuards(CommanderGuard)
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  @Get()
  findAll(@CurrentUser() user: { id: number; role: string }) {
    return this.shiftsService.findAll(user.id, user.role as any);
  }
}
