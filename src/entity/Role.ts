import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({
        nullable: true
    })
    updated_at: Date
}
