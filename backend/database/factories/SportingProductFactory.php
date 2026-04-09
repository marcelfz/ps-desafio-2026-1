<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SportingProduct>
 */
class SportingProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'         => $this->faker->words(3, true),
            'brand'        => $this->faker->randomElement(['Nike', 'Adidas', 'Puma']),
            'price'        => $this->faker->randomFloat(2, 50, 300),
            'launch_year' => $this->faker->numberBetween(2020, 2025),
            'image'        => '/assets/images/Imagem.png',
            'category_id'  => $this->faker->randomElement(Category::pluck('id')->toArray()),
            'stock_quantity'     => $this->faker->numberBetween(1, 20),
        ];
    }
}
