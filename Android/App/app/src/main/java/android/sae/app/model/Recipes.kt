package android.sae.app.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Parcelize
@Serializable
data class Recipes(
    @SerialName("results") var recipes: List<Recipe>,
    @SerialName("totalResults") var nbResults : Int
) : Parcelable