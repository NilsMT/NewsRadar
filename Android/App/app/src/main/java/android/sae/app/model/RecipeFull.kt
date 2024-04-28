package android.sae.app.model

import android.os.Parcelable
import android.widget.ArrayAdapter
import kotlinx.parcelize.Parcelize
import kotlinx.serialization.Serializable

@Parcelize
@Serializable
data class RecipeFull(
    val id: Int,
    val image: String,
    val imageType: String,
    val title: String,
    val preparationMinutes: Int,
    val cookingMinutes: Int,
    val readyInMinutes: Int,
    val servings: Int,
    val cuisines: Array<String>,
    val dishTypes: Array<String>,

    val cheap : Boolean = false,
    val dairyFree : Boolean = false,
    val glutenFree: Boolean = false,
    val ketogenic: Boolean = false,
    val lowFodmap: Boolean = false,
    val sustainable: Boolean = false,
    val vegan: Boolean = false,
    val vegetarian: Boolean = false,
    val veryHealthy: Boolean = false,
    val veryPopular: Boolean = false,
    val whole30: Boolean = false,
) : Parcelable
