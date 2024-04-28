package android.sae.app

import android.content.Intent
import android.os.Bundle
import android.sae.app.adapters.RecipeAdapter
import android.sae.app.model.Recipes
import android.widget.Button
import android.widget.ListView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ResultActivity : AppCompatActivity() {

    lateinit var listView: ListView
    lateinit var nbrAffiches : TextView
    lateinit var nbrTrouves : TextView
    lateinit var backButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)

        listView = findViewById(R.id.result_lv)
        nbrAffiches = findViewById(R.id.printed_number)
        nbrTrouves = findViewById(R.id.found_number)
        backButton = findViewById(R.id.back_button)

        val recipes = intent.getParcelableExtra("recipes", Recipes::class.java)
        val recipeAdapter = RecipeAdapter(this)
        listView.adapter = recipeAdapter
        recipeAdapter.addAll(recipes!!.recipes)

        nbrAffiches.text = recipes.recipes.size.toString()
        nbrTrouves.text = recipes.nbResults.toString()

        listView.setOnItemClickListener { adapterView, view, i, l ->
            var intentDetail = Intent(this, DetailActivity::class.java)
            var recipe = KtorClient.getDetailedRecipe(recipes.recipes[i].id)
            intentDetail.putExtra("recette",recipe)
            startActivity(intentDetail)
        }
        backButton.setOnClickListener {
            finish()
        }
    }
}