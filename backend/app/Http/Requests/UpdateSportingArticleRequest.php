<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSportingArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'min:3', 'max:80'],
            'brand' => ['sometimes', 'min:3', 'max:80'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'launch_year' => ['sometimes', 'integer', 'min:2000', 'max:' . date('Y')],
            'image' => ['file'],
            'stock_quantity' => ['sometimes', 'integer', 'min:0'],
            'category_id' => ['sometimes']
        ];
    }
}
