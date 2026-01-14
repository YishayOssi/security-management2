import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Shift } from '../../shifts/entities/shift.entity';

@Table({
  tableName: 'assignments',
  timestamps: true,
})
export class Assignment extends Model<Assignment> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Shift)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  shiftId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Shift)
  shift: Shift;
}
