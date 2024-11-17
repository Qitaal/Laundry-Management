import { hash } from 'bcrypt';
import { Cloth } from '../../clothes/entities/cloth.entity';
import { AbstractEntity } from 'src/common/abstract.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @OneToMany('Cloth', 'user')
  cloth?: Cloth[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }
}
