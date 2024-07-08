import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { Profile } from "./Profile"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string 

    @Column({
        length: '100'
    }) 
    password: string

    @BeforeInsert()
    async setPassword(password: string) {
        const bcrypt = await import('bcrypt-ts');
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(password || this.password, salt)
    }

    @BeforeUpdate()
    async hashPassword() {
        const bcrypt = await import('bcrypt-ts');
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }

    @Column({
        type: "boolean",
        default: false
    })
    is_active: Boolean

    @OneToOne(() => Profile, { cascade: ["insert", "update", "remove"], eager: true})
    @JoinColumn()
    profile: Profile

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({
        nullable: true
    })
    updated_at: Date
}