GlobalData = {};

GlobalData.years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
GlobalData.plantingMethods = [];
GlobalData.crops = ['Corn', 'Soybeans', 'Wheat', 'Oat', 'Alfalfa', 'Corn silage'];
GlobalData.harvestMethods = ['Combine, corn header', 'Combine, platform header', 'Combine, row crop header', 'Silage chopper', 'Windrower'];
GlobalData.vegetations = ["Perennial grass"];
GlobalData.conservationPractices = ["None", "Grade stabilization full flow", "Level terraces", "Ponds and grade stabilization retention", "Tile inlet terraces"];
GlobalData.plantingMethods = ["Planter 30 in rows", "Planter 15 in rows", "Drill or Airseeder"];

GlobalData.methodOfApplications = [ "Knifed in or soil injection of liquid manure", 
   "Surface-apply liquid or solid (dry) manure with incorp. within 24 hours", 
   "Surface-apply liquid or solid (dry) manure with incorp. after 24 hours",
   "Surface apply liquid manure with no incorporation", "Surface apply solid (dry) manure with no incorporation",
   "Irrigate liquid manure with no incorporation" ];

GlobalData.methodOfTillage = ["Chisel plow", "Moldboard plow", "Strip", "Disk", "Mulch", "Field cultivate", "Cultivate"];

GlobalData.fertilizerType = [ "Anhydrous ammonia (82% N)", "UAN (28% N)", "UAN (32% N)", "UAN (45% N)", 
    "Ammonium sulfate (21% N)", "P₂O₅", "K₂O"];

GlobalData.commercialMethodOfApplications = [ 'Knife', 'Surface broadcast' ];
GlobalData.herbicideType =  [ "Basis 75DF", "Basis Blend", "Bicep II MAG. 5.5L, Cinch ATZ", "Bicep Lite II MAG, Cinch ATZ Lite",
"Breakfree ATZ 5.25L" ,
"Breakfree ATZ Lite 5.5L",
"Buctril + Atrazine",
"Bullet 4ME",
"Callisto Xtra",
"Capreno",
"Cinch ATZ",
"Degree Xtra",
"Distinct 70WDG",
"Epic 58DF",
"Exceed 57WG",
"Expert 4.9SC",
"FieldMaster",
"Freestyle",
"FulTime 4CS",
"G-Max Lite 5L",
"Guardsman Max 5L",
"Halex GT",
"Harness Xtra",
"Harness Xtra 5.6L",
"Hornet WDG",
"Integrity",
"Instigate",
"Keystone 5.25L",
"Keystone LA 5.5L",
"Laddok S-12 5L",
"Lariat 4L",
"Lexar 3.7L",
"Liberty ATZ",
"Lightning 70DF",
"Lumax",
"Medal 11 AT",
"NorthStar",
"Optill",
"Prequil 45% DF",
"Priority",
"Radius",
"Require Q",
"Resolve Q",
"Sequence",
"Shotgun 3.25L",
"Spirit 57WG",
"Steadfast Q",
"SureStart SE/Tripleflex",
"Surpass 100 5L",
"Traverse",
"Trigate",
"Verdict",
"WideMatch 1.5EC",
"Yukon",
"Other",
"Authority Assist",
"Authority First/Sonic",
"Authority MTZ",
"Authority XL",
"Boundary 7.8EC",
"Canopy 75DF",
"Canopy EX",
"Commence 5.25E",
"Enlite 47.9DG",
"Envive 41.3DG",
"Extreme",
"Flexstar GT 3.5",
"Freestyle",
"FrontRow",
"Fusion 2.67E",
"Galaxy 3.67S",
"Gangster (co-pack)",
"OpTill",
"Prefix",
"Pursuit Plus 2.9E",
"Sequence 5.25L",
"Sonic",
"Stellar 3.1E",
"Storm 4S",
"Synchrony STS DF",
"Traverse",
"Valor XLT",
"Other" ];


GlobalData.herbicideMethodOfApplication = [ "Sprayer: Self propelled", "Sprayer: Non self propelled", "Irrigation" ];
GlobalData.phosphorusTestFactor = [ 'Bray-1 P, Mehlich-3', 'Olsen', 'Mehlich-3 ICP' ];

GlobalData.animalTypeAndProductPhase = [
"Grow/finish (wet/dry)",
"Grow/finish (dry feed)",
"Grow/finish (earthen)",
"Gestation",
"Sow and litter",
"Farrow-Nursery",
"Farrow-Finish",
"Wean/finish (wet/dry)",
"Wean/finish (dry feed)",
"Beef, Mature cows",
"Beef, Finishing",
"Beef, Feeder calves",
"Dairy Cows, 1200 lbs and up",
"Dairy Heifers, 900 lbs",
"Dairy Calves, 500 lbs",
"Dairy veal calves, 250 lbs",
"Dairy herd",
"Layer, caged, 4 lbs",
"Broiler, litter, 2 lbs",
"Turkeys, litter, 10 lbs",
];
GlobalData.manureStorageStructure = [ 'Nursery', 'Formed: Steel', 'Formed: Concrete', 'Formed: Concrete under building', 'Unformed: Covered', 'Unformed: Uncovered' ];

GlobalData.countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
		,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
		,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
		,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
		,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
		,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
		,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
		,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
		,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
		,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
		,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
		,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
		,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
		,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)"
		,"Yemen","Zambia","Zimbabwe"];


GlobalData.vegetations = ["", "Perennial grass"];
GlobalData.positions   = ["", "Top", "Middle", "Bottom"];
