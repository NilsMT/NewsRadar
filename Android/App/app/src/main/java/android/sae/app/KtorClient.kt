package android.sae.app

import android.sae.app.model.RecipeFull
import android.sae.app.model.RecipeStep
import android.sae.app.model.RecipeSteps
import android.sae.app.model.Recipes
import android.util.Log
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.HttpTimeout
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logger
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.plugins.observer.ResponseObserver
import io.ktor.client.request.get
import io.ktor.serialization.kotlinx.json.json
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json

class KtorClient(){
    companion object{
        private val apikey1 = "12075e275b1e446da006a5806f0863f6"
        private val apikey2 = "25a0535bcf634603be826df885298926"
        private val apikey3 = "c412a6b07a844b6ebeb0a641051750ed"
        private val apiKey = apikey3

        private val kTorClient = HttpClient(OkHttp) {
            install(HttpTimeout) {
                requestTimeoutMillis = 15000L
                connectTimeoutMillis = 15000L
                socketTimeoutMillis = 15000L
            }
            install(Logging) { /* debug mode */
                logger = object : Logger {
                    override fun log(message: String) {
                        Log.v("Logger Ktor =>", message)
                    }
                }
                level = LogLevel.ALL
            }
            install(ResponseObserver) { /* debug mode */
                onResponse { response ->
                    Log.d("HTTP status:", "${response.status.value}")
                }
            }
            install(ContentNegotiation) {
                json( Json {
                    ignoreUnknownKeys = true
                    prettyPrint = true
                })
            }
        }

        fun getResponse(request : String, number_results : Int, cuisine : String) : Recipes {
            val url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=$apiKey&query=$request&number=$number_results&cuisine=${if (cuisine!="All") cuisine else ""}"
            lateinit var result : Recipes
            runBlocking(Dispatchers.IO) {
                val response = kTorClient.get(url)
                result = response.body<Recipes>()

            }
            return result
        }

        fun getDetailedRecipe(id: Int) : RecipeFull {
            val url = "https://api.spoonacular.com/recipes/$id/information?apiKey=$apiKey"
            lateinit var result : RecipeFull
            runBlocking(Dispatchers.IO) {
                val response = kTorClient.get(url)
                result = response.body<RecipeFull>()

            }
            return result
        }

        fun getDetailedSteps(id: Int) : Array<RecipeStep>{
            val url = "https://api.spoonacular.com/recipes/$id/analyzedInstructions?apiKey=$apiKey"
            lateinit var result : Array<RecipeStep>
            runBlocking(Dispatchers.IO) {
                val response = kTorClient.get(url)
                result = response.body<Array<RecipeSteps>>()[0].steps

            }
            return result
        }
    }
}
