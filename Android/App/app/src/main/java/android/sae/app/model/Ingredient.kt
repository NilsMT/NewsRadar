package android.sae.app.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class Ingredient(
    val id: Int,
    val name: String,
    @SerialName("localizedName") val localizedName: String,
    val image: String
)
