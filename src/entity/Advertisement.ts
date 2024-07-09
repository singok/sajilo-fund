import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Advertisement extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    link: string 

    @Column()
    order: number

    @Column({
        nullable: true
    })
    image: string

    @Column({
        default: true
    })
    is_active: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({
        nullable: true
    })
    updated_at: Date 
}