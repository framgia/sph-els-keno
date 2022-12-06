<?php

namespace App\Http\Controllers\User;

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

    public function show(Request $request,Category $category)
    {
        return $category->load('quizzes');
    }
}
