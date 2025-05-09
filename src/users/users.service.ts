// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    console.log('findAll');
    return this.userRepository.find();
  }

  async getTopCreator(): Promise<Partial<User>[]> {
    console.log('getTopCreator');
    const result = await this.userRepository.query(`
    WITH top_posters AS (
      SELECT 
        creator_id,
        COUNT(*) AS post_count
      FROM public."users"
      GROUP BY creator_id
      ORDER BY post_count DESC
      LIMIT 2
    )

    /*
    select
      creator_id, post_count
    from 
      top_posters;
    */
    
    SELECT
      ROUND((SUM(top_posters.post_count) * 100 / 
        (SELECT COUNT(*) FROM public."users")), 2) AS top_2_posters_percentage
    FROM top_posters;
    
  `);

    return result;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(user: Partial<User>): Promise<User> {
    console.log('create');
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updates: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updates);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
