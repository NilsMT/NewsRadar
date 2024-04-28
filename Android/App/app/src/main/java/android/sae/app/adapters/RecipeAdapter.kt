package android.sae.app.adapters

import android.content.Context
import android.sae.app.R
import android.sae.app.model.Recipe
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ImageView
import android.widget.TextView
import com.squareup.picasso.Picasso

class RecipeAdapter(context: Context) :  ArrayAdapter<Recipe>(context, android.R.layout.simple_list_item_1) {
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val row : View
        val recipe = getItem(position)
        val inflater = LayoutInflater.from(context)

        row = inflater.inflate(R.layout.recipe_list_row,parent,false)

        if (recipe != null){
            row.findViewById<TextView>(R.id.row_title).text = recipe.title
            Picasso.get().load(recipe.image).into(row.findViewById<ImageView>(R.id.row_image))
        }
        return row
    }
}