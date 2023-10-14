import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from '@nestjs/apollo';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>, // 👈👈
  ) {}

  async findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepository.findOne({ where: { id } });
    if (!coffee) {
      // ⚠️ If you use the latest version of Apollo (>= v4), import "UserInputError" from "@nestjs/graphql"
      // Users that still depend on Apollo v3 can import this class from the "apollo-server-express" package
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const coffee = this.coffeesRepository.create(createCoffeeInput);
    return this.coffeesRepository.save(coffee);
  }
}
