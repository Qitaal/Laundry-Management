import { AbstractEntity } from 'src/common/abstract.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Cloth extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100 })
  tag!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  imagePath?: string;

  @Transform(({ value }) => value.id)
  @ManyToOne('User', 'cloth', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
