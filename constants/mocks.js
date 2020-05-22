const _ = require('lodash');

const categories = [
  {
    id: 'plants',
    name: 'Plants',
    tags: ['products', 'inspirations'],
    count: 147,
    image: require('../assets/icons/plants.png'),
  },
  {
    id: 'seeds',
    name: 'Seeds',
    tags: ['products', 'shop'],
    count: 16,
    image: require('../assets/icons/seeds.png'),
  },
  {
    id: 'flowers',
    name: 'Flowers',
    tags: ['products', 'inspirations'],
    count: 68,
    image: require('../assets/icons/flowers.png'),
  },
  {
    id: 'sprayers',
    name: 'Sprayers',
    tags: ['products', 'shop'],
    count: 17,
    image: require('../assets/icons/sprayers.png'),
  },
  {
    id: 'pots',
    name: 'Pots',
    tags: ['products', 'shop'],
    count: 47,
    image: require('../assets/icons/pots.png'),
  },
  {
    id: 'fertilizers',
    name: 'fertilizers',
    tags: ['products', 'shop'],
    count: 47,
    image: require('../assets/icons/fertilizers.png'),
  },
];

const products = [
  {
    id: 1,
    name: '16 Best Plants That Thrive In Your Bedroom',
    description:
      'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
    tags: ['Interior', '27 m²', 'Ideas'],
    images: [
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      // showing only 3 images, show +6 for the rest
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
      require('../assets/images/plants_1.png'),
      require('../assets/images/plants_2.png'),
      require('../assets/images/plants_3.png'),
    ],
  },
];

const explore = [
  // images
  require('../assets/images/explore_1.png'),
  require('../assets/images/explore_2.png'),
  require('../assets/images/explore_3.png'),
  require('../assets/images/explore_4.png'),
  require('../assets/images/explore_5.png'),
  require('../assets/images/explore_6.png'),
];

const profile = {
  username: 'react-ui-kit',
  location: 'Europe',
  email: 'contact@react-ui-kit.com',
  avatar: require('../assets/images/avatar.png'),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};


