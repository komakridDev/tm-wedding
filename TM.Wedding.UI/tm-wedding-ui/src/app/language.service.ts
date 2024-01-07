import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LanguageCofig {
  properties: Map<string, string>;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private englishConfig: LanguageCofig = {
    properties: new Map<string, string>()
  };

  private greekConfig: LanguageCofig = {
    properties: new Map<string, string>()
  };

  defaultLanuageConfig: LanguageCofig = this.greekConfig;
  private sessionCode = 'lang-code';
  private languageCodeInSubject = new BehaviorSubject<string>('el');
  private languageConfigInSubject = new BehaviorSubject<LanguageCofig>(this.defaultLanuageConfig);

  languageCode$ = this.languageCodeInSubject.asObservable();
  languageConfig$ = this.languageConfigInSubject.asObservable();

  setLanguageCode(newValue: string) {
    this.languageCodeInSubject.next(newValue);
    sessionStorage.setItem(this.sessionCode, newValue);

    if (newValue === 'en') {
      this.setLanguageConfig(this.englishConfig);
      
      var styleVariables = document.getElementById("css_variables");
      if(styleVariables){
        styleVariables.innerHTML = `
        :root {
        --ff-main: 'Poppins', sans-serif;
        --ff-secondary: 'Raleway', sans-serif;
        --white-color: #dec89d;
        --dark-color: black;
        }
        `; 
      }
      
    } else {
      this.setLanguageConfig(this.greekConfig);

      var styleVariables = document.getElementById("css_variables");
      if(styleVariables){
        styleVariables.innerHTML = `
        :root {
        --ff-main: 'Manrope', sans-serif;
        --ff-secondary: 'Manrope', sans-serif;
        --white-color: #dec89d;
        --dark-color: black;
        }
        `; 
      }
    }
  }

  setLanguageConfig(newValue: LanguageCofig) {
    this.languageConfigInSubject.next(newValue);
  }

  refreshLanguageCodeInSession() {
    console.log("refresh session language");
    const sessionVariable = sessionStorage.getItem(this.sessionCode);

    if (sessionVariable) {
      this.setLanguageCode(sessionVariable);
    }
  }

  constructor() {
    //Header 
    this.greekConfig.properties = new Map<string, string>();
    this.greekConfig.properties.set("header_home", "Αρχική");
    this.greekConfig.properties.set("header_wedding", "Ο Γάμος");
    this.greekConfig.properties.set("header_about", "Κρήτη");
    this.greekConfig.properties.set("header_info", "Πληροφορίες");
    this.greekConfig.properties.set("header_rsvp", "RSVP");
    this.greekConfig.properties.set("header_gift", "Λίστα Γάμου");
    this.greekConfig.properties.set("header_contact", "Επικοινωνία");
    //Counter
    this.greekConfig.properties.set("home_ctr_label", "Αντίστροφη Μέτρηση - Άυγουστος 24, 2024");
    this.greekConfig.properties.set("home_ctr_days", "Ημέρες");
    this.greekConfig.properties.set("home_ctr_hours", "Ώρες");
    this.greekConfig.properties.set("home_ctr_mins", "Λεπτά");
    this.greekConfig.properties.set("home_ctr_sec", "Δεύτερα");
    //CoupleInfo
    this.greekConfig.properties.set("home_cpl_header", "ΣΑΣ ΚΑΛΟΥΜΕ ΝΑ ΖΗΣΕΤΕ ΜΑΖΙ ΜΑΣ ΤΗΝ ΠΙΟ ΕΥΤYΧΙΣΜΕΝΗ ΜΕΡΑ ΤΗΣ ΖΩΗΣ ΜΑΣ");
    this.greekConfig.properties.set("home_cpl_subheader", "Λίγα λόγια για μας");
    this.greekConfig.properties.set("home_cpl_groom", "Είσαι ο καλύτερος μου φίλος, μέντορας, συμπαίκτης, έμπνευση και η μεγαλύτερη μου πρόκληση. Αλλά το σημαντικότερο είσαι η αγαπή της ζωής μου και με κάνεις πιο ευτιχισμένη από τι θα μπορούσα να φανταστώ ότι είναι δυνατό.");
    this.greekConfig.properties.set("home_cpl_pride", "Αγαπώ την ομορφιά σου, την εφυιά σου, την ευγενική ψυχή σου και τον τρόπο που ξέρεις πάντα να με κάνεις να νίωθω μοναδικός. Πέρα απο τους όρκους αιώνιας αγαπής που θα δώσω την ημέρα του γάμους, ορκίζομαι ότι θα είμαι η πιο ευτιχισμένη απο όλο τον κόσμο.");
    //HomeDetailsInfo
    this.greekConfig.properties.set("home_info_header_cer", "ΤΕΛΕΤΗ");
    this.greekConfig.properties.set("home_info_subheader_cer", "Σκεπαστή Αρένα");
    this.greekConfig.properties.set("home_info_loc1_cer", "Σκεπαστή | Κρήτη");
    this.greekConfig.properties.set("home_info_loc2_cer", "ΕΟ Ρεθύμνου Ηρακλείου, Σκεπαστή");
    this.greekConfig.properties.set("home_info_header_par", "ΔΕΞΙΩΣΗ");
    this.greekConfig.properties.set("home_info_subheader_par", "Σκεπαστή Αρένα");
    this.greekConfig.properties.set("home_info_loc1_par", "Σκεπαστή | Κρήτη");
    this.greekConfig.properties.set("home_info_loc2_par", "ΕΟ Ρεθύμνου Ηρακλείου, Σκεπαστή");
    this.greekConfig.properties.set("home_info_btn_map", "Δείτε στο Χάρτη");

    //RSVP
    this.greekConfig.properties.set("rsvp_invite_header", "Θα σας παρακαλούσαμε να μας απαντήσετε ως τις 1 Ιουλίου για το αν θα παρευρεθείτε!");
    this.greekConfig.properties.set("rsvp_pos_answer", "Θα παρευρεθώ");
    this.greekConfig.properties.set("rsvp_neg_answer", "Δεν θα μπορέσω");
    this.greekConfig.properties.set("rsvp_main_option_a", "στο γάμο/γλέντι");
    this.greekConfig.properties.set("rsvp_main_option_b", "να παρευρεθώ");
    this.greekConfig.properties.set("rsvp_pos_option_a", "Θα παρευρεθώ στην τελετή");
    this.greekConfig.properties.set("rsvp_pos_option_b", "Θα παρευρεθώ στο γλέντι");
    this.greekConfig.properties.set("rsvp_contact_header", "Προσωπικές Πληροφορίες");
    this.greekConfig.properties.set("rsvp_firstname", "Παρακαλώ εισάγετε το όνομά σας");
    this.greekConfig.properties.set("rsvp_lastname", "Παρακαλώ εισάγετε το επιθετό σας");
    this.greekConfig.properties.set("rsvp_phone", "Παρακαλώ εισάγετε το τηλεφωνό σας");
    this.greekConfig.properties.set("rsvp_email", "Παρακαλώ εισάγετε το email σας");
    this.greekConfig.properties.set("rsvp_subheader_people", "Παρευρισκόμενοι");
    this.greekConfig.properties.set("rsvp_people_count", "Αριθμός ατόμων");
    this.greekConfig.properties.set("rsvp_extra_attendee", "Παρακαλώ εισάγετε ονοματεπώνυμο");
    this.greekConfig.properties.set("rsvp_comments", "Επιπρόσθετα σχόλια");
    this.greekConfig.properties.set("rsvp_submit", "Υποβολή");
    this.greekConfig.properties.set("rsvp_submitting", "Παρακαλώ περιμένετε...");

    //Contact Page
    this.greekConfig.properties.set("contact_header", "Συμπληρώστε την παρακάτω φόρμα με την ερώτησή σας, και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατόν");
    this.greekConfig.properties.set("contact_firstname", "Παρακαλώ εισάγετε το όνομά σας");
    this.greekConfig.properties.set("contact_lastname", "Παρακαλώ εισάγετε το επίθετό σας");
    this.greekConfig.properties.set("contact_phone", "Παρακαλώ εισάγετε το τηλεφωνό σας");
    this.greekConfig.properties.set("contact_email", "Παρακαλώ εισάγετε το email σας");
    this.greekConfig.properties.set("contact_comments", "Επιπρόσθετα σχόλια");
    this.greekConfig.properties.set("contact_submit", "Υποβολή");
    this.greekConfig.properties.set("contact_submitting", "Παρακαλώ περιμένετε...");
    this.greekConfig.properties.set("contact_callus", "H΄ επικοινωνήστε μαζί μας στο:");
    this.greekConfig.properties.set("contact_callus1", "Θοδωρής");
    this.greekConfig.properties.set("contact_callus2", "Μαριλένα");

    //Info Page
    this.greekConfig.properties.set("info_flight1_header", "Αθήνα (ATH) Ηράκλειο (HER) πτήσεις");
    this.greekConfig.properties.set("info_flight2_header", "Θεσσαλονίκη (SKG) Ηράκλειο (HER) πτήσεις");
    this.greekConfig.properties.set("info_flight_number", "Εβδομαδιαίες πτήσεις");
    this.greekConfig.properties.set("info_flight_duration", "Διάρκεια Μ.Ο.");
    this.greekConfig.properties.set("info_flight_cost", "Φθηνότερη Τιμή");
    this.greekConfig.properties.set("info_flight_explore_btn", "Δείτε δρομολόγια");
    this.greekConfig.properties.set("info_ferry_header", "Πειραιάς προς Ηράκλειο ακτοπλοϊκά");
    this.greekConfig.properties.set("info_ferry_number", "Εβδομαδιαία πλόια");
    this.greekConfig.properties.set("info_ferry_duration", "Διάρκεια Μ.Ο.");
    this.greekConfig.properties.set("info_ferry_cost", "Φθηνότερη Τιμή");
    this.greekConfig.properties.set("info_ferry_explore_btn", "Δείτε δρομολόγια");
    this.greekConfig.properties.set("info_stay_header", "Που να μείνετε...");
    this.greekConfig.properties.set("info_stay_subheader", "Βρείτε το κατάλληλο μέρος για να απολάυσετε τη διαμονή σας");
    this.greekConfig.properties.set("info_stay_recommendations", "Οι προτάσεις μας με βάση την απόσταση απο την τοποθεσία του γάμου:");
    this.greekConfig.properties.set("info_stay_place1", "Σκεπαστή");
    this.greekConfig.properties.set("info_stay_place2", "Πέραμα");
    this.greekConfig.properties.set("info_stay_place3", "Μελιδόνι");
    this.greekConfig.properties.set("info_stay_place4", "Ρούμελη");
    this.greekConfig.properties.set("info_stay_place5", "Χουμέρι");
    this.greekConfig.properties.set("info_stay_place6", "Αγγελιανά");
    this.greekConfig.properties.set("info_stay_place7", "Σκαλέτα");
    this.greekConfig.properties.set("info_stay_place8", "Ρέθυμνο");
    this.greekConfig.properties.set("info_stay_place9", "Πάνορμο");
    this.greekConfig.properties.set("info_stay_place10", "Μπαλί");
    this.greekConfig.properties.set("info_stay_explore_more", "ΔΕΙΤΕ ΠΕΡΙΣΣΟΤΕΡΑ");
    this.greekConfig.properties.set("info_stay_additional", "Μπορείτε επίσης να ταξιδέψετε ακτοπλοϊκά ή αεροπορικά απο Αθήνα, Πειραιά και Θεσσαλονική προς Χανιά, αλλά προτείνουμε το Ηράκλειο, καθώς ειναι πιο κοντά στην τοποθεσία του γάμου.");
    this.greekConfig.properties.set("info_food_header", "Τι να δοκιμάσετε...");
    this.greekConfig.properties.set("info_visit_header", "Καφε & Ποτό...");
    this.greekConfig.properties.set("info_beach_header", "Κοντινές Παραλίες...");
    this.greekConfig.properties.set("info_stay_useful_phones", "Χρήσιμα Τηλέφωνα");
    this.greekConfig.properties.set("info_stay_useful_phones1", "Κέντρο Υγείας Περάματος");
    this.greekConfig.properties.set("info_stay_useful_phones2", "Κέντρο Υγείας Ανωγείων");
    this.greekConfig.properties.set("info_stay_useful_phones3", "Γενικό Νοσοκομείο Ρεθύμνου");
    this.greekConfig.properties.set("info_stay_useful_phones4", "Α.Τ. Περάματος");
    this.greekConfig.properties.set("info_stay_useful_phones5", "Τροχαία Ρεθύμνου");
    this.greekConfig.properties.set("info_stay_useful_phones6", "Πυροσβεστική Περάματος");
    this.greekConfig.properties.set("info_stay_useful_phones7", "Πυροσβεστική Ρεθύμνου");
    this.greekConfig.properties.set("info_stay_useful_phones_btn", "Πατήστε παραπάνω για κλήση");

    //About Page
    this.greekConfig.properties.set("about_header", "Ο προορισμός που τα έχει όλα!");
    this.greekConfig.properties.set("about_subheader", "Σας προτείνουμε να συνδυάσετε τον γάμο μας, με τις καλοκαιρινές σας διακοπές.");
    this.greekConfig.properties.set("about_top_paragraph", `Η Κρήτη, το μεγαλύτερο νησί της Ελλάδας, είναι ένας τόπος γοητευτικός, που προσφέρει στον υπέρτατο βαθμό όσα μπορείτε να ονειρευτείτε. Λόγω της στρατηγικής της θέσης, υπήρξε σταυροδρόμι λαών και πολιτισμών, στόχος κατακτητών και κομβικό πέρασμα για Μινωίτες, Μυκηναίους, Οθωμανούς. Άραβες και Ενετούς, που άφησαν πλούσια πολιτιστική παρακαταθήκη στο νησί.
    Παραλίες με κρυστάλλινα διαυγή νερά, βουνά κακοτράχαλα αλλά μεγαλοπρεπή, σπουδαία μουσεία και αρχαίοι οικισμοί, τοιχογραφίες με έντονα χρώματα, εντυπωσιακά σπήλαια και βάραθρα, γνωστά από τους προϊστορικούς χρόνους, ήπιο κλίμα, μαγευτικές ακτές με υπερσύγχρονα ξενοδοχεία, γοητευτική ενδοχώρα με γραφικά χωριά, παραδόσεις και ζεστή φιλοξενία, εξαιρετική τοπική κουζίνα (με πρωταγωνιστικό ρόλο να έχουν το κρέας, το παρθένο ελαιόλαδο, τα φρούτα, τα λαχανικά και τα όσπρια).
    Ένα νησί ξεχωριστό με πάνω από 1.000 χλμ. ακτών: αυτή είναι η Κρήτη.`);
    this.greekConfig.properties.set("about_card1", "ΜΙΝΩΙΚΟΣ ΠΟΛΙΤΙΣΜΟΣ");
    this.greekConfig.properties.set("about_card2", "ΦΑΡΑΓΓΙΑ");
    this.greekConfig.properties.set("about_card3", "ΜΟΝΟΠΑΤΙΑ");
    this.greekConfig.properties.set("about_places_header", "Τι να επισκεφτείτε...");
    this.greekConfig.properties.set("about_places_card1_title", "Χανιά");
    this.greekConfig.properties.set("about_places_card1_body", `Η πόλη των Χανίων είναι η έδρα του ομώνυμου νομού, μια πόλη όπου η όσμωση διαφορετικών πολιτισμών ανά τους αιώνες άφησε το χαρακτηριστικό της σημάδι. Η περιπλάνηση στους λαβυρινθώδεις δρόμους της Παλιάς Πόλης με τις επιβλητικές βενετσιάνικες οικίες, τις κρήνες και τους περικαλλείς ναούς αποτελεί...`);
    this.greekConfig.properties.set("about_places_card1_btn", "ΕΞΕΡΕΥΝΗΣΤΕ");
    this.greekConfig.properties.set("about_places_card2_title", "Ρέθυμνο");
    this.greekConfig.properties.set("about_places_card2_body", `Η πόλη του Ρεθύμνου είναι μια από τις καλύτερα διατηρημένες μεσαιωνικές πόλεις της Ελλάδας: οι ενετικές οχυρώσεις σμίγουν αρμονικά με τις εκκλησιές των ορθοδόξων και των καθολικών, τις επιβλητικές κατοικίες των Βενετών, τις αψίδες και τις πλακόστρωτες οδούς δημιουργώντας μια ατμόσφαιρα...`);
    this.greekConfig.properties.set("about_places_card2_btn", "ΕΞΕΡΕΥΝΗΣΤΕ");
    this.greekConfig.properties.set("about_places_card3_title", "Ηράκλειο");
    this.greekConfig.properties.set("about_places_card3_body", `Το Ηράκλειο είναι η μεγαλύτερη πόλη της Κρήτης και ένα από τα σημαντικότερα αστικά κέντρα της Ελλάδας. Η πόλη του αντανακλά με σαφήνεια τους διαφορετικούς πολιτισμούς που άνθισαν στο πέρασμα των αιώνων: Βυζαντινά οικοδομήματα στέκουν δίπλα σε Ενετικά δημόσια και ιδιωτικά κτίρια και Οθωμανικές...`);
    this.greekConfig.properties.set("about_places_card3_btn", "ΕΞΕΡΕΥΝΗΣΤΕ");
    this.greekConfig.properties.set("about_places_card4_title", "Αγιος Νικόλαος");
    this.greekConfig.properties.set("about_places_card4_body", `Ο Άγιος Νικόλαος είναι η σύγχρονη κοσμοπολίτικη πρωτεύουσα του νομού Λασιθίου. Κάθε καλοκαίρι πλήθος κόσμου μαζεύεται στα διάσημα μπαράκια του λιμανιού και της γραφικής λίμνης Βουλισμένης. Πάνω από τη λίμνη αναπτύσσεται μικρό πευκόφυτο πάρκο, ενώ από αυτό ξεκινά ένα πετρόχτιστο μονοπάτι που...`);
    this.greekConfig.properties.set("about_places_card4_btn", "ΕΞΕΡΕΥΝΗΣΤΕ");
    this.greekConfig.properties.set("about_crete_title", "10 λόγοι που θα ερωτευτείτε την Κρήτη");
    this.greekConfig.properties.set("about_crete_subheader", "Η Κρήτη είναι ένας τόπος γοητευτικός, που προσφέρει στον υπέρτατο βαθμό όσα μπορείτε να ονειρευτείτε για τις διακοπές σας. Σας δίνουμε δέκα κορυφαίους λόγους γι’ αυτό, αλλά σίγουρα θα ανακαλύψετε πολλούς περισσότερους όταν βρεθείτε στο νησί!");
    this.greekConfig.properties.set("about_crete_card1_title", "1. Πολιτισμός και Παραδόσεις");
    this.greekConfig.properties.set("about_crete_card1_body", `Ανακαλύψτε την πολυκύμαντη ιστορία της ανά τους αιώνες: Στα Μινωικά ανάκτορα της Κνωσού, της Φαιστού, των Μαλίων και της Ζάκρου. Στους αρχαιολογικούς χώρους της αρχαίας Γόρτυνας, Ελεύθερνας, Λύττου, Απτέρας,Φαλάσαρνας, Σπιναλόγκας… Στα ενετικά λιμάνια των Χανίων, Ηρακλείου και Ρεθύμνου. Στα οθωμανικά μνημεία και αρχιτεκτονήματα διάσπαρτα σ’ ολόκληρο το νησί. Στις ιστορικές μονές Αρκαδίου, Πρέβελης, Τοπλού, Αγκαράθου, Χρυσοσκαλίτισσας… Στα πολυάριθμα θεματικά μουσεία, ανάμεσά τους το Αρχαιολογικό Μουσείο Ηρακλείου, από τα σπουδαιότερα παγκοσμίως.`);
    this.greekConfig.properties.set("about_crete_card2_title", "2. Παλιές Πόλεις");
    this.greekConfig.properties.set("about_crete_card2_body", `Στις παλιές πόλεις των Χανίων και του Ρεθύμνου κυριαρχεί ένα γοητευτικό κράμα ενετικών και οθωμανικών στοιχείων.`);
    this.greekConfig.properties.set("about_crete_card2_body_fade", `Διάσημες και μαγευτικές, ποζάρουν αυτάρεσκα σε αμέτρητα φωτογραφικά ενσταντανέ, αποτυπώνοντας την αίγλη μιας άλλης εποχής. Σεργιανίστε στα στενά τους δρομάκια, ξαποστάστε σε παραδοσιακά καφενεία και ταβερνάκια και απλά αφεθείτε στη μαγεία μιας άλλης εποχής.`);
    this.greekConfig.properties.set("about_crete_card3_title", "3. Παραδοσιακά Χωρία");
    this.greekConfig.properties.set("about_crete_card3_body", `Ορεινοί οικισμοί στην πλειοψηφία, όπου διατηρούνται αναλλοίωτα μέχρι σήμερα έθιμα και παραδόσεις, σάς αποκαλύπτουν αυθεντικές πτυχές της γνήσιας κρητικής κουλτούρας. Αρχάνες, Ζαρός και Ασίτες στο Ηράκλειο, Βάμος και Χώρα Σφακίων στα Χανιά, Ανώγεια, Αξός και Μαργαρίτες στο Ρέθυμνο, Μακρύγιαλος και Κριτσά στο Λασίθι… Εδώ χτυπά η ανόθευτη ψυχή της Κρήτης!`);
    this.greekConfig.properties.set("about_crete_card4_title", "4. Παραθαλάσσια τουριστικά θέρετρα");
    this.greekConfig.properties.set("about_crete_card4_body", `Το παράλιο «μέτωπο» του νησιού φιλοξενεί πολυτελείς παραθεριστικές μονάδες, αλλά και παντός τύπου καταλύματα. Πέρα από τις μεγάλες πόλεις (Ηράκλειο, Χανιά, Ρέθυμνο, Άγιο Νικόλαο, Σητεία και Ιεράπετρα) αλησμόνητες διακοπές θα απολαύσετε σε: Αγία Πελαγία, Αμνισσό, Καλούς Λιμένες, Χάνι Κοκκίνη, Μάλια και Αμμουδάρα (Νομός Ηρακλείου). Πλατανιά, Αγία Μαρίνα, Κολυμπάρι, Αγία Ρουμέλη, Λουτρό, Παλαιόχωρα και Κίσσαμο (Νομός Χανίων). Γεωργιούπολη, Μπαλί, Πλακιά, Άγιο Παύλο, Πάνορμο (Νομός Ρεθύμνου). Ελούντα, Πλάκα, Μακρύγιαλος, Κουτσουνάρι, Άγια Φωτιά (Νομός Λασιθίου).`);
    this.greekConfig.properties.set("about_crete_card5_title", "5. Γαστρονομία");
    this.greekConfig.properties.set("about_crete_card5_body", `Η ιδιαιτερότητα της κρητικής κουζίνας συμπυκνώνεται στη ρήση «πράμα από τον τόπο σου». Είναι αξιοθαύμαστος ο τρόπος που οι κρητικοί αξιοποιούν τα γεννήματα της πλούσιας γης τους: άφθονα οπωροκηπευτικά, εποχιακά λαχανικά, όσπρια, άγρια χόρτα και αρωματικά βότανα «παντρεύονται» με νόστιμο αιγοπρόβειο κρέας, δημιουργώντας πολλές φορές ευφάνταστα μαγειρέματα που δε συναντώνται πουθενά αλλού στην Ελλάδα. Εντυπωσιακή, εξάλλου, είναι η παλέτα των τυροκομικών, με κορωνίδα την ονομαστή γραβιέρα Κρήτης, κατοχυρωμένη διεθνώς ως τυρί με ονομασία προέλευσης.`);
    this.greekConfig.properties.set("about_crete_card6_title", "6. Παραλίες");
    this.greekConfig.properties.set("about_crete_card6_body", `Η τεράστια ακτογραμμή του νησιού φιλοξενεί απειράριθμες παραλίες, στην πλειοψηφία τους αμμουδερές. Στην περιοχή των Χανίων ξεχωρίζουν οι «εξωτικές» Μπάλος, Φαλάσαρνα και Ελαφονήσι. Σε κοντινή απόσταση από το Ηράκλειο βρίσκονται η Αμνισός, η Αγία Πελαγία, οι Καλοί Λιμένες, τα Μάλια, ο Λιμένας Χερσονήσου, η Αμμουδάρα και τα «ιστορικά» Μάταλα. Στο Ρέθυμνο θα βρείτε τις μεγαλύτερες αμμουδιές (Επισκοπή, Πετρές) και ορισμένες από τις πιο «ιδιαίτερες» της Κρήτης (Τριόπετρα, Άγιος Παύλος, Λίγκρες, Φραγκοκάστελο, Πρέβελη). Το Λασίθι φημίζεται για τις γραφικές ακρογιαλιές του Λιβυκού πελάγους και την κοσμοπολίτικη Ελούντα.`);
    this.greekConfig.properties.set("about_crete_card7_title", "7. Στολίδια της φύσης");
    this.greekConfig.properties.set("about_crete_card7_body", `Το γεωφυσικό ανάγλυφο του νησιού με τις μεγάλες μορφολογικές αντιθέσεις προσφέρεται για εξερεύνηση και φυσιολατρικές περιηγήσεις. Επιβλητικοί ορεινοί όγκοι με τραχιές βουνοκορφές, σπήλαια και βάραθρα γνωστά από τους προϊστορικούς χρόνους, δασωμένα φαράγγια, γόνιμα οροπέδια και κοιλάδες, σπάνια κεδροδάση και υδροβιότοποι συνθέτουν το μεγαλείο της κρητικής φύσης. Μην παραλείψετε να επισκεφτείτε το Φυσικό Πάρκο του Ψηλορείτη, το οποίο έχει ενταχθεί και στο Δίκτυο των Παγκόσμιων Γεωπάρκων της UNESCO, αλλά και αυτό της Σητείας, τα ξακουστά σπήλαια (Ιδαίον και Δικταίον Άντρον, Μελιδόνη, Σφενδόνη), το φαράγγι της Σαμαριάς, το φοινικόδασος στο Βάι, τις λίμνες Κουρνά και Πρέβελη, τα οροπέδια Λασιθίου και Νίδας.`);
    this.greekConfig.properties.set("about_crete_card8_title", "8. Δραστηριότητες");
    this.greekConfig.properties.set("about_crete_card8_body", `Πραγματικός παράδεισος για δραστήριους ταξιδιώτες, η Κρήτη, προσφέρει ανεπανάληπτες εμπειρίες σε βουνό και θάλασσα. Διασχίστε τα δεκάδες φαράγγια της, κατακτήστε την ενδοχώρα με εκτός δρόμου οχήματα, πεζοπορήστε σε αναρίθμητες περιπατητικές διαδρομές, εντυπωσιακά είναι τα μέρη που περνάει το ευρωπαϊκό μονοπάτι Ε4 και χαρείτε το θαλάσσιο στίβο της κάνοντας ιστιοπλοΐα, καταδύσεις, θαλάσσιο καγιάκ και windsurfing.`);
    this.greekConfig.properties.set("about_crete_card9_title", "9. Εξωτικά Νησιά");
    this.greekConfig.properties.set("about_crete_card9_body", `Στη Γαύδο, το νοτιότερο άκρο της Ευρώπης, σάς περιμένουν παραδείσιες παραλίες (Σαρακήνικο, Αι – Γιάννης, Πύργος, Ποταμός, Τρυπητή), κεδροδάση που ακουμπούν στη θάλασσα και καλοχαραγμένα μονοπάτια για περιήγηση στους λιγοστούς οικισμούς. Το καλοκαίρι κατακλύζεται κυρίως από κατασκηνωτές που θέλουν να νιώσουν την απόλυτη ελευθερία και τη ξεχωριστή ενέργεια του τόπου. Το νησάκι συνδέεται με καραβάκια από την Παλαιόχωρα, τη Σούγια και τη Χώρα Σφακίων.
    Η Χρυσή ή Ποντικονήσι (8 μίλια νότια της Ιεράπετρας) εντυπωσιάζει με τα γαλαζοπράσινα νερά, τη σχεδόν λευκή αμμουδιά που χρωματίζεται από μυριάδες σπασμένα κοχύλια και τους τεράστιους θαλασσόκεδρους «γαντζωμένους» στις αμμοθίνες. Καθημερινά εκατοντάδες επισκέπτες επισκέπτονται το νησί με τα εκδρομικά πλοιάρια που φεύγουν από την Ιεράπετρα. Η Χρυσή έχει ανακηρυχθεί περιοχή ιδιαίτερου φυσικού κάλλους και απαγορεύεται αυστηρά η κατασκήνωση και η διανυκτέρευση.
    Το άγνωστο σε πολλούς Κουφονήσι (Λεύκη) Σητείας με σπηλιές λαξευμένες στα ασβεστολιθικά πετρώματα και ίχνη σημαντικών αρχαιοτήτων, αποτελεί κρυφό παράδεισο για τους ντόπιους που το επισκέπτονται – με δικά τους κυρίως πλεούμενα – για να χαρούν τις αμμουδερές παραλίες και την ηρεμία της φύσης. Μπορείτε να το επισκεφθείτε παίρνοντας το καραβάκι από το Μακρύγιαλο. Το νησάκι δεν διαθέτει υποδομές, οπότε φροντίστε να έχετε μαζί σας τα… απαραίτητα.`);
    this.greekConfig.properties.set("about_crete_card10_title", "10. Αυθεντικός τρόπος ζωής");
    this.greekConfig.properties.set("about_crete_card10_body", `Οι Κρητικοί, άνθρωποι υπερήφανοι αλλά καταδεκτικοί, ως γνήσιοι απόγονοι του Κρηταγενή Ξένιου Δία φημίζονται για τη φιλοξενία τους, την οποία προσφέρουν απλόχερα στον «ξένο». Η ιδιαίτερη αγάπη για τον τόπο τους και η προσήλωσή τους σε πατροπαράδοτα ήθη και έθιμα έχουν δημιουργήσει μια ιδιαίτερη κουλτούρα και έναν τρόπο ζωής που αξίζει να γνωρίσετε. Μοναδική εμπειρία αποτελεί το κρητικό γλέντι ,όπου τα κεράσματα, τα καλέσματα για χορό, οι αυτοσχέδιες μαντινάδες και τα ριζίτικα, απογειώνουν το κέφι.`);
    this.greekConfig.properties.set("about_crete_btn_showmore","ΔΙΑΒΑΣΤΕ ΠΕΡΙΣΣΟΤΕΡΑ");
    this.greekConfig.properties.set("about_crete_btn_showless","ΔΙΑΒΑΣΤΕ ΛΙΓΟΤΕΡΑ");
    this.greekConfig.properties.set("about_crete_flv_title","ΓΕΥΣΕΙΣ");
    this.greekConfig.properties.set("about_crete_flv_subTitle","από Κρήτη");
    this.greekConfig.properties.set("about_crete_flv_btn","ΔΕΙΤΕ");
    this.greekConfig.properties.set('gift_page_copy_btn','Αντιγραφή στο πρόχειρο');

    //Gift
    this.greekConfig.properties.set("gift_page_header","Αν και η χαρά να σας έχουμε μαζί μας την ημέρα του γάμου μας ξεπερνά κάθε υλικό δώρο, η υποστήριξή σας θα ήταν θερμά ευπρόσδεκτη και πραγματικά εκτιμημένη.");
    //αν θέλετε να συνεισφέρετε με άλλο τρόπο

    //Header
    this.englishConfig.properties = new Map<string, string>();
    this.englishConfig.properties.set("header_home", "Home");
    this.englishConfig.properties.set("header_wedding", "The Wedding");
    this.englishConfig.properties.set("header_about", "About Crete");
    this.englishConfig.properties.set("header_info", "Info");
    this.englishConfig.properties.set("header_rsvp", "RSVP");
    this.englishConfig.properties.set("header_gift", "Gift List");
    this.englishConfig.properties.set("header_contact", "Contact");
    //Counter
    this.englishConfig.properties.set("home_ctr_label", "Countdown to August 24, 2024");
    this.englishConfig.properties.set("home_ctr_days", "Days");
    this.englishConfig.properties.set("home_ctr_hours", "Hours");
    this.englishConfig.properties.set("home_ctr_mins", "Minutes");
    this.englishConfig.properties.set("home_ctr_sec", "Seconds");
    //CoupleInfo
    this.englishConfig.properties.set("home_cpl_header", "JOIN THODORIS & MARILENA TO CELEBRATE THEIR UNION");
    this.englishConfig.properties.set("home_cpl_subheader", "A little about the Bride and Groom");
    this.englishConfig.properties.set("home_cpl_groom", "You have been my best friend, mentor, playmate, confidant, and my greatest challenge. But most importantly, you are the love of my life and you make me happier than I could ever imagine and more loved than I ever thought possible.");
    this.englishConfig.properties.set("home_cpl_pride", "I love you for your beauty, your intelligence, your kindness… and for the way you always know how to make me feel so special. So on top of all the other vows that I will make to you on our wedding day, I also vow to always appreciate how lucky I am.");
    //HomeDetailsInfo
    this.englishConfig.properties.set("home_info_header_cer", "CEREMONY");
    this.englishConfig.properties.set("home_info_subheader_cer", "Skepasti Arena");
    this.englishConfig.properties.set("home_info_loc1_cer", "Skepasti | Crete");
    this.englishConfig.properties.set("home_info_loc2_cer", "ΕΟ Rethimnou Irakliou, Skepasti");
    this.englishConfig.properties.set("home_info_header_par", "PARTY");
    this.englishConfig.properties.set("home_info_subheader_par", "Skepasti Arena");
    this.englishConfig.properties.set("home_info_loc1_par", "Skepasti | Crete");
    this.englishConfig.properties.set("home_info_loc2_par", "ΕΟ Rethimnou Irakliou, Skepasti");
    this.englishConfig.properties.set("home_info_btn_map", "Click to see the Map");

    //RSVP
    this.englishConfig.properties.set("rsvp_invite_header", "Please let us know if you can make it by July 1st at the latest, preesh!");
    this.englishConfig.properties.set("rsvp_pos_answer", "I will");
    this.englishConfig.properties.set("rsvp_neg_answer", "I will not");
    this.englishConfig.properties.set("rsvp_main_option_a", "attend ceremony and/or party");
    this.englishConfig.properties.set("rsvp_main_option_b", "attend both of them");
    this.englishConfig.properties.set("rsvp_pos_option_a", "Will you attend the wedding ceremony?");
    this.englishConfig.properties.set("rsvp_pos_option_b", "Will you attend the party?");
    this.englishConfig.properties.set("rsvp_contact_header", "Contact Details");
    this.englishConfig.properties.set("rsvp_firstname", "Enter your first name");
    this.englishConfig.properties.set("rsvp_lastname", "Enter your last name");
    this.englishConfig.properties.set("rsvp_phone", "Please specify your phone number");
    this.englishConfig.properties.set("rsvp_email", "Please specify your email address");
    this.englishConfig.properties.set("rsvp_subheader_people", "Reservation Details");
    this.englishConfig.properties.set("rsvp_people_count", "Number of people");
    this.englishConfig.properties.set("rsvp_extra_attendee", "Enter the fullname of the attendee");
    this.englishConfig.properties.set("rsvp_comments", "Enter any additional comments");
    this.englishConfig.properties.set("rsvp_submit", "Submit RSVP");
    this.englishConfig.properties.set("rsvp_submitting", "Submitting");

    //Contact Page
    this.englishConfig.properties.set("contact_header", "Send a message if you have any question and we will reach out tou you shortly");
    this.englishConfig.properties.set("contact_firstname", "Enter your first name");
    this.englishConfig.properties.set("contact_lastname", "Enter your last name");
    this.englishConfig.properties.set("contact_phone", "Please specify your phone number");
    this.englishConfig.properties.set("contact_email", "Please specify your email address");
    this.englishConfig.properties.set("contact_comments", "Enter any additional comments");
    this.englishConfig.properties.set("contact_submit", "Submit");
    this.englishConfig.properties.set("contact_submitting", "Submitting");
    this.englishConfig.properties.set("contact_callus", "Or give us a call on:");
    this.englishConfig.properties.set("contact_callus1", "Thodoris");
    this.englishConfig.properties.set("contact_callus2", "Marilena");

    //Info Page
    this.englishConfig.properties.set("info_flight1_header", "Athens (ATH) to Heraklion (HER) flights");
    this.englishConfig.properties.set("info_flight2_header", "Thessaloniki (SKG) to Heraklion (HER) flights");
    this.englishConfig.properties.set("info_flight_number", "Weekly Planes");
    this.englishConfig.properties.set("info_flight_duration", "Average Duration");
    this.englishConfig.properties.set("info_flight_cost", "Cheapest Price");
    this.englishConfig.properties.set("info_flight_explore_btn", "See schedules");
    this.englishConfig.properties.set("info_ferry_header", "Piraues to Heraklion ferrys");
    this.englishConfig.properties.set("info_ferry_number", "Weekly Ferrys");
    this.englishConfig.properties.set("info_ferry_duration", "Average Duration");
    this.englishConfig.properties.set("info_ferry_cost", "Cheapest Price");
    this.englishConfig.properties.set("info_ferry_explore_btn", "See schedules");
    this.englishConfig.properties.set("info_stay_header", "Where to stay...");
    this.englishConfig.properties.set("info_stay_subheader", "Find the best place to enjoy your stay");
    this.englishConfig.properties.set("info_stay_recommendations", "Our recommendations, according to the distance from the wedding are:");
    this.englishConfig.properties.set("info_stay_place1", "Skepasti");
    this.englishConfig.properties.set("info_stay_place2", "Perama");
    this.englishConfig.properties.set("info_stay_place3", "Melidoni");
    this.englishConfig.properties.set("info_stay_place4", "Roumeli");
    this.englishConfig.properties.set("info_stay_place5", "Choumeri");
    this.englishConfig.properties.set("info_stay_place6", "Aggeliana");
    this.englishConfig.properties.set("info_stay_place7", "Skaleta");
    this.englishConfig.properties.set("info_stay_place8", "Rethimno");
    this.englishConfig.properties.set("info_stay_place9", "Panormo");
    this.englishConfig.properties.set("info_stay_place10", "Bali");
    this.englishConfig.properties.set("info_stay_explore_more", "DISCOVER MORE");
    this.englishConfig.properties.set("info_stay_additional", "You can also travel with a ferry or airplane from Athens, Thessaloniki or Pireus to Chania, but we recommend Heraklion as it is closer to the wedding.");
    this.englishConfig.properties.set("info_food_header", "What to try...");
    this.englishConfig.properties.set("info_visit_header", "Coffee & Drink...");
    this.englishConfig.properties.set("info_beach_header", "Nearby beaches...");
    this.englishConfig.properties.set("info_stay_useful_phones", "Useful Phones");
    this.englishConfig.properties.set("info_stay_useful_phones1", "Health Center Peramatos");
    this.englishConfig.properties.set("info_stay_useful_phones2", "Health Center Anogion");
    this.englishConfig.properties.set("info_stay_useful_phones3", "Hospital Rethimno");
    this.englishConfig.properties.set("info_stay_useful_phones4", "Police Departnent Perama");
    this.englishConfig.properties.set("info_stay_useful_phones5", "Traffic Police Rethimno");
    this.englishConfig.properties.set("info_stay_useful_phones6", "Fire Department Perama");
    this.englishConfig.properties.set("info_stay_useful_phones7", "Fire Department Rethimno");
    this.englishConfig.properties.set("info_stay_useful_phones_btn", "Click on it to call");

    //About Page
    this.englishConfig.properties.set("about_header", "Crete simply has it all!");
    this.englishConfig.properties.set("about_subheader", "We propose you to combine our special day with a memorable vacation experience.");
    this.englishConfig.properties.set("about_top_paragraph", "Crete is the largest island in Greece, and the fifth largest one in the Mediterranean Sea. Here, you can admire the remnants of brilliant civilizations, explore glorious beaches, impressive mountainscapes, fertile valleys and steep gorges, and become part of the island’s rich gastronomic culture. Crete is, after all, a small universe teeming with beauties and treasures that you will probably need a lifetime to uncover!");
    this.englishConfig.properties.set("about_card1", "MINOAN CIVILIZATION");
    this.englishConfig.properties.set("about_card2", "CORGES");
    this.englishConfig.properties.set("about_card3", "TRAILS");
    this.englishConfig.properties.set("about_places_header", "Where to go...");
    this.englishConfig.properties.set("about_places_card1_title", "Chania");
    this.englishConfig.properties.set("about_places_card1_body", "Chania (also spelled Hania) is the capital city, a place where different civilizations have flourished throughout the centuries. Strolling around the Old Town’s maze-like alleys with the beautiful Venetian mansions, the fountains and the churches will guide you through well-preserved historical monuments.");
    this.englishConfig.properties.set("about_places_card1_btn", "Explore");
    this.englishConfig.properties.set("about_places_card2_title", "Rethimno");
    this.englishConfig.properties.set("about_places_card2_body", "Rethymno is located in the north end of the prefecture, built by the sea and is a city with many faces. Rethymno or Rithymna as it was once called has been inhabited since the Later Minoan III period. Nowadays, it keeps the elements inherited by its history (from antiquity up to now).");
    this.englishConfig.properties.set("about_places_card2_btn", "Explore");
    this.englishConfig.properties.set("about_places_card3_title", "Heraklion");
    this.englishConfig.properties.set("about_places_card3_body", "Heraklion is the largest city of Crete and one of Greece’s major urban centres. The city flourished under a multicultural influence throughout the centuries; that’s why there is a plethora of Byzantine, Venetian and Ottoman structures to look out for! The city’s landmark is the 16th c. Koules fortress.");
    this.englishConfig.properties.set("about_places_card3_btn", "Explore");
    this.englishConfig.properties.set("about_places_card4_title", "Agios Nikolaos");
    this.englishConfig.properties.set("about_places_card4_body", "Agios Nikolaos (“Ag Nik” as the British visitors love to call it) is the capital town of Lassithi. Here, the bottomless salt lake Voulismeni dominates the area. A narrow channel of water connects the lake with the sea, while an imposing backdrop of red rock and trees adds to the natural beauty of the scenery.");
    this.englishConfig.properties.set("about_places_card4_btn", "Explore");
    this.englishConfig.properties.set("about_crete_title", "10 reasons to fall in love with Crete");
    this.englishConfig.properties.set("about_crete_subheader", "The biggest island of Greece is a charming place where visitors can enjoy their trip in the way they have imagined it. Here are 10 reasons why Crete is worth visiting; once you get there though, expect to discover many more!");
    this.englishConfig.properties.set("about_crete_card1_title", "1. Civilisation & Culture");
    this.englishConfig.properties.set("about_crete_card1_body", `Its strategic location on the map has turned the island of Crete into a crossroads where peoples
    and
    civilisations have left a permanent mark on, along with a rich cultural heritage. Across the ages,
    Minoans, Mycenaeans, Ottoman Turks, Arabs and Venetians have shaped the island’s identity.
    Discover Crete’s eventful history that spans fifty-odd centuries: the Minoan palaces at Knossos,
    Phaestos, Malia and Zakros; the archaeological sites of ancient Gortyna, Eleftherna, Lyttos, Aptera,
    Falasarna, Spinalonga; the Venetian harbours at Chania, Heraklion and Rethymno towns; the ottoman
    monuments and architectural structures seen across the island; the historic monasteries of Arkadi,
    Preveli, Toplou, Agarathou, and Chrysoskalitissa; numerous thematic museums – the Heraklion
    Archaeological Museum is among the most significant in Europe.`);
    this.englishConfig.properties.set("about_crete_card2_title", "2. Old Towns");
    this.englishConfig.properties.set("about_crete_card2_body", `The old towns of
    Chania and Rethymno share a fascinating combination of Venetian and Ottoman`);
    this.englishConfig.properties.set("about_crete_card2_body_fade", `architectural elements. They are well-known, charming, and
    much-photographed with an ambience reminiscent of times gone by. Stroll along their narrow alleys
    and
    streets, stop by and have a coffee, snack or meal in the traditional cafes and tavernas; the magical
    patina of old times is everywhere.`);
    this.englishConfig.properties.set("about_crete_card3_title", "3. Traditional Villages");
    this.englishConfig.properties.set("about_crete_card3_body", `They are mountain villages, mostly. Old customs and traditions are kept unchanged here and they
    unveil
    aspects of the true Cretan culture. Visit Archanes, Zaros and Asites in Heraklion region, Vamos and
    Chora Sfakion in Chania region, Anogeia, Axos and Margarites in Rethymno region, Makrygialos and
    Kritsa
    in Lasithi region. This is the ‘heart’ of traditional Crete.`);
    this.englishConfig.properties.set("about_crete_card4_title", "4. Seaside Tourist Resorts");
    this.englishConfig.properties.set("about_crete_card4_body", `Luxury resorts and lodgings of all types can be found along the seafront. Big towns such as
    Heraklion,
    Chania, Rethymno, Agios Nikolaos, Siteia and Ierapetra are not the only destinations that can offer
    you
    a vacation to remember: visit also Agia Pelagia, Amnissos, Kaloi Limenes, Chani Kokkini, Malia and
    Ammoudara (Heraklion region); Platania, Agia Marina, Kolympari, Agia Roumeli, Loutro, Palaiochora
    and
    Kissamos in Chania region; Georgioupoli, Bali, Plakia, Agios Pavlos, Panormos in Rethymno region;
    Elounta, Plaka, Makrygialos, Koutsounari, Agia Fotia in Lasithi region.`);
    this.englishConfig.properties.set("about_crete_card5_title", "5. Gastronomy");
    this.englishConfig.properties.set("about_crete_card5_body", `The essence of the Cretan cuisine can be described in the following words: “prefer the products of
    your land”. The way locals make use of their land’s rich produce is remarkable. The wide variety of
    seasonal fruits and vegetables, legumes, wild edible greens and fragrant herbs are combined with
    tasty
    goat and sheep meat: the outcome is a number of particularly tasty dishes that don’t come up
    anywhere
    else in Greece. The local cheese list is also quite impressive; on the top you will find the popular
    Cretan graviera (a type of hard cheese) which is a PDO cheese.`);
    this.englishConfig.properties.set("about_crete_card6_title", "6. Beaches");
    this.englishConfig.properties.set("about_crete_card6_body", `The island’s endless coastline features numerous beaches, most of which are sandy. Balos,
    Falasarna
    and Elafonisi are three beaches of great beauty in the region of Chania. Within a short distance
    from
    Heraklion you will find Amnissos, Agia Pelagia, Kaloi Limenes, Malia, Limenas Chersonisou, Ammoudara
    beaches. Don’t miss out on visiting Matala beach known since the sixties and seventies as a hotspot
    for
    hippies who travelled there from all over the world.
    In Rethymno you will find the longest sandy beaches (Episkopi, Petres) and a number of quite unusual
    beaches (Triopetra, Agios Pavlos, Ligres, Fragokastelo, Preveli). The area of Lasithi is well-known
    for
    its picturesque shores that are washed by the Libyan Sea, as well as for cosmopolitan Elounta
    beach.`);
    this.englishConfig.properties.set("about_crete_card7_title", "7. Nature’s Amazing Creations");
    this.englishConfig.properties.set("about_crete_card7_body", `The terrain’s morphological diversity is remarkable and it offers hard-to-ignore opportunities to
    daring explorers and nature lovers for extensive tours of the countryside. High mountains with
    rugged
    peaks, caves and ravines, fertile plateaus and valleys, rare cedar forests and water habitats are
    the
    pieces that make up the lovely and diverse Cretan land. Make a note of visiting Mt. Psiloritis (or
    Psiloritis) Natural Park and Siteia (or Sitia) Natural Park - both are UNESCO Global Geoparks,
    discover
    caves celebrated in ancient Greek mythology such as Idaion Antron, Diktaion Antron, Melidoni and
    Sfendoni, hike along Samaria gorge, enjoy a ramble in Vai palm forest, Lakes Kourna & Preveli, as
    well
    as on Lasithi and Nida plateaus.`);
    this.englishConfig.properties.set("about_crete_card8_title", "8. Activities");
    this.englishConfig.properties.set("about_crete_card8_body", `Crete is an island that can offer many a thrill to action-loving travellers by the sea or on the
    mountain. Hike through its ravines, enjoy your off-road rides in the mainland, follow the trekking
    routes – the landscapes crossed by the E4 European trail are amazing; enjoy water sports activities
    such
    as sailing, diving, sea kayaking and windsurfing.`);
    this.englishConfig.properties.set("about_crete_card9_title", "9. Paradise Islands");
    this.englishConfig.properties.set("about_crete_card9_body", `Visit Gavdos islet, the southernmost tip of Europe; swim by heavenly beaches such as Sarakiniko,
    Ai
    Giannis, Pyrgos, Potamos, Trypiti; discover cedar woods that reach the seashore and well-tended
    trails
    that lead to the few island villages. In the summertime the place is a popular camping spot. There
    is a
    boat connection with Palaiochora, Sougia and Chora Sfakion.
    Chrysi or Pontikonisi islet (8 miles south of Ierapetra) is a feast for the eyes, what with its
    turquoise waters, the off-white sands enriched with the hues of broken seashells, and the huge
    seaside
    cedars rooted in the sand dunes. Every day hundreds of visitors come to the island for a day trip
    aboard
    the tourist boats from Ierapetra. Chrysi islet has been designated a Natura 2000 area and it is
    strictly
    forbidden to camp and spend the night there.
    Koufonisi, Siteia (or Lefki islet) is a place that few people know. There are caves shaped in the
    limestone rocks that contain vestiges of significant antiquities. The sandy beaches and natural
    serenity
    is what makes this islet a paradise - one that only locals are aware of; they usually take a trip
    there
    using their own boats. There is however a small boat that will take you from Makrygialos to
    Koufonisi.
    This islet is a pristine area with no facilities of any kind, so make sure you carry the essentials
    for
    your trip with you.`);
    this.englishConfig.properties.set("about_crete_card10_title", "10. A Natural Way of Life");
    this.englishConfig.properties.set("about_crete_card10_body", `The Cretans are proud and affable people. They are, after all, the descendants of Cretan-born Zeus
    the
    god of hospitality and father of all ancient Greek gods. And they know how to offer hospitality to
    strangers in their parts. Their profound love for their homeland and their adherence to traditional
    ways
    and customs have shaped a special culture and a way of life that is absolutely worth discovering.
    And if
    you happen to be invited to a Cretan feast, you will feel what it’s like to have fun - the way
    locals
    do. You will savour tasty titbits and dishes, and you’ll be called to join in the folk dances; you
    will
    listen to mantinades (songs with words improvised and sung on the spot) and rizitika songs.
    Have a great time – the Cretan way!`);
    this.englishConfig.properties.set("about_crete_btn_showmore","SHOW MORE");
    this.englishConfig.properties.set("about_crete_btn_showless","SHOW LESS");
    this.englishConfig.properties.set("about_crete_flv_title","Flavours");
    this.englishConfig.properties.set("about_crete_flv_subTitle","from Crete");
    this.englishConfig.properties.set("about_crete_flv_btn","DISCOVER THEM");

    //Gift
    this.englishConfig.properties.set("gift_page_header","While the joy of having you with us on our wedding day surpasses any material gift, should you wish to contribute in another way, your support towards our journey forward would be warmly welcomed and truly valued.");
    this.englishConfig.properties.set('gift_page_copy_btn','Copy to cliboard');
  }
}

