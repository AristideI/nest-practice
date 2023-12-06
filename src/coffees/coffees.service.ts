import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'aristide',
      brand: 'Buddy brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createdCoffeeDto: any) {
    this.coffees.push(createdCoffeeDto);
  }

  update(id: string, body) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      if (body.name) existingCoffee.name = body.name;
      if (body.flavors) existingCoffee.flavors = body.flavors;
      if (body.brand) existingCoffee.brand = body.brand;
      this.coffees[this.coffees.findIndex((elt) => elt.id === +id)] =
        existingCoffee;
      return existingCoffee;
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
