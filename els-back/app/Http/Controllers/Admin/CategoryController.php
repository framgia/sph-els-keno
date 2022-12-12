<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->query('per_page') ?? 10;

        return Category::paginate($per_page);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        return Category::create($request->toArray());
    }

    public function update(Request $request,Category $category)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        return $category->update($request->toArray());
    }

    public function show(Request $request,Category $category)
    {
        return $category->load('quizzes');
    }

    public function delete(Category $category)
    {
        if($category->quizzes()->exists())
            return response()->json(['message' => 'Category has quizzes.'], 422); 


        return $category->delete();
    }
}
