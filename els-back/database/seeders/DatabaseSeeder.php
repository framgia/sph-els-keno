<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CategorySeeder::class,
            QuizSeeder::class,
            WordSeeder::class,
            ChoiceSeeder::class,
            UserSeeder::class,
            AdminSeeder::class
        ]);
    }
}
