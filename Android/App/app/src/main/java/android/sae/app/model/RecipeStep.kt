package android.sae.app.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class RecipeStep(
    val number: Int,
    val step: String,
    val ingredients: Array<Ingredient>,
    @SerialName("equipment") val equipments: Array<Equipment>
)