const countries=[
  {
      "name": "Afghanistan",
      "code": "AF"
  },
  {
      "name": "Åland Islands",
      "code": "AX"
  },
  {
      "name": "Albania",
      "code": "AL"
  },
  {
      "name": "Algeria",
      "code": "DZ"
  },
  {
      "name": "American Samoa",
      "code": "AS"
  },
  {
      "name": "AndorrA",
      "code": "AD"
  },
  {
      "name": "Angola",
      "code": "AO"
  },
  {
      "name": "Anguilla",
      "code": "AI"
  },
  {
      "name": "Antarctica",
      "code": "AQ"
  },
  {
      "name": "Antigua and Barbuda",
      "code": "AG"
  },
  {
      "name": "Argentina",
      "code": "AR"
  },
  {
      "name": "Armenia",
      "code": "AM"
  },
  {
      "name": "Aruba",
      "code": "AW"
  },
  {
      "name": "Australia",
      "code": "AU"
  },
  {
      "name": "Austria",
      "code": "AT"
  },
  {
      "name": "Azerbaijan",
      "code": "AZ"
  },
  {
      "name": "Bahamas",
      "code": "BS"
  },
  {
      "name": "Bahrain",
      "code": "BH"
  },
  {
      "name": "Bangladesh",
      "code": "BD"
  },
  {
      "name": "Barbados",
      "code": "BB"
  },
  {
      "name": "Belarus",
      "code": "BY"
  },
  {
      "name": "Belgium",
      "code": "BE"
  },
  {
      "name": "Belize",
      "code": "BZ"
  },
  {
      "name": "Benin",
      "code": "BJ"
  },
  {
      "name": "Bermuda",
      "code": "BM"
  },
  {
      "name": "Bhutan",
      "code": "BT"
  },
  {
      "name": "Bolivia",
      "code": "BO"
  },
  {
      "name": "Bosnia and Herzegovina",
      "code": "BA"
  },
  {
      "name": "Botswana",
      "code": "BW"
  },
  {
      "name": "Bouvet Island",
      "code": "BV"
  },
  {
      "name": "Brazil",
      "code": "BR"
  },
  {
      "name": "British Indian Ocean Territory",
      "code": "IO"
  },
  {
      "name": "Brunei Darussalam",
      "code": "BN"
  },
  {
      "name": "Bulgaria",
      "code": "BG"
  },
  {
      "name": "Burkina Faso",
      "code": "BF"
  },
  {
      "name": "Burundi",
      "code": "BI"
  },
  {
      "name": "Cambodia",
      "code": "KH"
  },
  {
      "name": "Cameroon",
      "code": "CM"
  },
  {
      "name": "Canada",
      "code": "CA"
  },
  {
      "name": "Cape Verde",
      "code": "CV"
  },
  {
      "name": "Cayman Islands",
      "code": "KY"
  },
  {
      "name": "Central African Republic",
      "code": "CF"
  },
  {
      "name": "Chad",
      "code": "TD"
  },
  {
      "name": "Chile",
      "code": "CL"
  },
  {
      "name": "China",
      "code": "CN"
  },
  {
      "name": "Christmas Island",
      "code": "CX"
  },
  {
      "name": "Cocos (Keeling) Islands",
      "code": "CC"
  },
  {
      "name": "Colombia",
      "code": "CO"
  },
  {
      "name": "Comoros",
      "code": "KM"
  },
  {
      "name": "Congo",
      "code": "CG"
  },
  {
      "name": "Congo, The Democratic Republic of the",
      "code": "CD"
  },
  {
      "name": "Cook Islands",
      "code": "CK"
  },
  {
      "name": "Costa Rica",
      "code": "CR"
  },
  {
      "name": "Cote D\"Ivoire",
      "code": "CI"
  },
  {
      "name": "Croatia",
      "code": "HR"
  },
  {
      "name": "Cuba",
      "code": "CU"
  },
  {
      "name": "Cyprus",
      "code": "CY"
  },
  {
      "name": "Czech Republic",
      "code": "CZ"
  },
  {
      "name": "Denmark",
      "code": "DK"
  },
  {
      "name": "Djibouti",
      "code": "DJ"
  },
  {
      "name": "Dominica",
      "code": "DM"
  },
  {
      "name": "Dominican Republic",
      "code": "DO"
  },
  {
      "name": "Ecuador",
      "code": "EC"
  },
  {
      "name": "Egypt",
      "code": "EG"
  },
  {
      "name": "El Salvador",
      "code": "SV"
  },
  {
      "name": "Equatorial Guinea",
      "code": "GQ"
  },
  {
      "name": "Eritrea",
      "code": "ER"
  },
  {
      "name": "Estonia",
      "code": "EE"
  },
  {
      "name": "Ethiopia",
      "code": "ET"
  },
  {
      "name": "Falkland Islands (Malvinas)",
      "code": "FK"
  },
  {
      "name": "Faroe Islands",
      "code": "FO"
  },
  {
      "name": "Fiji",
      "code": "FJ"
  },
  {
      "name": "Finland",
      "code": "FI"
  },
  {
      "name": "France",
      "code": "FR"
  },
  {
      "name": "French Guiana",
      "code": "GF"
  },
  {
      "name": "French Polynesia",
      "code": "PF"
  },
  {
      "name": "French Southern Territories",
      "code": "TF"
  },
  {
      "name": "Gabon",
      "code": "GA"
  },
  {
      "name": "Gambia",
      "code": "GM"
  },
  {
      "name": "Georgia",
      "code": "GE"
  },
  {
      "name": "Germany",
      "code": "DE"
  },
  {
      "name": "Ghana",
      "code": "GH"
  },
  {
      "name": "Gibraltar",
      "code": "GI"
  },
  {
      "name": "Greece",
      "code": "GR"
  },
  {
      "name": "Greenland",
      "code": "GL"
  },
  {
      "name": "Grenada",
      "code": "GD"
  },
  {
      "name": "Guadeloupe",
      "code": "GP"
  },
  {
      "name": "Guam",
      "code": "GU"
  },
  {
      "name": "Guatemala",
      "code": "GT"
  },
  {
      "name": "Guernsey",
      "code": "GG"
  },
  {
      "name": "Guinea",
      "code": "GN"
  },
  {
      "name": "Guinea-Bissau",
      "code": "GW"
  },
  {
      "name": "Guyana",
      "code": "GY"
  },
  {
      "name": "Haiti",
      "code": "HT"
  },
  {
      "name": "Heard Island and Mcdonald Islands",
      "code": "HM"
  },
  {
      "name": "Holy See (Vatican City State)",
      "code": "VA"
  },
  {
      "name": "Honduras",
      "code": "HN"
  },
  {
      "name": "Hong Kong",
      "code": "HK"
  },
  {
      "name": "Hungary",
      "code": "HU"
  },
  {
      "name": "Iceland",
      "code": "IS"
  },
  {
      "name": "India",
      "code": "IN"
  },
  {
      "name": "Indonesia",
      "code": "ID"
  },
  {
      "name": "Iran, Islamic Republic Of",
      "code": "IR"
  },
  {
      "name": "Iraq",
      "code": "IQ"
  },
  {
      "name": "Ireland",
      "code": "IE"
  },
  {
      "name": "Isle of Man",
      "code": "IM"
  },
  {
      "name": "Israel",
      "code": "IL"
  },
  {
      "name": "Italy",
      "code": "IT"
  },
  {
      "name": "Jamaica",
      "code": "JM"
  },
  {
      "name": "Japan",
      "code": "JP"
  },
  {
      "name": "Jersey",
      "code": "JE"
  },
  {
      "name": "Jordan",
      "code": "JO"
  },
  {
      "name": "Kazakhstan",
      "code": "KZ"
  },
  {
      "name": "Kenya",
      "code": "KE"
  },
  {
      "name": "Kiribati",
      "code": "KI"
  },
  {
      "name": "Korea, Democratic People\"S Republic of",
      "code": "KP"
  },
  {
      "name": "Korea, Republic of",
      "code": "KR"
  },
  {
      "name": "Kuwait",
      "code": "KW"
  },
  {
      "name": "Kyrgyzstan",
      "code": "KG"
  },
  {
      "name": "Lao People\"S Democratic Republic",
      "code": "LA"
  },
  {
      "name": "Latvia",
      "code": "LV"
  },
  {
      "name": "Lebanon",
      "code": "LB"
  },
  {
      "name": "Lesotho",
      "code": "LS"
  },
  {
      "name": "Liberia",
      "code": "LR"
  },
  {
      "name": "Libyan Arab Jamahiriya",
      "code": "LY"
  },
  {
      "name": "Liechtenstein",
      "code": "LI"
  },
  {
      "name": "Lithuania",
      "code": "LT"
  },
  {
      "name": "Luxembourg",
      "code": "LU"
  },
  {
      "name": "Macao",
      "code": "MO"
  },
  {
      "name": "Macedonia, The Former Yugoslav Republic of",
      "code": "MK"
  },
  {
      "name": "Madagascar",
      "code": "MG"
  },
  {
      "name": "Malawi",
      "code": "MW"
  },
  {
      "name": "Malaysia",
      "code": "MY"
  },
  {
      "name": "Maldives",
      "code": "MV"
  },
  {
      "name": "Mali",
      "code": "ML"
  },
  {
      "name": "Malta",
      "code": "MT"
  },
  {
      "name": "Marshall Islands",
      "code": "MH"
  },
  {
      "name": "Martinique",
      "code": "MQ"
  },
  {
      "name": "Mauritania",
      "code": "MR"
  },
  {
      "name": "Mauritius",
      "code": "MU"
  },
  {
      "name": "Mayotte",
      "code": "YT"
  },
  {
      "name": "Mexico",
      "code": "MX"
  },
  {
      "name": "Micronesia, Federated States of",
      "code": "FM"
  },
  {
      "name": "Moldova, Republic of",
      "code": "MD"
  },
  {
      "name": "Monaco",
      "code": "MC"
  },
  {
      "name": "Mongolia",
      "code": "MN"
  },
  {
      "name": "Montserrat",
      "code": "MS"
  },
  {
      "name": "Morocco",
      "code": "MA"
  },
  {
      "name": "Mozambique",
      "code": "MZ"
  },
  {
      "name": "Myanmar",
      "code": "MM"
  },
  {
      "name": "Namibia",
      "code": "NA"
  },
  {
      "name": "Nauru",
      "code": "NR"
  },
  {
      "name": "Nepal",
      "code": "NP"
  },
  {
      "name": "Netherlands",
      "code": "NL"
  },
  {
      "name": "Netherlands Antilles",
      "code": "AN"
  },
  {
      "name": "New Caledonia",
      "code": "NC"
  },
  {
      "name": "New Zealand",
      "code": "NZ"
  },
  {
      "name": "Nicaragua",
      "code": "NI"
  },
  {
      "name": "Niger",
      "code": "NE"
  },
  {
      "name": "Nigeria",
      "code": "NG"
  },
  {
      "name": "Niue",
      "code": "NU"
  },
  {
      "name": "Norfolk Island",
      "code": "NF"
  },
  {
      "name": "Northern Mariana Islands",
      "code": "MP"
  },
  {
      "name": "Norway",
      "code": "NO"
  },
  {
      "name": "Oman",
      "code": "OM"
  },
  {
      "name": "Pakistan",
      "code": "PK"
  },
  {
      "name": "Palau",
      "code": "PW"
  },
  {
      "name": "Palestinian Territory, Occupied",
      "code": "PS"
  },
  {
      "name": "Panama",
      "code": "PA"
  },
  {
      "name": "Papua New Guinea",
      "code": "PG"
  },
  {
      "name": "Paraguay",
      "code": "PY"
  },
  {
      "name": "Peru",
      "code": "PE"
  },
  {
      "name": "Philippines",
      "code": "PH"
  },
  {
      "name": "Pitcairn",
      "code": "PN"
  },
  {
      "name": "Poland",
      "code": "PL"
  },
  {
      "name": "Portugal",
      "code": "PT"
  },
  {
      "name": "Puerto Rico",
      "code": "PR"
  },
  {
      "name": "Qatar",
      "code": "QA"
  },
  {
      "name": "Reunion",
      "code": "RE"
  },
  {
      "name": "Romania",
      "code": "RO"
  },
  {
      "name": "Russian Federation",
      "code": "RU"
  },
  {
      "name": "RWANDA",
      "code": "RW"
  },
  {
      "name": "Saint Helena",
      "code": "SH"
  },
  {
      "name": "Saint Kitts and Nevis",
      "code": "KN"
  },
  {
      "name": "Saint Lucia",
      "code": "LC"
  },
  {
      "name": "Saint Pierre and Miquelon",
      "code": "PM"
  },
  {
      "name": "Saint Vincent and the Grenadines",
      "code": "VC"
  },
  {
      "name": "Samoa",
      "code": "WS"
  },
  {
      "name": "San Marino",
      "code": "SM"
  },
  {
      "name": "Sao Tome and Principe",
      "code": "ST"
  },
  {
      "name": "Saudi Arabia",
      "code": "SA"
  },
  {
      "name": "Senegal",
      "code": "SN"
  },
  {
      "name": "Serbia and Montenegro",
      "code": "CS"
  },
  {
      "name": "Seychelles",
      "code": "SC"
  },
  {
      "name": "Sierra Leone",
      "code": "SL"
  },
  {
      "name": "Singapore",
      "code": "SG"
  },
  {
      "name": "Slovakia",
      "code": "SK"
  },
  {
      "name": "Slovenia",
      "code": "SI"
  },
  {
      "name": "Solomon Islands",
      "code": "SB"
  },
  {
      "name": "Somalia",
      "code": "SO"
  },
  {
      "name": "South Africa",
      "code": "ZA"
  },
  {
      "name": "South Georgia and the South Sandwich Islands",
      "code": "GS"
  },
  {
      "name": "Spain",
      "code": "ES"
  },
  {
      "name": "Sri Lanka",
      "code": "LK"
  },
  {
      "name": "Sudan",
      "code": "SD"
  },
  {
      "name": "Suriname",
      "code": "SR"
  },
  {
      "name": "Svalbard and Jan Mayen",
      "code": "SJ"
  },
  {
      "name": "Swaziland",
      "code": "SZ"
  },
  {
      "name": "Sweden",
      "code": "SE"
  },
  {
      "name": "Switzerland",
      "code": "CH"
  },
  {
      "name": "Syrian Arab Republic",
      "code": "SY"
  },
  {
      "name": "Taiwan, Province of China",
      "code": "TW"
  },
  {
      "name": "Tajikistan",
      "code": "TJ"
  },
  {
      "name": "Tanzania, United Republic of",
      "code": "TZ"
  },
  {
      "name": "Thailand",
      "code": "TH"
  },
  {
      "name": "Timor-Leste",
      "code": "TL"
  },
  {
      "name": "Togo",
      "code": "TG"
  },
  {
      "name": "Tokelau",
      "code": "TK"
  },
  {
      "name": "Tonga",
      "code": "TO"
  },
  {
      "name": "Trinidad and Tobago",
      "code": "TT"
  },
  {
      "name": "Tunisia",
      "code": "TN"
  },
  {
      "name": "Turkey",
      "code": "TR"
  },
  {
      "name": "Turkmenistan",
      "code": "TM"
  },
  {
      "name": "Turks and Caicos Islands",
      "code": "TC"
  },
  {
      "name": "Tuvalu",
      "code": "TV"
  },
  {
      "name": "Uganda",
      "code": "UG"
  },
  {
      "name": "Ukraine",
      "code": "UA"
  },
  {
      "name": "United Arab Emirates",
      "code": "AE"
  },
  {
      "name": "United Kingdom",
      "code": "GB"
  },
  {
      "name": "United States",
      "code": "US"
  },
  {
      "name": "United States Minor Outlying Islands",
      "code": "UM"
  },
  {
      "name": "Uruguay",
      "code": "UY"
  },
  {
      "name": "Uzbekistan",
      "code": "UZ"
  },
  {
      "name": "Vanuatu",
      "code": "VU"
  },
  {
      "name": "Venezuela",
      "code": "VE"
  },
  {
      "name": "Viet Nam",
      "code": "VN"
  },
  {
      "name": "Virgin Islands, British",
      "code": "VG"
  },
  {
      "name": "Virgin Islands, U.S.",
      "code": "VI"
  },
  {
      "name": "Wallis and Futuna",
      "code": "WF"
  },
  {
      "name": "Western Sahara",
      "code": "EH"
  },
  {
      "name": "Yemen",
      "code": "YE"
  },
  {
      "name": "Zambia",
      "code": "ZM"
  },
  {
      "name": "Zimbabwe",
      "code": "ZW"
  }
]

