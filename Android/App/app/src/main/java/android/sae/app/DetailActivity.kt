package android.sae.app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.sae.app.model.Equipment
import android.sae.app.model.Ingredient
import android.sae.app.model.RecipeFull
import android.sae.app.adapters.RecipeStepAdapter
import android.util.Log
import android.view.View
import android.widget.HorizontalScrollView
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ListView
import android.widget.TextView
import com.google.android.flexbox.FlexboxLayout
import com.squareup.picasso.Picasso

class DetailActivity : AppCompatActivity() {

        lateinit var nomRecette : TextView
        lateinit var imageRecette : ImageView
        lateinit var prepRecette : TextView
        lateinit var prepImage: ImageView
        lateinit var cuissonRecette : TextView
        lateinit var cuissonImage: ImageView
        lateinit var tempsRecette : TextView
        lateinit var portionsRecette : TextView
        lateinit var typesRecette : TextView
        lateinit var cuisinesRecette : TextView
        lateinit var tagsRecette: FlexboxLayout
        lateinit var etapesRecette: ListView
        lateinit var allIngredientsScroll: HorizontalScrollView
        lateinit var allEquipmentsScroll: HorizontalScrollView


    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)

        nomRecette = findViewById(R.id.name_tv)
        imageRecette = findViewById(R.id.recipe_img)
        prepRecette = findViewById(R.id.prepa_tv)
        prepImage = findViewById(R.id.prepa_img)
        cuissonRecette = findViewById(R.id.cook_tv)
        cuissonImage = findViewById(R.id.cook_img)
        tempsRecette = findViewById(R.id.time_data)
        portionsRecette = findViewById(R.id.people_tv)
        typesRecette = findViewById(R.id.types_tv)
        cuisinesRecette = findViewById(R.id.cuisines_tv)
        tagsRecette = findViewById(R.id.tags_container)
        etapesRecette = findViewById(R.id.preparation_lv)
        allIngredientsScroll = findViewById(R.id.all_ingredients_scroll)
        allEquipmentsScroll = findViewById(R.id.all_equipments_scroll)

        val recette = intent.getParcelableExtra("recette", RecipeFull::class.java)

        if (recette != null){

            nomRecette.text = recette.title
            if (recette.dishTypes.isEmpty()) typesRecette.visibility = View.GONE else typesRecette.text = recette.dishTypes.joinToString()
            if (recette.dishTypes.isEmpty()) cuisinesRecette.visibility = View.GONE else cuisinesRecette.text = recette.cuisines.joinToString()

            Picasso.get().load(recette.image).into(imageRecette)

            val tags = getRecipeTags(recette)
            Log.v("tags", tags.toString())
            for (tag in tags) {
                val tagView = layoutInflater.inflate(R.layout.tag_element, tagsRecette, false)
                val texte = tagView.findViewById<TextView>(R.id.tagText)
                texte.text = tag
                tagsRecette.addView(tagView)
            }

            if (recette.preparationMinutes<0) {
                prepRecette.visibility = View.GONE
                prepImage.visibility = View.GONE
            }else{
                prepRecette.text = "${recette.preparationMinutes}'"
            }
            if (recette.cookingMinutes<0) {
                cuissonRecette.visibility = View.GONE
                cuissonImage.visibility = View.GONE
            }else{
                cuissonRecette.text = "${recette.cookingMinutes}'"
            }

            tempsRecette.text = "${recette.readyInMinutes}'"
            portionsRecette.text = "${recette.servings}"

            val etapes = KtorClient.getDetailedSteps(recette.id)

            mutableSetOf<Equipment>().also {
                etapes.forEach { etape ->
                    etape.equipments.forEach { equipment ->
                        it.add(equipment)

                    }
                }
            }.forEach {equipment ->
                val equipmentview = layoutInflater.inflate(R.layout.ingredient_equipment_element,null)
                Picasso.get().load(if (equipment.image.isEmpty()) null else equipment.image).placeholder(
                    R.drawable.ic_launcher_foreground
                ).into(equipmentview.findViewById<ImageView>(R.id.imageView))
                equipmentview.findViewById<TextView>(R.id.textView).text = if (equipment.name.isBlank()) "" else equipment.name

                allEquipmentsScroll.findViewById<LinearLayout>(R.id.all_equipments_list).addView(equipmentview)
            }

            mutableSetOf<Ingredient>().also {
                etapes.forEach { etape ->
                    etape.ingredients.forEach { ingredient ->
                        it.add(ingredient)

                    }
                }
            }.forEach {ingredient ->
                val ingredientview = layoutInflater.inflate(R.layout.ingredient_equipment_element,null)
                Picasso.get().load(if (ingredient.image.isEmpty()) null else ingredient.image).placeholder(
                    R.drawable.ic_launcher_foreground
                ).into(ingredientview.findViewById<ImageView>(R.id.imageView))
                ingredientview.findViewById<TextView>(R.id.textView).text = if (ingredient.name.isBlank()) "" else ingredient.name

                allIngredientsScroll.findViewById<LinearLayout>(R.id.all_ingredients_list).addView(ingredientview)
            }


            val stepAdapter = RecipeStepAdapter(this)
            etapesRecette.adapter = stepAdapter
            stepAdapter.addAll(etapes.toMutableList())

        }

    }

    fun getRecipeTags(recipe: RecipeFull): List<String> {
        val tags = mutableListOf<String>()
        val tagNames = arrayOf(
            "tag_cheap",
            "tag_dairyFree",
            "tag_glutenFree",
            "tag_ketogenic",
            "tag_lowFodmap",
            "tag_sustainable",
            "tag_vegan",
            "tag_vegetarian",
            "tag_veryHealthy",
            "tag_veryPopular",
            "tag_whole30"
        )

        for (tagName in tagNames) {
            val tag = resources.getString(resources.getIdentifier(tagName, "string", "android.sae.app"))
            when (tagName) {
                "tag_cheap" -> if (recipe.cheap) tags.add(tag)
                "tag_dairyFree" -> if (recipe.dairyFree) tags.add(tag)
                "tag_glutenFree" -> if (recipe.glutenFree) tags.add(tag)
                "tag_ketogenic" -> if (recipe.ketogenic) tags.add(tag)
                "tag_lowFodmap" -> if (recipe.lowFodmap) tags.add(tag)
                "tag_sustainable" -> if (recipe.sustainable) tags.add(tag)
                "tag_vegan" -> if (recipe.vegan) tags.add(tag)
                "tag_vegetarian" -> if (recipe.vegetarian) tags.add(tag)
                "tag_veryHealthy" -> if (recipe.veryHealthy) tags.add(tag)
                "tag_veryPopular" -> if (recipe.veryPopular) tags.add(tag)
                "tag_whole30" -> if (recipe.whole30) tags.add(tag)
            }
        }

        return tags
    }
}