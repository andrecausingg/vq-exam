<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('countries_tbl', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('url_flag');
            $table->bigInteger('population');
            $table->double('area');
            $table->text('description')->nullable();
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries_tbl');
    }
};
