<?php

namespace App\Http\Controllers;

use App\Models\SportingProduct;
use App\Http\Requests\StoreSportingProductRequest;
use App\Http\Requests\UpdateSportingProductRequest;
use Illuminate\Support\Facades\Storage;
use Nette\Utils\Json;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class SportingProductController extends Controller
{
    
    protected $SportingProduct;

    public function __construct(SportingProduct $SportingProduct)
    {
        $this->SportingProduct = $SportingProduct;
    }

    public function index(): JsonResponse
    {
        $SportingProducts = $this->SportingProduct->with('category')->get();
        return response()->json($SportingProducts, Response::HTTP_OK);
    }

    public function store(StoreSportingProductRequest $request): JsonResponse
    {
        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store('SportingProducts', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $SportingProduct = $this->SportingProduct->create($data);
        $id = $SportingProduct->id;
        $SportingProduct_Category = $this->SportingProduct->with('category')->findOrFail($id);
        return response()->json($SportingProduct_Category, Response::HTTP_CREATED);
    }

    public function show($id): JsonResponse
    {
        $SportingProduct = $this->SportingProduct->with('category')->findOrFail($id);
        return response()->json($SportingProduct, Response::HTTP_OK);
    }

    public function update(UpdateSportingProductRequest $request, $id): JsonResponse
    {
        $SportingProduct = $this->SportingProduct->with('category')->findOrFail($id);

        $data = $request->validated();

        if($request->hasFile('image')){
            try{
                $image_name = explode('SportingProducts/', $SportingProduct['image']);
                Storage::disk('public')->delete('SportingProducts/'.$image_name[1]);
            }catch(Throwable){
            } finally{
                $path = $request->file('image')->store('SportingProducts', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }
        $SportingProduct->update($data);
        return response()->json($SportingProduct, Response::HTTP_OK);
    }

    public function destroy($id): JsonResponse
    {
        $SportingProduct = $this->SportingProduct->findOrFail($id);

        if ($SportingProduct->image) {
            $oldPath = explode('storage/', $SportingProduct->image);
            Storage::disk('public')->delete($oldPath[1] ?? '');
        }

        $SportingProduct->delete();

        return response()->json(['message' => 'Artigo esportivo deletado com sucesso'], Response::HTTP_OK);
    }

    public function buy($id): JsonResponse
    {
        $SportingProduct = $this->SportingProduct->findOrFail($id);

        if($SportingProduct->stock_quantity <= 0){
            return response()->json(['message' => 'Esgotado'], Response::HTTP_BAD_REQUEST);
        }

        $SportingProduct->decrement('stock_quantity');
        return response()->json(['message' => 'Produto comprado com sucesso'], Response::HTTP_OK);
    }
}