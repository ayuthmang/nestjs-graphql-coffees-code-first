import { ObjectType } from '@nestjs/graphql';
import { Drink } from 'src/common/interfaces/drink.interface';

@ObjectType({
  implements: () => Drink, // ( or an array of interface such as: [Drink] )
})
export class Tea implements Drink {
  name: string;
}
