<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SportingArticle extends Model
{
    /** @use HasFactory<\Database\Factories\SportingArticleFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'launch_year',
        'image',
        'stock_quantity',
        'category_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    
}
