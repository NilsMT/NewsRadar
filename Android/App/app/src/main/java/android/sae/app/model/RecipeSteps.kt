package android.sae.app.model

import kotlinx.serialization.Serializable

@Serializable
data class RecipeSteps(
    val name: String,
    val steps: Array<RecipeStep>
)