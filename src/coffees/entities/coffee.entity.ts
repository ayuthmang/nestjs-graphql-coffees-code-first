import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Coffee {
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
