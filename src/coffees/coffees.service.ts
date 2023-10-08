import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';

@Injectable()
export class CoffeesService {
  async findAll() {
    return [];
  }

  async findOne(id: number) {
    return null;
  }

  async create(CreateCoffeeInput: CreateCoffeeInput) {
    return null;
  }
}
