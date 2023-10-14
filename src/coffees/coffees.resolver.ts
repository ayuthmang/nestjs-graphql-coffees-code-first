import { Args, ID, Mutation, Query, Subscription } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { CoffeesService } from './coffees.service';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class CoffeesResolver {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return this.coffeesService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee', nullable: true })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'updateCoffee' })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'removeCoffee' })
  async remove(@Args('id', ParseIntPipe) id: number) {
    return this.coffeesService.remove(id);
  }

  @Subscription(() => Coffee)
  coffeeAdded() {
    return this.pubSub.asyncIterator('coffeeAdded');
  }
}
