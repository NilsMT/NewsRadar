package android.sae.app

import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.EditText
import android.widget.ImageButton
import android.widget.ListView
import android.widget.SeekBar
import android.widget.SeekBar.OnSeekBarChangeListener
import android.widget.Spinner
import androidx.appcompat.app.AppCompatActivity
import java.util.Locale

class MainActivity : AppCompatActivity() {

    lateinit var button: ImageButton
    lateinit var editText: EditText
    lateinit var nombreSeekBar: SeekBar
    lateinit var nombreEditText: EditText
    lateinit var cuisine_sp : Spinner

    lateinit var langueButton: ImageButton
    lateinit var langueListView: ListView

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        button = findViewById(R.id.imageButton)
        editText = findViewById(R.id.recette_et)
        nombreSeekBar = findViewById(R.id.number_sb)
        nombreEditText = findViewById(R.id.number_et)
        cuisine_sp = findViewById(R.id.genre_sp)
        langueButton = findViewById(R.id.langueButton)
        langueListView = findViewById(R.id.langueListView)

        val cuisineSpinnerAdapter = ArrayAdapter.createFromResource(this,
            R.array.cuisines_array, android.R.layout.simple_spinner_item)
        cuisineSpinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        cuisine_sp.adapter = cuisineSpinnerAdapter

        var cuisines = resources.getStringArray(R.array.cuisines_array)
        var cuisine_selected = cuisines[0]
        cuisine_sp.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                cuisine_selected = cuisines[position]
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                cuisine_selected = cuisines[0]
            }
        }

        nombreEditText.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus){
                var nombre =
                    if (nombreEditText.text.toString().toInt() <= 0) 1
                    else if (nombreEditText.text.toString().toInt() > 100) 100
                    else nombreEditText.text.toString().toInt()

                nombreEditText.setText(nombre.toString())
                nombreSeekBar.setProgress(nombre)
            }
        }

        nombreSeekBar.setOnSeekBarChangeListener(object : OnSeekBarChangeListener{
            override fun onStartTrackingTouch(seekBar: SeekBar?) {}

            override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
                nombreEditText.setText(progress.toString())
            }

            override fun onStopTrackingTouch(seekBar: SeekBar?) {}
        })



        button.setOnClickListener {
            cuisine_selected = getTranslationCuisineFromFrench(cuisine_selected)
            var recipes = KtorClient.getResponse(editText.text.toString(), nombreEditText.text.toString().toInt(),cuisine_selected)
            var intentResult = Intent(this, ResultActivity::class.java)
            intentResult.putExtra("recipes",recipes)
            startActivity(intentResult)
        }


        val languages_availables = resources.getStringArray(R.array.languages)
        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, languages_availables)
        langueListView.adapter = adapter

        langueButton.setOnClickListener {
            toggleLanguageListViewVisibility()
        }

        langueListView.onItemClickListener = AdapterView.OnItemClickListener { _, _, position, _ ->
            Log.v("position","oui")
            val selectedLanguage = languages_availables[position]
            Log.v("langue choisi",selectedLanguage)
            setLocale(this,getLanguageCode(selectedLanguage))
            recreate() // Rafraîchit l'activité pour appliquer les changements de langue
            toggleLanguageListViewVisibility() // Cache la ListView après la sélection de la langue
        }


    }

    fun getLanguageCode(languageName: String): String {
        return when (languageName.lowercase()) {
            "français" -> "fr"
            "french" -> "fr"
            "anglais" -> "en"
            "english" -> "en"
            // Ajoutez d'autres correspondances ici
            else -> "en" // Retourne null pour les valeurs inconnues
        }
    }

    fun getTranslationCuisineFromFrench(frenchTranslation: String): String {
        val cuisines = mapOf(
            "Toutes" to "All",
            "Africaine" to "African",
            "Asiatique" to "Asian",
            "Américaine" to "American",
            "Britannique" to "British",
            "Cajun" to "Cajun",
            "Caribéenne" to "Caribbean",
            "Chinoise" to "Chinese",
            "Europe de l'Est" to "Eastern European",
            "Européenne" to "European",
            "Française" to "French",
            "Allemande" to "German",
            "Grecque" to "Greek",
            "Indienne" to "Indian",
            "Irlandaise" to "Irish",
            "Italienne" to "Italian",
            "Japonaise" to "Japanese",
            "Juive" to "Jewish",
            "Coréenne" to "Korean",
            "Amérique latine" to "Latin American",
            "Méditerranéenne" to "Mediterranean",
            "Mexicaine" to "Mexican",
            "Moyen-Orientale" to "Middle Eastern",
            "Nordique" to "Nordic",
            "Du Sud" to "Southern",
            "Espagnole" to "Spanish",
            "Thaïlandaise" to "Thai",
            "Vietnamienne" to "Vietnamese"
        )

        return cuisines[frenchTranslation] ?: frenchTranslation
    }

    private fun toggleLanguageListViewVisibility() {
        if (langueListView.visibility == View.VISIBLE) {
            langueListView.visibility = View.GONE
        } else {
            langueListView.visibility = View.VISIBLE
        }
    }

    fun setLocale(context: Context, language: String) {
        val locale = Locale(language)
        Locale.setDefault(locale)
        val config = Configuration(context.resources.configuration)
        config.setLocale(locale)
        Log.v("changement",config.locales.toString())
        context.resources.updateConfiguration(config, context.resources.displayMetrics)
    }

}