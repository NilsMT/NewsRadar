package android.sae.app.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize
import kotlinx.serialization.Serializable

@Parcelize
@Serializable
data class Recipe(
    val id: Int,
    val image: String,
    val imageType: String,
    val title: String,
) : Parcelable