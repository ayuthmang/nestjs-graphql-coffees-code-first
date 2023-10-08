import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCoffeeInput {
  name: string;
  brand: string;
  flavors: string[];
}
