import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('events')
export default class EventEntity {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({nullable: false, default: ''})
  name!: string;

  @Column({ nullable: false, default: 0})
  count!: number;

  @Column('datetime', {name: 'occurrence_time', nullable: false})
  occurrenceTime!: Date;
  
}