<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSportingArticleRequest extends FormRequest
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
            'name' => ['required', 'min:3', 'max:80'],
            'brand' => ['required', 'min:3', 'max:80'],
            'price' => ['required', 'numeric', 'min:0'],
            'launch_year' => ['required', 'integer', 'min:2000', 'max:' . date('Y')],
            'image' => ['file'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'category_id' => ['required']
        ];
    }
}
