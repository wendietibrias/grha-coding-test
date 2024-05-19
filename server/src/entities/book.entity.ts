import {
     Entity,
     Column, 
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     ManyToOne,
     JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({name:'books'})
export class BookEntity{
    @PrimaryGeneratedColumn({ type:"bigint" })
    id: number;

    @Column({ type:'varchar',length:100 })
    title: string;

    @ManyToOne(()=> UserEntity, (user)=> user.books)
    @JoinColumn({ name:'user_id' })
    user: UserEntity

    @Column({ type:"varchar",length:50 })
    category:string;

    @Column({ type:"text" })
    description:string;

    @Column({ type:"integer" })
    total_page: number;

    @Column({ type:"varchar", length:25 })
    language:string;

    @Column({ type:"varchar",length:100 })
    author:string;

    @Column({ type:"varchar", length:100 })
    publisher:string;

    @Column({ type:"varchar",length:25 })
    isbn:string;

    @Column({ type:"boolean",default:false })
    is_finish_read:boolean;

    @Column({ type:"tinytext" })
    cover_url: string;

    @Column({ type:"tinytext" })
    cover_id: string;

    @Column({ type:"date" })
    release_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 
}