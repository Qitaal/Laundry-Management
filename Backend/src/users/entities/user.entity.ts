import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;
}
