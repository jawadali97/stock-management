import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) { }

  @Post()
  createMeal(@Body() createMealDto: any) {
    return this.mealsService.createMeal(createMealDto);
  }

  @Delete(':id')
  deleteMeal(@Param('id') id: string) {
    return this.mealsService.deleteMeal(id);
  }

  @Get('sell/:id')
  sellMeal(@Param('id') id: string) {
    return this.mealsService.sellMeal(id);
  }

  @Get()
  getAllMeals() {
    return this.mealsService.getAllMeals();
  }
}