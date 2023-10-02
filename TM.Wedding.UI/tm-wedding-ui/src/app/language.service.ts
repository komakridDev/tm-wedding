import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LanguageCofig{
  properties: Map<string,string>;
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

  defaultLanuageConfig: LanguageCofig = this.englishConfig;
  private sessionCode = 'lang-code';
  private languageCodeInSubject = new BehaviorSubject<string>('en');
  private languageConfigInSubject = new BehaviorSubject<LanguageCofig>(this.defaultLanuageConfig);

  languageCode$ = this.languageCodeInSubject.asObservable();
  languageConfig$ = this.languageConfigInSubject.asObservable();

  setLanguageCode(newValue: string) {
    this.languageCodeInSubject.next(newValue);

    if(newValue==='en'){
      this.setLanguageConfig(this.englishConfig);
    }else{
      this.setLanguageConfig(this.greekConfig);
    }
  }

  setLanguageConfig(newValue: LanguageCofig) {
    this.languageConfigInSubject.next(newValue);
  }

  refreshLanguageCodeInSession(){
    const sessionVariable = sessionStorage.getItem(this.sessionCode);

    if(sessionVariable){
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
    this.greekConfig.properties.set("home_cpl_header", "ΣΑΣ ΚΑΛΟΥΜΕ ΝΑ ΖΗΣΕΤΕ ΜΑΖΙ ΜΑΣ ΤΗΝ ΠΙΟ ΕΥΤΙΧΙΣΜΕΝΗ ΜΕΡΑ ΤΗΣ ΖΩΗΣ ΜΑΣ");
    this.greekConfig.properties.set("home_cpl_subheader", "Λίγα λόγια για μας");
    this.greekConfig.properties.set("home_cpl_groom", "Είσαι ο καλύτερος μου φίλος, μέντορας, συμπαίκτης, έμπνευση και η μεγαλύτερη μου πρόκληση. Αλλά το σημαντικότερο είσαι η αγαπή της ζωής μου και με κάνεις πιο ευτιχισμένη από τι θα μπορούσα να φανταστώ ότι είναι δυνατό.");
    this.greekConfig.properties.set("home_cpl_pride", "Αγαπώ την ομορφιά σου, την εφυιά σου, την ευγενική ψυχή σου και τον τρόπο που ξέρεις πάντα να με κάνεις να νίωθω μοναδικός. Πέρα απο τους όρκους αιώνιας αγαπής που θα δώσω την ημέρα του γάμους, ορκίζομαι ότι θα είμαι η πιο ευτιχισμένη απο όλο τον κόσμο."); 
    //HomeDetailsInfo
    this.greekConfig.properties.set("home_info_header_cer", "ΤΕΛΕΤΗ");
    this.greekConfig.properties.set("home_info_subheader_cer", "Σκεπαστή Αρένα");
    this.greekConfig.properties.set("home_info_loc1_cer", "Πανόρμος | Κρήτη");
    this.greekConfig.properties.set("home_info_loc2_cer", "ΕΟ Ρεθύμνου Ηρακλέιου, Σκεπαστή");
    this.greekConfig.properties.set("home_info_header_par", "ΔΕΞΙΩΣΗ");
    this.greekConfig.properties.set("home_info_subheader_par", "Σκεπαστή Αρένα");
    this.greekConfig.properties.set("home_info_loc1_par", "Πανόρμος | Κρήτη");
    this.greekConfig.properties.set("home_info_loc2_par", "ΕΟ Ρεθύμνου Ηρακλέιου, Σκεπαστή");
    this.greekConfig.properties.set("home_info_btn_map", "Δείτε στο Χάρτη");

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
    this.englishConfig.properties.set("home_info_loc1_cer", "Panormos | Crete");
    this.englishConfig.properties.set("home_info_loc2_cer", "ΕΟ Rethimnou Irakliou, Skepasti");
    this.englishConfig.properties.set("home_info_header_par", "PARTY");
    this.englishConfig.properties.set("home_info_subheader_par", "Skepasti Arena");
    this.englishConfig.properties.set("home_info_loc1_par", "Panormos | Crete");
    this.englishConfig.properties.set("home_info_loc2_par", "ΕΟ Rethimnou Irakliou, Skepasti");
    this.englishConfig.properties.set("home_info_btn_map", "Click to see the Map");
  }
}