const amit=[{ "postalAddresses": [], "thumbnailPath": "content://com.android.contacts/display_photo/9223372034707292161", "hasThumbnail": true, "note": "", "company": "", "familyName": "Danon", "middleName": null, "rawContactId": "9223372034707292161", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "Amit", "recordID": "9223372034707292161" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "154", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "48", "label": "mobile", "number": "055-6631107" }, { "id": "491", "label": "mobile", "number": "055-6631107" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "עידו", "recordID": "408" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "164", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "64", "label": "mobile", "number": "055-660-6400" }, { "id": "541", "label": "mobile", "number": "0556606400" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "שמואל", "recordID": "160" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "143", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "96", "label": "mobile", "number": "054-581-4636" }, { "id": "436", "label": "mobile", "number": "0545814636" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "תומר", "recordID": "138" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "245", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "124", "label": "mobile", "number": "050-819-2089" }, { "id": "812", "label": "mobile", "number": "0508192089" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "הילה", "recordID": "347" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "מכינה", "middleName": null, "rawContactId": "160", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "128", "label": "mobile", "number": "+972543149400" }, { "id": "521", "label": "mobile", "number": "+972543149400" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "נדב", "recordID": "205" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "111", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "150", "label": "mobile", "number": "050-9433350" }, { "id": "276", "label": "mobile", "number": "0509433350" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "אמא", "recordID": "116" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "122", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "154", "label": "mobile", "number": "050-7900062" }, { "id": "331", "label": "mobile", "number": "050-7900062" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "אבא", "recordID": "124" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "133", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "156", "label": "mobile", "number": "+972524324891" }, { "id": "386", "label": "mobile", "number": "+972524324891" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "גיא", "recordID": "200" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "166", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "161", "label": "mobile", "number": "+972525778087" }, { "id": "551", "label": "mobile", "number": "+972525778087" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "בלובי", "recordID": "508" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "110", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "165", "label": "mobile", "number": "+972545864228" }, { "id": "271", "label": "mobile", "number": "+972545864228" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "מתן", "recordID": "104" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "127", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "173", "label": "mobile", "number": "+972502076524" }, { "id": "356", "label": "mobile", "number": "+972502076524" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "ליטל", "recordID": "134" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "מכללה", "middleName": "פלאפון", "rawContactId": "173", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "581", "label": "other", "number": "+972 50-262-0923" }, { "id": "587", "label": "other", "number": "+972502620923" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "בוריס", "recordID": "498" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "240", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "787", "label": "mobile", "number": "+972 52-425-8623" }, { "id": "793", "label": "mobile", "number": "+972524258623" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "רון", "recordID": "419" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "247", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "813", "label": "mobile", "number": "050-234-7607" }, { "id": "819", "label": "mobile", "number": "0502347607" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "יקיר", "recordID": "350" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "277", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "907", "label": "mobile", "number": "+972 54-586-3434" }, { "id": "915", "label": "mobile", "number": "+972545863434" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "רועי", "recordID": "380" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": null, "middleName": null, "rawContactId": "279", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "916", "label": "mobile", "number": "053-520-4670" }, { "id": "922", "label": "mobile", "number": "0535204670" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "עמיחי", "recordID": "430" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "405", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1141", "label": "mobile", "number": "050-6304836" }, { "id": "1318", "label": "mobile", "number": "050-6304836" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "ליאור", "recordID": "510" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "364", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1179", "label": "mobile", "number": "052-344-2121" }, { "id": "1185", "label": "mobile", "number": "0523442121" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "עידו", "recordID": "471" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Tcs", "middleName": null, "rawContactId": "368", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1190", "label": "mobile", "number": "+972 50-230-2345" }, { "id": "1196", "label": "mobile", "number": "+972502302345" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "רותם", "recordID": "478" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "370", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1197", "label": "mobile", "number": "+972 50-910-7279" }, { "id": "1203", "label": "mobile", "number": "+972509107279" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "אור", "recordID": "479" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "380", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1226", "label": "mobile", "number": "052-5357383" }, { "id": "1232", "label": "mobile", "number": "052-5357383" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "יותם", "recordID": "485" }, { "postalAddresses": [], "thumbnailPath": "", "hasThumbnail": false, "note": "", "company": "", "familyName": "Indorz", "middleName": null, "rawContactId": "400", "emailAddresses": [], "urlAddresses": [], "phoneNumbers": [{ "id": "1298", "label": "mobile", "number": "+972 52-879-7969" }, { "id": "1300", "label": "mobile", "number": "+972 52-879-7969" }, { "id": "1305", "label": "mobile", "number": "+972528797969" }], "department": "", "jobTitle": "", "suffix": null, "prefix": null, "givenName": "חן", "recordID": "507" }]
const ido = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'Danon',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'Ido',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit',
    recordID: '408',
  },
];

const mom = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'Danon',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'Aster',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit',
    recordID: '408',
  },
];

const yotam = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'Cohen',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'yotam',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit danon',
    recordID: '408',
  },
];

const lior = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'ben aharon',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'lior',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit work',
    recordID: '408',
  },
];

const dad = [
  {
    postalAddresses: [],
    thumbnailPath:
      'content://com.android.contacts/display_photo/9223372034707292161',
    hasThumbnail: true,
    note: '',
    company: '',
    familyName: 'danon',
    middleName: null,
    rawContactId: '9223372034707292161',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'izik',
    recordID: '9223372034707292161',
  },
  {
    postalAddresses: [],
    thumbnailPath: '',
    hasThumbnail: false,
    note: '',
    company: '',
    familyName: null,
    middleName: null,
    rawContactId: '154',
    emailAddresses: [],
    urlAddresses: [],
    phoneNumbers: [
      {id: '48', label: 'mobile', number: '055-6678224'},
      {id: '491', label: 'mobile', number: '0556678224'},
    ],
    department: '',
    jobTitle: '',
    suffix: null,
    prefix: null,
    givenName: 'amit',
    recordID: '408',
  },
];

export {categories, explore, products, profile, ido, mom, yotam, lior, dad,countries,amit};
