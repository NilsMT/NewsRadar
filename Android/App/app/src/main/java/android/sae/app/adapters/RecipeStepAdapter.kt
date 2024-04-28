package android.sae.app.adapters

import android.content.Context
import android.sae.app.R
import android.sae.app.model.RecipeStep
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ImageView
import android.widget.TextView
import com.google.android.flexbox.FlexboxLayout
import com.squareup.picasso.Picasso

class RecipeStepAdapter(context: Context) :  ArrayAdapter<RecipeStep>(context, android.R.layout.simple_list_item_1) {
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val row : View
        val step = getItem(position)
        val inflater = LayoutInflater.from(context)

        row = inflater.inflate(R.layout.recipe_step_list_row,parent,false)

        if (step != null){

            val numero = row.findViewById<TextView>(R.id.step_number)
            val instruction = row.findViewById<TextView>(R.id.step_order)
            val equipmentsView = row.findViewById<FlexboxLayout>(R.id.equipments_container)
            val equipments = step.equipments
            val ingredientsView = row.findViewById<FlexboxLayout>(R.id.ingredients_container)
            val ingredients = step.ingredients


            numero.text = step.number.toString()

            instruction.text = step.step

            equipments.forEach { equipment ->
                Log.v("equipment", equipment.toString())
                val equipmentview = inflater.inflate(R.layout.ingredient_equipment_element,null)
                Picasso.get().load(if (equipment.image.isEmpty()) null else equipment.image).placeholder(
                    R.drawable.ic_launcher_foreground
                ).into(equipmentview.findViewById<ImageView>(R.id.imageView))
                equipmentview.findViewById<TextView>(R.id.textView).text = if (equipment.name.isBlank()) "" else equipment.name

                equipmentsView.addView(equipmentview)
            }
/*            equipments.forEach {equipment ->
                equipmentsView.addView(LinearLayout(context).also {
                    it.orientation = LinearLayout.VERTICAL

                    it.addView(ImageView(context).also {imageview ->
                        imageview.adjustViewBounds = true
                        imageview.maxHeight=120
                        imageview.maxWidth=120

                        Picasso.get().load(if (equipment.image.isEmpty()) null else equipment.image).placeholder(R.drawable.ic_launcher_foreground).into(imageview)
                    })

                    it.addView(TextView(context).also { textView ->
                        textView.text = equipment.name
                    })
                })

            }*/

            ingredients.forEach { ingredient ->
                val ingredientview = inflater.inflate(R.layout.ingredient_equipment_element,null)
                Picasso.get().load(if (ingredient.image.isEmpty()) null else ingredient.image).placeholder(
                    R.drawable.ic_launcher_foreground
                ).into(ingredientview.findViewById<ImageView>(R.id.imageView))
                ingredientview.findViewById<TextView>(R.id.textView).text = if (ingredient.name.isBlank()) "" else ingredient.name

                ingredientsView.addView(ingredientview)
            }
/*            ingredients.forEach {ingredient ->
                ingredientsView.addView(LinearLayout(context).also {
                    it.orientation = LinearLayout.VERTICAL

                    it.addView(ImageView(context).also {imageview ->
                        imageview.adjustViewBounds = true
                        imageview.maxHeight=120
                        imageview.maxWidth=120

                        Picasso.get().load(if (ingredient.image.isEmpty()) null else ingredient.image).placeholder(R.drawable.ic_launcher_foreground).into(imageview)

                    })

                    it.addView(TextView(context).also { textView ->
                        textView.text = ingredient.name
                    })
                })
            }*/

        }
        return row
    }
}