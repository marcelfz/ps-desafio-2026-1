<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SportingProduct;
use App\Models\Category;

class SportingProductSeeder extends Seeder
{
    protected array $products = [
        [
            'name'         => 'Chuteira Jordan',
            'brand'        => 'Nike',
            'price'        => 1399.90,
            'launch_year' => 2025,
            'image'        => '/assets/images/JordanTiempoMaestro.jpg',
            'category'     => 'Futebol',
            'stock_quantity'     => 2,
        ],
        [
            'name'         => 'Tênis Anthony Edwards',
            'brand'        => 'Adidas',
            'price'        => 899.90,
            'launch_year' => 2024,
            'image'        => '/assets/images/AnthonyEdwards2.avif',
            'category'     => 'Basquete',
            'stock_quantity'     => 5,
        ],
        [
            'name'         => 'Tênis Velocity Nitro',
            'brand'        => 'Puma',
            'price'        => 129.90,
            'launch_year' => 2025,
            'image'        => '/assets/images/VelocityNitro.avif',
            'category'     => 'Corrida',
            'stock_quantity'     => 10,
        ],
        [
            'name'         => 'Raquete Wilson Pro',
            'brand'        => 'Wilson',
            'price'        => 990.90,
            'launch_year' => 2024,
            'image'        => '/assets/images/WilsonPro.webp',
            'category'     => 'Tênis',
            'stock_quantity'     => 3,
        ],
        [
            'name'         => 'Tênis Vomero 18',
            'brand'        => 'Nike',
            'price'        => 699.90,
            'launch_year' => 2023,
            'image'        => '/assets/images/NikeVomero18.avif',
            'category'     => 'Corrida',
            'stock_quantity'     => 9,
        ],
        [
            'name'         => 'Tênis Adizero Pro',
            'brand'        => 'Adidas',
            'price'        => 799.90,
            'launch_year' => 2026,
            'image'        => '/assets/images/AdizeroPro3.avif',
            'category'     => 'Corrida',
            'stock_quantity'     => 7,
        ],
        [
            'name'         => 'Tênis MB 0.5 Crowd',
            'brand'        => 'Puma',
            'price'        => 859.90,
            'launch_year' => 2026,
            'image'        => '/assets/images/MB05CrowdSurf.avif',
            'category'     => 'Basquete',
            'stock_quantity'     => 3,
        ],
        [
            'name'         => 'Luva Puma Ultra',
            'brand'        => 'Puma',
            'price'        => 229.90,
            'launch_year' => 2024,
            'image'        => '/assets/images/LuvaPumaUltraGrip.avif',
            'category'     => 'Futebol',
            'stock_quantity'     => 4,
        ],
        [
            'name'         => 'Regata Lakers',
            'brand'        => 'Nike',
            'price'        => 329.90,
            'launch_year' => 2025,
            'image'        => '/assets/images/RegataLakers.avif',
            'category'     => 'Basquete',
            'stock_quantity'     => 3,
        ],
        [
            'name'         => 'Raquete Babolat',
            'brand'        => 'Babolat',
            'price'        => 990.90,
            'launch_year' => 2026,
            'image'        => '/assets/images/BabolatPureDrive.jpg',
            'category'     => 'Tênis',
            'stock_quantity'     => 1,
        ],
        [
            'name'         => 'Bola da Puma Basquete',
            'brand'        => 'Puma',
            'price'        => 199.90,
            'launch_year' => 2023,
            'image'        => '/assets/images/BolaPumaBasqueteStandard.avif',
            'category'     => 'Basquete',
            'stock_quantity'     => 10,
        ],
        [
            'name'         => 'Tênis G.T nitro',
            'brand'        => 'Nike',
            'price'        => 599.90,
            'launch_year' => 2022,
            'image'        => '/assets/images/GTNitro.avif',
            'category'     => 'Basquete',
            'stock_quantity'     => 4,
        ],

    ];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->products as $product) {
            $category = Category::where('name', $product['category'])->firstOrFail();
 
            SportingProduct::firstOrCreate(
                ['name' => $product['name']],
                [
                    'brand'        => $product['brand'],
                    'price'        => $product['price'],
                    'launch_year' => $product['launch_year'],
                    'image'        => $product['image'],
                    'category_id'  => $category->id,
                    'stock_quantity'     => $product['stock_quantity'],
                ]
            );
    }
}
}