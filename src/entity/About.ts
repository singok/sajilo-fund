import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class About extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    section_title: string 

    @Column()
    title: string

    @Column({
        type: "mediumtext"
    })
    description: string

    @Column()
    order: number

    @Column()
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