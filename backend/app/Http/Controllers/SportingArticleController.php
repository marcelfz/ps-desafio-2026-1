<?php

namespace App\Http\Controllers;

use App\Models\SportingArticle;
use App\Http\Requests\StoreSportingArticleRequest;
use App\Http\Requests\UpdateSportingArticleRequest;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class SportingArticleController extends Controller
{
    
    protected $sportingArticle;

    public function __construct(SportingArticle $sportingArticle)
    {
        $this->sportingArticle = $sportingArticle;
    }

    public function index(): JsonResponse
    {
        $sportingArticles = $this->sportingArticle->with('category')->get();
        return response()->json($sportingArticles, Response::HTTP_OK);
    }

    public function store(StoreSportingArticleRequest $request): JsonResponse
    {
        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store('sportingArticles', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $sportingArticle = $this->sportingArticle->create($data);
        $id = $sportingArticle->id;
        $sportingArticle_Category = $this->sportingArticle->with('category')->findOrFail($id);
        return response()->json($sportingArticle_Category, Response::HTTP_CREATED);
    }

    public function show($id): JsonResponse
    {
        $sportingArticle = $this->sportingArticle->with('category')->findOrFail($id);
        return response()->json($sportingArticle, Response::HTTP_OK);
    }

    public function update(UpdateSportingArticleRequest $request, $id): JsonResponse
    {
        $sportingArticle = $this->sportingArticle->with('category')->findOrFail($id);

        $data = $request->validated();

        if($request->hasFile('image')){
            try{
                $image_name = explode('sportingArticles/', $sportingArticle['image']);
                Storage::disk('public')->delete('sportingArticles/'.$image_name[1]);
            }catch(Throwable){
            } finally{
                $path = $request->file('image')->store('sportingArticles', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }
        $sportingArticle->update($data);
        return response()->json($sportingArticle, Response::HTTP_OK);
    }

    public function destroy($id): JsonResponse
    {
        $sportingArticle = $this->sportingArticle->findOrFail($id);

        if ($sportingArticle->image) {
            $oldPath = explode('storage/', $sportingArticle->image);
            Storage::disk('public')->delete($oldPath[1] ?? '');
        }

        $sportingArticle->delete();

        return response()->json(['message' => 'Artigo esportivo deletado com sucesso'], Response::HTTP_OK);
    }
}
